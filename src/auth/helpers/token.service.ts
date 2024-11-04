// import * as crypto from "node:crypto";

// import * as jwt from "jsonwebtoken";

// import { Encryptor } from "../../app";
// import { UnAuthorizedError, config, logger } from "../../core";
// import { IJwtData } from "../types";
// import { AppMessages } from "../../common";

// export class TokenService {
//   constructor(private readonly encryptionService: Encryptor) {}

//   async getTokens(data: IJwtData): Promise<string[]> {
//     return await Promise.all([
//       this._generateAccessToken(data),
//       this._generateRefreshToken(data),
//     ]);
//   }

//   async extractTokenDetails(tokenFromHeader: string, secret: string) {
//     // get the token from the bearer string.
//     const token = tokenFromHeader.split(" ").pop()!;

//     const decryptedToken = this.encryptionService.decrypt(token);

//     // verify the token
//     const tokenDetails = await this.verifyToken(decryptedToken, secret);

//     // extract the token information
//     let tokenPayload = tokenDetails as jwt.JwtPayload;
//     let timeToExpiry = tokenPayload.exp as number;

//     return {
//       user: {
//         id: tokenDetails.id,
//         email: tokenDetails.email,
//       },
//       token,
//       expiration: new Date(timeToExpiry * 1000),
//     };
//   }

//   /**
//    * @description Verifies the token provided.
//    * @param {string} token
//    * @param {string} secret
//    * @returns {string} decoded token
//    * @throws {UnAuthorizedError} error
//    */
//     verifyToken(token: string, secret: string): jwt.JwtPayload {
//     try {
//       return jwt.decode(token) as jwt.JwtPayload;
//     } catch (err) {
//       logger.error(err);
//       throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
//     }
//   }

//   private _generateAccessToken(data: IJwtData): string {
//     const accessToken = this._generateToken({
//       data,
//       secret: config.auth.accessTokenSecret,
//       expiresIn: config.auth.accessTokenExpiresIn,
//     });

//     return this.encryptionService.encrypt(accessToken);
//   }

//   private _generateRefreshToken(data: IJwtData): string {
//     const refreshToken = this._generateToken({
//       data,
//       secret: config.auth.refreshTokenSecret,
//       expiresIn: config.auth.refreshTokenExpiresIn,
//     });

//     return this.encryptionService.encrypt(refreshToken);
//   }

//   private _generateToken({
//     data,
//     secret,
//     expiresIn,
//   }: {
//     data: IJwtData;
//     expiresIn: string;
//     secret: string;
//   }): string {
//     return jwt.sign(data, secret, {
//       expiresIn,
//       jwtid: crypto.randomUUID(),
//     });
//   }
// }

import * as crypto from "node:crypto";
import * as jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { Encryptor } from "../../app";
import { UnAuthorizedError, config, logger } from "../../core";
import { IJwtData } from "../types";
import { AppMessages } from "../../common";
import axios from "axios"; // For GitHub token validation

export class TokenService {
  private googleClient: OAuth2Client;

  constructor(private readonly encryptionService: Encryptor) {
    // Initialize Google OAuth client with Google client ID
    this.googleClient = new OAuth2Client(config.auth.passport.google.clientID);
  }

  async getTokens(data: IJwtData): Promise<string[]> {
    return await Promise.all([
      this._generateAccessToken(data),
      this._generateRefreshToken(data),
    ]);
  }

  async extractTokenDetails(tokenFromHeader: string, secret: string) {
    const token = tokenFromHeader.split(" ").pop()!;

    // Determine if this is a third-party token
    if (this.isGoogleToken(token)) {
      const googlePayload = await this.verifyGoogleToken(token);
      return {
        user: {
          id: googlePayload.sub, // Google user ID
          email: googlePayload.email,
        },
        token,
        expiration: googlePayload.exp
          ? new Date(googlePayload.exp * 1000)
          : new Date(Date.now() + 60 * 60 * 1000), // Default to 1 hour if exp is undefined
      };
    } else if (this.isGitHubToken(token)) {
      const githubPayload = await this.verifyGitHubToken(token);
      return {
        user: {
          id: githubPayload.id,
          email: githubPayload.email,
        },
        token,
        expiration: new Date(),
      };
    }

    // For internal tokens, decrypt and verify
    const decryptedToken = this.encryptionService.decrypt(token);
    const tokenDetails = await this.verifyToken(decryptedToken, secret);

    const tokenPayload = tokenDetails as jwt.JwtPayload;
    const timeToExpiry = tokenPayload.exp as number;

    return {
      user: {
        id: tokenDetails.id,
        email: tokenDetails.email,
      },
      token,
      expiration: new Date(timeToExpiry * 1000),
    };
  }

  // Method to verify Google tokens
  private async verifyGoogleToken(token: string): Promise<jwt.JwtPayload> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: config.auth.passport.google.clientID, // Verify Google client ID matches
    });
    return ticket.getPayload() as jwt.JwtPayload;
  }

  // Method to verify GitHub tokens
  private async verifyGitHubToken(
    token: string
  ): Promise<{ id: string; email: string }> {
    const response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { id: response.data.id, email: response.data.email };
  }

  verifyToken(token: string, secret: string): jwt.JwtPayload {
    try {
      return jwt.decode(token) as jwt.JwtPayload;
    } catch (err) {
      logger.error(err);
      throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
    }
  }

  private _generateAccessToken(data: IJwtData): string {
    const accessToken = this._generateToken({
      data,
      secret: config.auth.accessTokenSecret,
      expiresIn: config.auth.accessTokenExpiresIn,
    });

    return this.encryptionService.encrypt(accessToken);
  }

  private _generateRefreshToken(data: IJwtData): string {
    const refreshToken = this._generateToken({
      data,
      secret: config.auth.refreshTokenSecret,
      expiresIn: config.auth.refreshTokenExpiresIn,
    });

    return this.encryptionService.encrypt(refreshToken);
  }

  private _generateToken({
    data,
    secret,
    expiresIn,
  }: {
    data: IJwtData;
    expiresIn: string;
    secret: string;
  }): string {
    return jwt.sign(data, secret, {
      expiresIn,
      jwtid: crypto.randomUUID(),
    });
  }

  // Helper methods to check if token is from Google or GitHub
  private isGoogleToken(token: string): boolean {
    return token.length > 1000; 
  }

  private isGitHubToken(token: string): boolean {
    return token.startsWith("gho_") || token.startsWith("ghp_");
  }
}

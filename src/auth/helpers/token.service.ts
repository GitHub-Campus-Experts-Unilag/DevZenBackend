import * as crypto from "node:crypto";

import * as jwt from "jsonwebtoken";

import { Encryptor } from "../../app";
import { UnAuthorizedError, config, logger } from "../../core";
import { IJwtData } from "../types";
import { AppMessages } from "../../common";

export class TokenService {
  constructor(private readonly encryptionService: Encryptor) {}

  async getTokens(data: IJwtData): Promise<string[]> {
    return await Promise.all([
      this._generateAccessToken(data),
      this._generateRefreshToken(data),
    ]);
  }

  async extractTokenDetails(tokenFromHeader: string, secret: string) {
    // get the token from the bearer string.
    const token = tokenFromHeader.split(" ").pop()!;

    const decryptedToken = this.encryptionService.decrypt(token);

    // verify the token
    const tokenDetails = await this.verifyToken(decryptedToken, secret);

    // extract the token information
    let tokenPayload = tokenDetails as jwt.JwtPayload;
    let timeToExpiry = tokenPayload.exp as number;

    return {
      user: {
        id: tokenDetails.id,
        email: tokenDetails.email,
      },
      token,
      expiration: new Date(timeToExpiry * 1000),
    };
  }

  /**
   * @description Verifies the token provided.
   * @param {string} token
   * @param {string} secret
   * @returns {string} decoded token
   * @throws {UnAuthorizedError} error
   */
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
}

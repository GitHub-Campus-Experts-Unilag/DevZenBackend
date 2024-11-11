import { Request, Response, NextFunction } from "express";
import { config, ForbiddenError, UnAuthorizedError } from "../../core";
import { TokenService } from "../helpers";
import { Encryptor } from "../../app";

export class CurrentUser {
  constructor(
    private readonly tokenService: TokenService,
    private readonly encryptor: Encryptor
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.get("Authorization") || req.get("x-Auth-Token");

    if (!tokenHeader) {
      return next(new UnAuthorizedError("Unauthorized: No token provided"));
    }

    const token = tokenHeader.split(" ").pop() as string;
    console.log("Received Token:", token);

    let tokenDetails;
    try {
      // Directly use third-party (google/github) token verification if applicable
      tokenDetails = await this.tokenService.extractTokenDetails(
        tokenHeader,
        config.auth.accessTokenSecret
      );

      if (!tokenDetails) {
        console.error("Token details are null or undefined");
        req.user = null;
        return next(new ForbiddenError("Invalid token"));
      }

      console.log("Token Details:", tokenDetails);
    } catch (err: any) {
      req.user = null;
      return next(new ForbiddenError(err.message));
    }

    const payload = {
      email: tokenDetails.user.email,
      id: tokenDetails.user.id,
    };
    req.user = payload;
    next();
  };
}

// export class CurrentUser {
//   constructor(
//     private readonly tokenService: TokenService,
//     private readonly encryptor: Encryptor
//   ) {}
//   handle = (req: Request, _: Response, next: NextFunction) => {
//     const tokenHeader = req.get("Authorization") || req.get("x-Auth-Token");

//     let tokenDetails;
//     try {
//       if (!tokenHeader) {
//         throw new UnAuthorizedError("unauthorized");
//       }
//       const token = tokenHeader.split(" ").pop() as string;
//       console.log("Received Token:", token);

//       if (!token) {
//         return _.status(401).json({ message: "No token provided" });
//       }

//       const decryptedToken = this.encryptor.decrypt(token);
//       console.log("Decrypted Token:", decryptedToken);

//       tokenDetails = this.tokenService.verifyToken(
//         decryptedToken,
//         config.auth.accessTokenSecret
//       );
//       console.log("Token Details:", tokenDetails);

//       if (!tokenDetails) {
//         console.error("Token details are null or undefined");
//         req.user = null;
//         return next(new ForbiddenError("Invalid token"));
//       }
//     } catch (err: any) {
//       req.user = null;
//       const error = new ForbiddenError(err.message);
//       next(error);
//       return;
//     }

//     const payload = {
//       email: tokenDetails.email,
//       id: tokenDetails.id,
//     };
//     const user: IJwtData = payload;
//     req.user = user;
//     next();
//   };
// }

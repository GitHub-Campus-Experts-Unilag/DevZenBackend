import { Request, Response, NextFunction, RequestHandler } from "express";

import { config, ForbiddenError, UnAuthorizedError } from "../../core";
import { TokenService } from "../helpers";
import { Encryptor } from "../../app";
import { IJwtData } from "../types";

export class CurrentUser {
  constructor(
    private readonly tokenService: TokenService,
    private readonly encryptor: Encryptor,
  ) {}
  handle = (req: Request, _: Response, next: NextFunction) => {
    const tokenHeader = req.get("Authorization") || req.get("x-Auth-Token");

    let tokenDetails;
    try {
      if (!tokenHeader) {
        throw new UnAuthorizedError("unauthorized");
      }
      const token = tokenHeader.split(" ").pop() as string;

      const decryptedToken = this.encryptor.decrypt(token);

      tokenDetails = this.tokenService.verifyToken(
        decryptedToken,
        config.auth.accessTokenSecret,
      );
    } catch (err: any) {
      req.user = null;
      const error = new ForbiddenError(err.message);
      next(error);
      return;
    }

    const payload = {
      email: tokenDetails.email,
      id: tokenDetails.id,
    };
    const user: IJwtData = payload;
    req.user = user;
    next();
  };
}

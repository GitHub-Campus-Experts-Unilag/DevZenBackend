import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../errors";

export class NotFoundErrorHandler {
  handle = (req: Request, _: Response, next: NextFunction) => {
    next(
      new RouteNotFoundError(
        `request path '${req.path.replace("\\", '')}' not found for ${req.method} method.`,
      ),
    );
  };
}

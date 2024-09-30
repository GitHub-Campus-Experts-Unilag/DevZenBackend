import { NextFunction, Request, Response } from "express";

export type ExpressCallbackFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

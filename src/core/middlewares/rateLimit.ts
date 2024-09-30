import { Request, Response, NextFunction } from "express";

export class RateLimiter {
  consume = async (req: Request, res: Response, next: NextFunction) => {
    // const ip: string = req.ip;
  };
}

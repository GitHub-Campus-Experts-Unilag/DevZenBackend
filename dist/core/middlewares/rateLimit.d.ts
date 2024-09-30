import { Request, Response, NextFunction } from "express";
export declare class RateLimiter {
    consume: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

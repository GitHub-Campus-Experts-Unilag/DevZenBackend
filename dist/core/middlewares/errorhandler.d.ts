import { NextFunction, Request, Response } from "express";
export declare class ErrorHandler {
    handle: (error: Error, req: Request, res: Response, _: NextFunction) => Promise<void>;
}

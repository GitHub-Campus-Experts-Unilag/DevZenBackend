import { NextFunction, Request, Response } from "express";
export declare class NotFoundErrorHandler {
    handle: (req: Request, _: Response, next: NextFunction) => void;
}

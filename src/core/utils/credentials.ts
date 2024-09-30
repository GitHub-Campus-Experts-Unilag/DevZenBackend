import { Request, Response, NextFunction } from "express";
import { NotWhiteListedOriginError } from "../errors";

// export const crendentials = async (req: Request, _: Response, next: NextFunction) => {
//     const origin = req.headers.origin as string;
//     if (allowedOrigins.includes(origin)) next();
//     next(new NotWhiteListedOriginError(`${origin} is blacklisted`))
// }

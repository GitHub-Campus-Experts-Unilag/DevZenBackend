import { Request, Response, NextFunction } from "express";
import { TokenService } from "../helpers";
import { Encryptor } from "../../app";
export declare class CurrentUser {
    private readonly tokenService;
    private readonly encryptor;
    constructor(tokenService: TokenService, encryptor: Encryptor);
    handle: (req: Request, _: Response, next: NextFunction) => void;
}

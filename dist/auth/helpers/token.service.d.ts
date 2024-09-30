import * as jwt from "jsonwebtoken";
import { Encryptor } from "../../app";
import { IJwtData } from "../types";
export declare class TokenService {
    private readonly encryptionService;
    constructor(encryptionService: Encryptor);
    getTokens(data: IJwtData): Promise<string[]>;
    extractTokenDetails(tokenFromHeader: string, secret: string): Promise<{
        user: {
            id: any;
            email: any;
        };
        token: string;
        expiration: Date;
    }>;
    verifyToken(token: string, secret: string): jwt.JwtPayload;
    private _generateAccessToken;
    private _generateRefreshToken;
    private _generateToken;
}

import { Context } from "../../core";
import { UserRepository } from "../../users";
import { BlackListRepository } from "../model";
import { LogoutPayload } from "../types";
import { TokenService } from "../helpers";
export declare class Logout {
    private readonly tokenService;
    private readonly userRepository;
    private readonly blackListRepository;
    constructor(tokenService: TokenService, userRepository: UserRepository, blackListRepository: BlackListRepository);
    handle: ({ user, headers }: Context<LogoutPayload>) => Promise<{
        code: 204;
        message: string;
    }>;
    private _blackListToken;
    private _destroySession;
}

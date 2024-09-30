import { Context, ForbiddenError, HttpStatus, config } from "../../core";
import { UserRepository } from "../../users";
import { BlackListRepository } from "../model";
import { LogoutPayload } from "../types";
import { TokenService } from "../helpers";
import { AppMessages } from "../../common";

export class Logout {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly blackListRepository: BlackListRepository,
  ) {}

  /**
   * @description Destroys user session
   * @param {Context<LogoutPayload>} payload
   * @returns { code: string, message: string } response
   */
  public handle = async ({ user, headers }: Context<LogoutPayload>) => {
    // get the auth token
    const tokenHeader = headers.authorization!;
    if (!tokenHeader)
      throw new ForbiddenError(AppMessages.INFO.EMPTY_TOKEN_HEADER);

    await this.tokenService
      .extractTokenDetails(tokenHeader, config.auth.refreshTokenSecret)
      .then(this._blackListToken);

    // remove the refresh token from the user records.
    // considering if we implement refresh token feature later.
    this._destroySession(user.id);

    return {
      code: HttpStatus.NO_CONTENT,
      message: AppMessages.SUCCESS.LOGOUT,
    };
  };

  private _blackListToken = async ({
    token,
    expiration,
  }: {
    token: string;
    expiration: Date;
  }): Promise<void> => {
    await this.blackListRepository.create({
      token,
      expiryDate: expiration,
    });
    //TODO: can add cron job later to remove stale tokens.
  };

  private _destroySession = async (userId: string): Promise<void> => {
    await this.userRepository.updateOne(
      {
        user_id: userId,
      },
      {
        $set: {
          refreshToken: "",
        },
      },
    );
  };
}

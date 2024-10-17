import { AppMessages } from "../../common";
import {
  Context,
  HttpStatus,
  PasswordHelper,
  UnAuthorizedError,
} from "../../core";
import { UserRepository } from "../../users";
import { TokenService } from "../helpers";
import { SignInPayload } from "../types";

export class SignIn {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  /**
   * @description Authenticates users and generates token for them
   * @throws {UnAuthorizedError} error
   * @param {Context<SignInPayload>} params
   * @returns
   */
  handle = async ({ input }: Context<SignInPayload>) => {
    const user = await this.usersRepo.findOne({ email: input.email });
    if (!user)
      throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_CREDENTIALS);

    const isEqual = await PasswordHelper.compareHashedData(input.password, "");
    if (!isEqual)
      throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_CREDENTIALS);

    const [accessToken, refreshToken] = await this.tokenService.getTokens({
      id: user.user_id!,
      email: user.email!,
    });

    await this.usersRepo.updateOne(
      { user_id: user.user_id! },
      { $set: { refreshToken } }
    );

    return {
      code: HttpStatus.OK,
      message: AppMessages.SUCCESS.LOGIN,
      data: {
        user: user.toJSON(),
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  };
}

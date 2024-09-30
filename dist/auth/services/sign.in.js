"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
const core_1 = require("../../core");
const common_1 = require("../../common");
class SignIn {
    constructor(usersRepo, tokenService) {
        this.usersRepo = usersRepo;
        this.tokenService = tokenService;
        this.handle = async ({ input }) => {
            const user = await this.usersRepo.findOne({ email: input.email });
            if (!user)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            const isEqual = await core_1.PasswordHelper.compareHashedData(input.password, user.password);
            if (!isEqual)
                throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_CREDENTIALS);
            const [accessToken, refreshToken] = await this.tokenService.getTokens({
                id: user.user_id,
                email: user.email,
            });
            await this.usersRepo.updateOne({ user_id: user.user_id }, { $set: { refreshToken } });
            return {
                code: core_1.HttpStatus.OK,
                message: common_1.AppMessages.SUCCESS.LOGIN,
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
}
exports.SignIn = SignIn;
//# sourceMappingURL=sign.in.js.map
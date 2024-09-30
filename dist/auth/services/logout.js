"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = void 0;
const core_1 = require("../../core");
const common_1 = require("../../common");
class Logout {
    constructor(tokenService, userRepository, blackListRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.blackListRepository = blackListRepository;
        this.handle = async ({ user, headers }) => {
            const tokenHeader = headers.authorization;
            if (!tokenHeader)
                throw new core_1.ForbiddenError(common_1.AppMessages.INFO.EMPTY_TOKEN_HEADER);
            await this.tokenService
                .extractTokenDetails(tokenHeader, core_1.config.auth.refreshTokenSecret)
                .then(this._blackListToken);
            this._destroySession(user.id);
            return {
                code: core_1.HttpStatus.NO_CONTENT,
                message: common_1.AppMessages.SUCCESS.LOGOUT,
            };
        };
        this._blackListToken = async ({ token, expiration, }) => {
            await this.blackListRepository.create({
                token,
                expiryDate: expiration,
            });
        };
        this._destroySession = async (userId) => {
            await this.userRepository.updateOne({
                user_id: userId,
            }, {
                $set: {
                    refreshToken: "",
                },
            });
        };
    }
}
exports.Logout = Logout;
//# sourceMappingURL=logout.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const core_1 = require("../../core");
class CurrentUser {
    constructor(tokenService, encryptor) {
        this.tokenService = tokenService;
        this.encryptor = encryptor;
        this.handle = (req, _, next) => {
            const tokenHeader = req.get("Authorization") || req.get("x-Auth-Token");
            let tokenDetails;
            try {
                if (!tokenHeader) {
                    throw new core_1.UnAuthorizedError("unauthorized");
                }
                const token = tokenHeader.split(" ").pop();
                const decryptedToken = this.encryptor.decrypt(token);
                tokenDetails = this.tokenService.verifyToken(decryptedToken, core_1.config.auth.accessTokenSecret);
            }
            catch (err) {
                req.user = null;
                const error = new core_1.ForbiddenError(err.message);
                next(error);
                return;
            }
            const payload = {
                email: tokenDetails.email,
                id: tokenDetails.id,
            };
            const user = payload;
            req.user = user;
            next();
        };
    }
}
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=current.user.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const core_1 = require("../../core");
const common_1 = require("../../common");
class TokenService {
    constructor(encryptionService) {
        this.encryptionService = encryptionService;
    }
    async getTokens(data) {
        return await Promise.all([
            this._generateAccessToken(data),
            this._generateRefreshToken(data),
        ]);
    }
    async extractTokenDetails(tokenFromHeader, secret) {
        const token = tokenFromHeader.split(" ").pop();
        const decryptedToken = this.encryptionService.decrypt(token);
        const tokenDetails = await this.verifyToken(decryptedToken, secret);
        let tokenPayload = tokenDetails;
        let timeToExpiry = tokenPayload.exp;
        return {
            user: {
                id: tokenDetails.id,
                email: tokenDetails.email,
            },
            token,
            expiration: new Date(timeToExpiry * 1000),
        };
    }
    verifyToken(token, secret) {
        try {
            return jwt.decode(token);
        }
        catch (err) {
            core_1.logger.error(err);
            throw new core_1.UnAuthorizedError(common_1.AppMessages.FAILURE.INVALID_TOKEN_PROVIDED);
        }
    }
    _generateAccessToken(data) {
        const accessToken = this._generateToken({
            data,
            secret: core_1.config.auth.accessTokenSecret,
            expiresIn: core_1.config.auth.accessTokenExpiresIn,
        });
        return this.encryptionService.encrypt(accessToken);
    }
    _generateRefreshToken(data) {
        const refreshToken = this._generateToken({
            data,
            secret: core_1.config.auth.refreshTokenSecret,
            expiresIn: core_1.config.auth.refreshTokenExpiresIn,
        });
        return this.encryptionService.encrypt(refreshToken);
    }
    _generateToken({ data, secret, expiresIn, }) {
        return jwt.sign(data, secret, {
            expiresIn,
            jwtid: crypto.randomUUID(),
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
const utils_1 = require("../utils");
dotenv.config();
exports.config = Object.freeze({
    app: {
        port: parseInt(process.env.PORT),
        environment: {
            mode: process.env.NODE_ENV,
            isInProduction: process.env.NODE_ENV === utils_1.ENVIRONMENT.PROD,
            isInDevelopment: process.env.NODE_ENV === utils_1.ENVIRONMENT.DEV,
            isInTesting: process.env.NODE_ENV === utils_1.ENVIRONMENT.TEST,
        },
        encryption: {
            key: process.env.ENCRYPTION_KEY,
        },
    },
    mail: {
        apiKey: process.env.MAIL_API_KEY,
        domain: process.env.MAIL_DOMAIN,
        globalFrom: process.env.MAIL_FROM,
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        smtpUsername: process.env.USER_EMAIL,
        smtpClientId: process.env.CLIENT_ID,
        smtpClientSecret: process.env.CLIENT_SECRET,
        smtpRefreshToken: process.env.REFRESH_TOKEN,
    },
    auth: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        accessTokenExpiresIn: process.env.ACCESS_TOKEN_SECRET_LIFESPAN,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_SECRET_LIFESPAN,
    },
    cache: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        ttl: parseInt(process.env.REDIS_TTL),
    },
    db: {
        mongodb: {
            MONGO_URL: process.env.MONGO_URL,
        },
        postgresql: {
            POSTGRESQL_USER: process.env.POSTGRESQL_USER,
            POSTGRESQL_USER_PASSWORD: process.env.POSTGRESQL_USER_PASSWORD,
            POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE,
            POSTGRESQL_PORT: parseInt(process.env.POSTGRESQL_PORT),
        },
    },
    rateLimit: {
        limit: process.env.WINDOW_RATE_LIMIT,
    },
});
exports.default = exports.config;
//# sourceMappingURL=config.js.map
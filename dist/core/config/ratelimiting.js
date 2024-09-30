"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimiter = exports.globalRateLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const moment = require("moment");
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: moment().add(12, "hours").unix(),
    max: 400,
    message: "You have exceeded the 100 requests in 24 hrs limit!",
    standardHeaders: true,
    legacyHeaders: false,
});
exports.authRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: moment().add(6, "hours").unix(),
    max: 10,
    message: "You have exceeded the 10 requests in 24 hrs limit!",
    standardHeaders: true,
    legacyHeaders: false,
});
//# sourceMappingURL=ratelimiting.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = [
    "localhost:3000",
    "*",
    /^http:\/\/localhost:\d+$/,
    /^https?:\/\/.+/,
];
const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const allowedHeaders = ["Content-Type", "Authorization"];
exports.corsOptions = {
    methods: allowedMethods,
    allowedHeaders,
    origin: allowedOrigins,
};
//# sourceMappingURL=cors.js.map
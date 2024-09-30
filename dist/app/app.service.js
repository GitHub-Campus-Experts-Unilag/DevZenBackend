"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exp = exports.app = void 0;
const express = require("express");
const cors = require("cors");
const helmet_1 = require("helmet");
const morgan = require("morgan");
const parser = require("body-parser");
const compression = require("compression");
const core_1 = require("../core");
const app_router_1 = require("./app.router");
exports.app = express();
if (core_1.config.app.environment.isInDevelopment ||
    core_1.config.app.environment.isInTesting) {
    exports.app.use(morgan("dev"));
}
exports.exp = exports.app.use(express.json());
exports.app.use(parser.urlencoded({ extended: false }));
exports.app.use((0, helmet_1.default)());
exports.app.disable("x-powered-by");
exports.app.use(compression());
exports.app.use(cors());
exports.app.use("/v1", app_router_1.appRouter);
exports.app.use(core_1.notFoundHandler.handle);
exports.app.use(core_1.errorHandler.handle);
//# sourceMappingURL=app.service.js.map
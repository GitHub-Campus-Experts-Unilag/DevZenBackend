"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const core_1 = require("../core");
const auth_1 = require("../auth");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.get("/health", (_, res) => {
    res.status(core_1.HttpStatus.OK).json({
        message: "API ok",
        version: "1.0",
    });
});
exports.appRouter
    .use("/auth", auth_1.authRouter);
//# sourceMappingURL=app.router.js.map
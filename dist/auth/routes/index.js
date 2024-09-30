"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const core_1 = require("../../core");
const schema_1 = require("./schema");
const express = require("express");
const auth_module_1 = require("../auth.module");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.use(express.json());
exports.authRouter
    .post("/sign-up", core_1.controlHandler.handle(auth_module_1.signUp.handle, schema_1.signUpSchema))
    .post("/sign-in", core_1.controlHandler.handle(auth_module_1.signIn.handle, schema_1.signInSchema))
    .post("/sign-out", auth_module_1.currentUser.handle, core_1.controlHandler.handle(auth_module_1.signOut.handle));
//# sourceMappingURL=index.js.map
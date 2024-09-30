"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signUp = exports.signIn = exports.currentUser = exports.tokenService = void 0;
const users_1 = require("../users");
const current_user_1 = require("./middlewares/current.user");
const helpers_1 = require("./helpers");
const sign_in_1 = require("./services/sign.in");
const sign_up_1 = require("./services/sign.up");
const logout_1 = require("./services/logout");
const blacklistoken_1 = require("./model/blacklistoken");
const encryptor_1 = require("../app/providers/encryptor/encryptor");
const encryptor = new encryptor_1.Encryptor();
exports.tokenService = new helpers_1.TokenService(encryptor);
exports.currentUser = new current_user_1.CurrentUser(exports.tokenService, encryptor);
exports.signIn = new sign_in_1.SignIn(users_1.Users, exports.tokenService);
exports.signUp = new sign_up_1.SignUp(users_1.Users);
exports.signOut = new logout_1.Logout(exports.tokenService, users_1.Users, blacklistoken_1.BlackListTokens);
//# sourceMappingURL=auth.module.js.map
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHelper = void 0;
const bcrypt = require("bcryptjs");
class PasswordHelper {
}
exports.PasswordHelper = PasswordHelper;
_a = PasswordHelper;
PasswordHelper.hashData = async (data) => {
    return await bcrypt.hash(data, 10);
};
PasswordHelper.compareHashedData = async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
};
//# sourceMappingURL=hasher.js.map
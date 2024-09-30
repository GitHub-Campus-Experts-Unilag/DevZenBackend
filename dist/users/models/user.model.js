"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const users_schema_1 = require("./users.schema");
exports.Users = (0, mongoose_1.model)("Users", users_schema_1.userSchema);
//# sourceMappingURL=user.model.js.map
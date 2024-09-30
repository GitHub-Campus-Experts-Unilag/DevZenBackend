"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackListTokens = exports.blacklistTokenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.blacklistTokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
        required: false,
    }
}, { timestamps: true });
exports.BlackListTokens = (0, mongoose_1.model)("blacklistokens", exports.blacklistTokenSchema);
//# sourceMappingURL=blacklistoken.js.map
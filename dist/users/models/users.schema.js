"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const crypto = require("node:crypto");
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomUUID(),
        index: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    virtuals: true,
    toJSON: {
        transform(doc, ret, options) {
            ret.user_id = ret._id;
            delete ret.__v;
            delete ret._id;
            delete ret.password;
            delete ret.refreshToken;
        },
    },
});
//# sourceMappingURL=users.schema.js.map
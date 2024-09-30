"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const utils_1 = require("../utils");
const apiError_1 = require("./apiError");
class ConflictError extends apiError_1.ApplicationError {
    constructor(message) {
        super(message);
        this._statusCode = utils_1.HttpStatus.CONFLICT;
        this._details = null;
        this._message = message;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
    get statusCode() {
        return this._statusCode;
    }
    get message() {
        return this._message;
    }
    get details() {
        return this._details;
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=conflictError.js.map
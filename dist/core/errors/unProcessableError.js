"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnProcessableError = void 0;
const utils_1 = require("../utils");
const apiError_1 = require("./apiError");
class UnProcessableError extends apiError_1.ApplicationError {
    constructor(message) {
        super(message);
        this._details = null;
        this._statusCode = utils_1.HttpStatus.UNPROCESSABLE;
        this._message = message;
        Object.setPrototypeOf(this, UnProcessableError.prototype);
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
exports.UnProcessableError = UnProcessableError;
//# sourceMappingURL=unProcessableError.js.map
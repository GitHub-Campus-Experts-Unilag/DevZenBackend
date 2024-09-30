"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteNotFoundError = void 0;
const utils_1 = require("../utils");
const apiError_1 = require("./apiError");
class RouteNotFoundError extends apiError_1.ApplicationError {
    constructor(message) {
        super(message);
        this._statusCode = utils_1.HttpStatus.NOT_FOUND;
        this._details = null;
        this._message = message;
        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
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
exports.RouteNotFoundError = RouteNotFoundError;
//# sourceMappingURL=notFoundError.js.map
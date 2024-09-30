"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileExtractionError = void 0;
const utils_1 = require("../utils");
const apiError_1 = require("./apiError");
class FileExtractionError extends apiError_1.ApplicationError {
    constructor(message) {
        super(message);
        this._statusCode = utils_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this._details = null;
        this._message = message;
        Object.setPrototypeOf(this, FileExtractionError.prototype);
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
exports.FileExtractionError = FileExtractionError;
//# sourceMappingURL=fileExtractionError.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=apiError.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorHandler = void 0;
const errors_1 = require("../errors");
class NotFoundErrorHandler {
    constructor() {
        this.handle = (req, _, next) => {
            next(new errors_1.RouteNotFoundError(`request path '${req.path.replace("\\", '')}' not found for ${req.method} method.`));
        };
    }
}
exports.NotFoundErrorHandler = NotFoundErrorHandler;
//# sourceMappingURL=notFoundErrorHandler.js.map
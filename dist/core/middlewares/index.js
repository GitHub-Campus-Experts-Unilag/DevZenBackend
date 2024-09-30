"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = exports.controlHandler = void 0;
const controllerHandler_1 = require("./controllerHandler");
const errorhandler_1 = require("./errorhandler");
const notFoundErrorHandler_1 = require("./notFoundErrorHandler");
exports.controlHandler = new controllerHandler_1.ControlHandler();
exports.errorHandler = new errorhandler_1.ErrorHandler();
exports.notFoundHandler = new notFoundErrorHandler_1.NotFoundErrorHandler();
//# sourceMappingURL=index.js.map
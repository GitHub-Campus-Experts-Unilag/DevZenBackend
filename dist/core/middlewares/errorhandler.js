"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const errors_1 = require("../errors");
const logging_1 = require("../logging");
const utils_1 = require("../utils");
const multer = require("multer");
class ErrorHandler {
    constructor() {
        this.handle = async (error, req, res, _) => {
            let statusCode = utils_1.HttpStatus.INTERNAL_SERVER_ERROR;
            let message = "internal server error";
            if (error instanceof errors_1.ApplicationError) {
                logging_1.logger.error("Error in middleware", error);
                statusCode = error.statusCode;
                message = error.message;
            }
            if (error instanceof multer.MulterError) {
                message = error.message;
            }
            if (statusCode == utils_1.HttpStatus.INTERNAL_SERVER_ERROR)
                logging_1.logger.error(error);
            res.status(statusCode).send({
                status: false,
                error: message,
                endpoint: req.url.trim(),
                method: req.method,
                timestamp: new Date().toDateString(),
            });
        };
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorhandler.js.map
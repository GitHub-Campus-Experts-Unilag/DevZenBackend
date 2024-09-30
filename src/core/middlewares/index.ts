import { ControlHandler } from "./controllerHandler";
import { ErrorHandler } from "./errorhandler";
import { NotFoundErrorHandler } from "./notFoundErrorHandler";

export const controlHandler = new ControlHandler();
export const errorHandler = new ErrorHandler();
export const notFoundHandler = new NotFoundErrorHandler();

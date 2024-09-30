import { HttpStatus } from "../utils";
import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";

export class RouteNotFoundError extends ApplicationError {
  _statusCode = HttpStatus.NOT_FOUND;
  _message: string;
  _details = null;

  constructor(message: string) {
    super(message);
    this._message = message;

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get message(): string {
    return this._message;
  }

  get details(): ErrorDetailsDescriptor {
    return this._details;
  }
}

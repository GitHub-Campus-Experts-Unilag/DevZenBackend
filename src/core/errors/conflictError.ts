import { HttpStatus } from "../utils";
import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";

export class ConflictError extends ApplicationError {
  _statusCode = HttpStatus.CONFLICT;
  _message: string;
  _details = null;

  constructor(message: string) {
    super(message);
    this._message = message;

    Object.setPrototypeOf(this, ConflictError.prototype);
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

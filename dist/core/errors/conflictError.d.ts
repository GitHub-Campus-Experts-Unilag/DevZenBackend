import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";
export declare class ConflictError extends ApplicationError {
    _statusCode: 409;
    _message: string;
    _details: null;
    constructor(message: string);
    get statusCode(): number;
    get message(): string;
    get details(): ErrorDetailsDescriptor;
}

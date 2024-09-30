import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";
export declare class UnProcessableError extends ApplicationError {
    _details: ErrorDetailsDescriptor;
    _statusCode: 422;
    _message: string;
    constructor(message: string);
    get statusCode(): number;
    get message(): string;
    get details(): ErrorDetailsDescriptor;
}

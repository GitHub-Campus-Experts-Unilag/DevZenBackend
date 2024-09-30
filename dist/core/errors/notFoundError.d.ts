import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";
export declare class RouteNotFoundError extends ApplicationError {
    _statusCode: 404;
    _message: string;
    _details: null;
    constructor(message: string);
    get statusCode(): number;
    get message(): string;
    get details(): ErrorDetailsDescriptor;
}

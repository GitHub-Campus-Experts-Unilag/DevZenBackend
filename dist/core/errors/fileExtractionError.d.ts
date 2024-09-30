import { ApplicationError, ErrorDetailsDescriptor } from "./apiError";
export declare class FileExtractionError extends ApplicationError {
    _statusCode: 500;
    _message: string;
    _details: null;
    constructor(message: string);
    get statusCode(): number;
    get message(): string;
    get details(): ErrorDetailsDescriptor;
}

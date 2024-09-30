export type ErrorDetailsDescriptor = Array<{
    message: string;
    path: String;
}> | null;
export declare abstract class ApplicationError extends Error {
    abstract _statusCode: number;
    abstract _message: string;
    abstract _details: ErrorDetailsDescriptor;
    constructor(message: string);
    abstract get statusCode(): number;
    abstract get message(): string;
    abstract get details(): ErrorDetailsDescriptor;
}

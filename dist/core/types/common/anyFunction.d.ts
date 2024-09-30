/// <reference types="node" />
import { OutgoingHttpHeaders } from "http";
export type HandlerReturnType = {
    code?: number;
    message?: string;
    body?: any;
    headers?: OutgoingHttpHeaders;
    isOctectStream?: boolean;
};
export type AnyFunction = (...args: any[]) => Promise<HandlerReturnType> | HandlerReturnType;

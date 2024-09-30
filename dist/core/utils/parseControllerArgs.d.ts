/// <reference types="qs" />
/// <reference types="node" />
import { Request } from "express";
import { RequestFileContents } from "../types";
declare class ParseContextArgs {
    parse: (req: Request) => {
        input: any;
        params: import("express-serve-static-core").ParamsDictionary;
        query: import("qs").ParsedQs;
        headers: import("http").IncomingHttpHeaders;
        user: import("../../auth/types").IJwtData | null | undefined;
        file: RequestFileContents;
    };
    private static parseFileContents;
}
declare const _default: ParseContextArgs;
export default _default;

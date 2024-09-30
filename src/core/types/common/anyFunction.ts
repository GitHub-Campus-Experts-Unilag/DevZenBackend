import { HttpStatus } from "../../utils";
import { OutgoingHttpHeaders } from "http";

type ExtractStatusCode = {
  [k in keyof typeof HttpStatus]: (typeof HttpStatus)[k];
};

export type HandlerReturnType = {
  code?: number;
  message?: string;
  body?: any;
  headers?: OutgoingHttpHeaders;
  isOctectStream?: boolean;
};

export type AnyFunction = (
  ...args: any[]
) => Promise<HandlerReturnType> | HandlerReturnType;

import { AnyFunction, ExpressCallbackFunction, ValidationSchema } from "../types";
export declare class ControlHandler {
    handle: (controllerFn: AnyFunction, schema?: ValidationSchema | undefined) => ExpressCallbackFunction;
}

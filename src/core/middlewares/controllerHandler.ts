import { Response, Request, NextFunction } from "express";

import { HttpStatus, joiValidate, parseContextArgs } from "../utils";
import {
  AnyFunction,
  ExpressCallbackFunction,
  ValidationSchema,
} from "../types";
import { UnProcessableError } from "../errors";
import { logger } from "../logging";

export class ControlHandler {
  handle = (
    controllerFn: AnyFunction,
    schema: ValidationSchema | undefined = {},
  ): ExpressCallbackFunction => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const contextArgs = parseContextArgs.parse(req);
      const { input, params, query } = contextArgs;

      try {
        if (schema) {
          const { querySchema, paramsSchema, inputSchema } = schema;

          try {
            if (inputSchema) joiValidate(inputSchema, input);
            if (querySchema) joiValidate(querySchema, query);
            if (paramsSchema) joiValidate(paramsSchema, params);
          } catch (error: any) {
            throw new UnProcessableError(error.message.replaceAll('"', ""));
          }
        }

        const controllerResult = await controllerFn(contextArgs);
        if (!controllerResult) {
          res.status(HttpStatus.OK).send({ status: true });
          return;
        }

        const { code, headers, isOctectStream, ...data } = controllerResult;

        if (isOctectStream) {
          res
            .set({ ...headers })
            .status(code ?? HttpStatus.OK)
            .pipe(data.body);
        }

        res
          .set({ ...headers })
          .status(code ?? HttpStatus.OK)
          .send(data);
      } catch (error) {
        logger.error(error);
        next(error);
      }
    };
  };
}

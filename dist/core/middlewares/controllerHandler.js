"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlHandler = void 0;
const utils_1 = require("../utils");
const errors_1 = require("../errors");
const logging_1 = require("../logging");
class ControlHandler {
    constructor() {
        this.handle = (controllerFn, schema = {}) => {
            return async (req, res, next) => {
                const contextArgs = utils_1.parseContextArgs.parse(req);
                const { input, params, query } = contextArgs;
                try {
                    if (schema) {
                        const { querySchema, paramsSchema, inputSchema } = schema;
                        try {
                            if (inputSchema)
                                (0, utils_1.joiValidate)(inputSchema, input);
                            if (querySchema)
                                (0, utils_1.joiValidate)(querySchema, query);
                            if (paramsSchema)
                                (0, utils_1.joiValidate)(paramsSchema, params);
                        }
                        catch (error) {
                            throw new errors_1.UnProcessableError(error.message.replaceAll('"', ""));
                        }
                    }
                    const controllerResult = await controllerFn(contextArgs);
                    if (!controllerResult) {
                        res.status(utils_1.HttpStatus.OK).send({ status: true });
                        return;
                    }
                    const { code, headers, isOctectStream } = controllerResult, data = __rest(controllerResult, ["code", "headers", "isOctectStream"]);
                    if (isOctectStream) {
                        res
                            .set(Object.assign({}, headers))
                            .status(code !== null && code !== void 0 ? code : utils_1.HttpStatus.OK)
                            .pipe(data.body);
                    }
                    res
                        .set(Object.assign({}, headers))
                        .status(code !== null && code !== void 0 ? code : utils_1.HttpStatus.OK)
                        .send(data);
                }
                catch (error) {
                    logging_1.logger.error(error);
                    next(error);
                }
            };
        };
    }
}
exports.ControlHandler = ControlHandler;
//# sourceMappingURL=controllerHandler.js.map
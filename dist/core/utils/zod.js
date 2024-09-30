"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidate = void 0;
const errors_1 = require("../errors");
const joiValidate = (schema, obj) => {
    const { error } = schema.validate(obj);
    if (error) {
        throw new errors_1.BadRequestError(error.message);
    }
};
exports.joiValidate = joiValidate;
//# sourceMappingURL=zod.js.map
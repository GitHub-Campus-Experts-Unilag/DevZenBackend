import * as Joi from "joi";
import { ValidationSchema } from "../../core";

export const createFeedbackSchema: ValidationSchema = {
    inputSchema: Joi.object({
        email: Joi.string().email().required(),
        message: Joi.string().required()
    })
}


// export const signInSchema: ValidationSchema = {
//   inputSchema: Joi.object({
//     password: Joi.string().trim().required(),
//     email: Joi.string().required().trim(),
//   }),
// };

import * as Joi from "joi";
import { ValidationSchema} from "../../../core";

export const signUpSchema: ValidationSchema = {
    inputSchema: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
    })
}


export const signInSchema: ValidationSchema = {
  inputSchema: Joi.object({
    password: Joi.string().trim().required(),
    email: Joi.string().required().trim(),
  }),
};

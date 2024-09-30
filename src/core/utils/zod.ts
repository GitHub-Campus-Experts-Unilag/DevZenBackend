import { Schema } from "joi";
import { BadRequestError } from "../errors";

export const joiValidate = (schema: Schema, obj: any) => {
  const { error } = schema.validate(obj);
  if (error) {
    throw new BadRequestError(error.message);
  }
};

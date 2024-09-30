import * as crypto from "crypto";

export const generateRandStr = () => {
  return crypto.randomBytes(12).toString("hex");
};

export const computeExpiryDate = (timeInSeconds: number) => {
  return new Date(Date.now() + timeInSeconds * 1000);
};

export const sanitize = (model: any) => {
  const result = Object.assign({}, model._doc);
  delete result?._id;
  delete result?.__v;
  delete result?.password;
  return result;
};

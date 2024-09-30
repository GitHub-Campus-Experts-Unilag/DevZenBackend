import { Schema, model } from "mongoose";
import { IModel } from "../../common";

export interface IBlacklistToken extends IModel {
  token: string;
  expiry: Date;
}

export const blacklistTokenSchema = new Schema<IBlacklistToken>(
  {
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: false,      
    }
  },
  { timestamps: true },
);


export const BlackListTokens = model("blacklistokens", blacklistTokenSchema);
export type BlackListRepository = typeof BlackListTokens;
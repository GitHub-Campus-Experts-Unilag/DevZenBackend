import * as crypto from "node:crypto";

import { Schema } from "mongoose";
import { IUsers } from "./user.interface";

export const userSchema = new Schema<IUsers>(
  {
    googleId: {
      type: String,
      required: false,
    },
    githubId: {
      type: String,
      required: false,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.refreshToken;
      },
    },
  }
);

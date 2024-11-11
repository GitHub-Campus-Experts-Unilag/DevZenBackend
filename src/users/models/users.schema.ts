import * as crypto from "node:crypto";

import { Schema } from "mongoose";
import { IUsers, IFeedback } from "./user.interface";

export const userSchema = new Schema<IUsers>(
  {
    user_id: {
      type: String,
      required: false,
      unique: true,
      default: () => crypto.randomUUID(),
      index: true,
    },
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
        ret.user_id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.refreshToken;
      },
    },
  }
);

export const feedbackSchema = new Schema<IFeedback>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    virtuals: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.feedback_id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

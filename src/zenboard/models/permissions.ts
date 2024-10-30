import { model, Schema } from "mongoose";

const permissionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  zenboardId: {
    type: Schema.Types.ObjectId,
    ref: "Zenboard",
    required: true,
  },
  accessLevel: {
    type: String,
    enum: ["owner", "editor", "viewer"],
    default: "viewer",
  },
});

export const Permissions = model("Permissions", permissionsSchema);

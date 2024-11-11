import { model, Schema } from "mongoose";
import { AccessLevels } from "./accessLevels.enum";

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
    enum: Object.values(AccessLevels),
    default: "viewer",
  },
});

export const Permissions = model("Permissions", permissionsSchema);

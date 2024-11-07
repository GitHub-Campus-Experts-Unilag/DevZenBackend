import { model, Schema } from "mongoose";

const invitesSchema = new Schema({
  zenboardId: {
    type: Schema.Types.ObjectId,
    ref: "Zenboard",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  invitedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export const Invites = model("Invites", invitesSchema);

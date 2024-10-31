import { model, Schema } from "mongoose";

const zenboardSchema = new Schema(
  {
    // ownerId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Users",
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permissions",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Zenboard = model("Zenboard", zenboardSchema);

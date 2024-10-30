import { Permissions } from "../models/permissions";
import { Types } from "mongoose";

export const addPermission = async (
  userId: Types.ObjectId,
  zenboardId: Types.ObjectId,
  accessLevel: "owner" | "editor" | "viewer" = "viewer"
) => {
  const permission = new Permissions({ userId, zenboardId, accessLevel });
  return await permission.save();
};

export const updatePermission = async (
  permissionId: Types.ObjectId,
  accessLevel: "owner" | "editor" | "viewer"
) => {
  return await Permissions.findByIdAndUpdate(
    permissionId,
    { accessLevel },
    { new: true }
  );
};

export const revokePermission = async (permissionId: Types.ObjectId) => {
  return await Permissions.findByIdAndDelete(permissionId);
};

export const getPermissionsForZenboard = async (zenboardId: Types.ObjectId) => {
  return await Permissions.find({ zenboardId }).populate(
    "userId",
    "displayName email"
  );
};

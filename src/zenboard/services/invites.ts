import { Invites } from "../models/invites";
import { Types } from "mongoose";

export const sendInvite = async (
  zenboardId: Types.ObjectId,
  email: string,
  invitedBy: Types.ObjectId
) => {
  const invite = new Invites({ zenboardId, email, invitedBy });
  return await invite.save();
};

export const updateInviteStatus = async (
  inviteId: Types.ObjectId,
  status: "accepted" | "rejected"
) => {
  return await Invites.findByIdAndUpdate(inviteId, { status }, { new: true });
};

export const getPendingInvitesForZenboard = async (
  zenboardId: Types.ObjectId
) => {
  return await Invites.find({ zenboardId, status: "pending" });
};

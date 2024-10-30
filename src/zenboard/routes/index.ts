import { Router } from "express";
import { Types } from "mongoose";
import {
  addPermission,
  updatePermission,
  revokePermission,
} from "../services/permissions";
import {
  sendInvite,
  updateInviteStatus,
  getPendingInvitesForZenboard,
} from "../services/invites";

export const zenboardRouter = Router();

zenboardRouter.post("/:zenboardId/invite", async (req, res) => {
  const { zenboardId } = req.params;
  const { email } = req.body;
  const invitedBy = req.user?.id;

  try {
    const invite = await sendInvite(
      new Types.ObjectId(zenboardId),
      email,
      new Types.ObjectId(invitedBy)
    );
    res.status(201).json(invite);
  } catch (error) {
    res.status(500).json({ message: "Error sending invite", error });
  }
});

zenboardRouter.put("/invite/:inviteId", async (req, res) => {
  const { inviteId } = req.params;
  const { status } = req.body;

  try {
    const updatedInvite = await updateInviteStatus(
      new Types.ObjectId(inviteId),
      status
    );
    res.status(200).json(updatedInvite);
  } catch (error) {
    res.status(500).json({ message: "Error updating invite status", error });
  }
});

zenboardRouter.post("/:zenboardId/permissions", async (req, res) => {
  const { zenboardId } = req.params;
  const { userId, accessLevel } = req.body;

  try {
    const permission = await addPermission(
      new Types.ObjectId(userId),
      new Types.ObjectId(zenboardId),
      accessLevel
    );
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Error granting permission", error });
  }
});

zenboardRouter.delete("/permissions/:permissionId", async (req, res) => {
  const { permissionId } = req.params;

  try {
    const result = await revokePermission(new Types.ObjectId(permissionId));
    res.status(200).json({ message: "Permission revoked", result });
  } catch (error) {
    res.status(500).json({ message: "Error revoking permission", error });
  }
});

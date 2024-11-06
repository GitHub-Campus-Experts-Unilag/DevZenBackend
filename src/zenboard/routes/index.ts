import { Router } from "express";
import { Types } from "mongoose";
import { Zenboard } from "../models";
import { CurrentUser } from "../../auth/middlewares/current.user";
import { Encryptor } from "../../app/providers/encryptor";
import { TokenService } from "../../auth/helpers";
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

const encryptor = new Encryptor();
const tokenService = new TokenService(encryptor);
const currentUserMiddleware = new CurrentUser(tokenService, encryptor);

zenboardRouter.use(currentUserMiddleware.handle);

// Route to create a new Zenboard
zenboardRouter.post("/", async (req, res) => {
  const { title } = req.body;
  const ownerId = req.user?.id;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const zenboard = await Zenboard.create({
      title,
      ownerId: new Types.ObjectId(ownerId),
    });
    res.status(201).json(zenboard);
  } catch (error) {
    res.status(500).json({ message: "Error creating Zenboard", error });
  }
});

// Route to invite a user to a Zenboard
zenboardRouter.post("/:zenboardId/invite", async (req, res) => {
  const { zenboardId } = req.params;
  const { email } = req.body;
  const invitedBy = req.user?.id;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

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

// Route to update the invite status
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

/**
 * @swagger
 * /protected/zenboard/{zenboardId}/permissions:
 *   post:
 *     summary: Add permissions to a Zenboard
 *     tags: [Zenboard]
 *     parameters:
 *       - in: path
 *         name: zenboardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Zenboard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - accessLevel
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to grant permission to
 *               accessLevel:
 *                 type: string
 *                 description: The level of access to grant
 *     responses:
 *       201:
 *         description: Permission granted successfully
 *       500:
 *         description: Error granting permission
 */

// Route to add permissions to a Zenboard
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

// Route to revoke permissions
zenboardRouter.delete("/permissions/:permissionId", async (req, res) => {
  const { permissionId } = req.params;

  try {
    const result = await revokePermission(new Types.ObjectId(permissionId));
    res.status(200).json({ message: "Permission revoked", result });
  } catch (error) {
    res.status(500).json({ message: "Error revoking permission", error });
  }
});

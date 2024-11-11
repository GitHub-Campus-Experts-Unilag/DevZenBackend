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

/**
 * @swagger
 * /v1/protected/zenboard:
 *   post:
 *     summary: Create a new Zenboard
 *     tags: [Zenboard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the new Zenboard
 *                 example: "Project Roadmap"
 *     responses:
 *       201:
 *         description: Zenboard created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created Zenboard
 *                 title:
 *                   type: string
 *                   description: The title of the Zenboard
 *                 ownerId:
 *                   type: string
 *                   description: The ID of the owner who created the Zenboard
 *       400:
 *         description: Title is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Title is required"
 *       500:
 *         description: Error creating Zenboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating Zenboard"
 *                 error:
 *                   type: object
 *                   description: Details of the error
 */

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

/**
 * @swagger
 * /v1/protected/zenboard/{zenboardId}/invite:
 *   post:
 *     summary: Send an invite to join a Zenboard
 *     tags: [Zenboard]
 *     parameters:
 *       - in: path
 *         name: zenboardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Zenboard to send the invite for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user to invite
 *                 example: "user@example.com"
 *     responses:
 *       201:
 *         description: Invite sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the invite
 *                 email:
 *                   type: string
 *                   description: The email address of the invited user
 *                 invitedBy:
 *                   type: string
 *                   description: The ID of the user who sent the invite
 *                 zenboardId:
 *                   type: string
 *                   description: The ID of the Zenboard for which the invite was sent
 *       400:
 *         description: Email is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is required"
 *       500:
 *         description: Error sending invite
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error sending invite"
 *                 error:
 *                   type: object
 *                   description: Details of the error
 */

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

/**
 * @swagger
 * /v1/protected/zenboard/invite/{inviteId}:
 *   put:
 *     summary: Update the status of an invite
 *     tags: [Zenboard]
 *     parameters:
 *       - in: path
 *         name: inviteId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the invite to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status for the invite (e.g., "accepted", "declined")
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Invite status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated invite
 *                 status:
 *                   type: string
 *                   description: The updated status of the invite
 *       500:
 *         description: Error updating invite status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating invite status"
 *                 error:
 *                   type: object
 *                   description: Details of the error
 */

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
 * /v1/protected/zenboard/{zenboardId}/permissions:
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

/**
 * @swagger
 * /v1/protected/zenboard/permissions/{permissionId}:
 *   delete:
 *     summary: Revoke a specific permission
 *     tags: [Zenboard]
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *           example: 5f43a2c5e4b0a10017d9c5b1
 *         description: The unique ID of the permission to revoke
 *     responses:
 *       200:
 *         description: Permission revoked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission revoked"
 *                 result:
 *                   type: object
 *                   description: Result of the revocation operation
 *       500:
 *         description: Error revoking permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error revoking permission"
 *                 error:
 *                   type: object
 *                   description: Details of the error
 */

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

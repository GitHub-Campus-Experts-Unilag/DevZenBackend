import { Router } from "express";
import { zenboardRouter } from "../../zenboard";

export const protectedRouter = Router();

protectedRouter.use("/zenboard", zenboardRouter);

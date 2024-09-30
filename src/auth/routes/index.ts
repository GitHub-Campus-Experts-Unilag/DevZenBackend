import { Router } from "express";
import { authRateLimiter, controlHandler } from "../../core";
import { signInSchema, signUpSchema } from "./schema";
import * as express from "express";
import { currentUser, signUp, signIn, signOut } from "../auth.module";

export const authRouter = Router();
authRouter.use(express.json());

authRouter
  .post("/sign-up", controlHandler.handle(signUp.handle, signUpSchema))
  .post("/sign-in", controlHandler.handle(signIn.handle, signInSchema))
  .post("/sign-out", currentUser.handle, controlHandler.handle(signOut.handle));

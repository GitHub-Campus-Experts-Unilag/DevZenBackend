import { Router } from "express";
import * as passport from "passport";
import { GitHubController } from "../controllers/github.controller";
import { authRateLimiter, controlHandler } from "../../core";
import { signInSchema, signUpSchema } from "./schema";
import * as express from "express";
import { currentUser, signUp, signIn, signOut } from "../auth.module";

export const authRouter = Router();
const githubController = new GitHubController();
authRouter.use(express.json());

authRouter
  .post("/sign-up", controlHandler.handle(signUp.handle, signUpSchema))
  .post("/sign-in", controlHandler.handle(signIn.handle, signInSchema))
  .post("/sign-out", currentUser.handle, controlHandler.handle(signOut.handle));

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/sign-in" }),
  githubController.callbackHandler
);

authRouter.post(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/sign-in" }),
  githubController.callbackHandler
);

authRouter.get("/logout", githubController.logout);

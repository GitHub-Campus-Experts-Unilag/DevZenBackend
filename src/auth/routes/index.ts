import * as express from "express";
import { Router } from "express";
// import { currentUser, signIn, signOut, signUp } from "../auth.module";
import { authRateLimiter } from "../../core";
import { oauthRouter } from "./signin.route";
// import { controlHandler } from "../../core";
// import { signInSchema, signUpSchema } from "./schema";

export const authRouter = Router();
authRouter.use(express.json());
authRouter.use(authRateLimiter);

// currently unused routes
// authRouter
//   .post("/sign-up", controlHandler.handle(signUp.handle, signUpSchema))
//   .post("/sign-in", controlHandler.handle(signIn.handle, signInSchema))
//   .post("/sign-out", currentUser.handle, controlHandler.handle(signOut.handle));

authRouter.use("/oauth", oauthRouter);

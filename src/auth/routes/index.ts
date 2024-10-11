import * as express from "express";
import { Router } from "express";
import * as passport from "passport";
import { controlHandler } from "../../core";
import { currentUser, signIn, signOut, signUp } from "../auth.module";
import { signInSchema, signUpSchema } from "./schema";

export const authRouter = Router();
authRouter.use(express.json());

authRouter
  .post("/sign-up", controlHandler.handle(signUp.handle, signUpSchema))
  .post("/sign-in", controlHandler.handle(signIn.handle, signInSchema))
  .post("/sign-out", currentUser.handle, controlHandler.handle(signOut.handle))
  .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  .get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
        (req, res) => {
            res.redirect('/v1/auth/dashboard'); //temporary redirect path for now
        }
    )
    //temporary route for successful google authentication
    .get("/dashboard", (req, res) => {
        res.send("You have successfully logged in with Google");
    })

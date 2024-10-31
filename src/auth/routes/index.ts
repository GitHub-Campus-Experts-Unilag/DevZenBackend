import * as express from "express";
import { authRateLimiter } from "../../core";
import { authPassport, githubController } from "../services";
import { Router } from "express";

export const oauthRouter = Router();
// oauthRouter.use(authRateLimiter);

// google
oauthRouter
  .get(
    "/google",
    authPassport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    authPassport.authenticate("google", { failureRedirect: "/sign-in" }),
    (req, res) => {
      res.redirect("/v1/auth/dashboard"); //temporary redirect path for now
    }
  )
  //temporary route for successful google authentication
  .get("/dashboard", (req, res) => {
    res.send("You have successfully logged in with Google");
  });

// github
oauthRouter
  .get(
    "/github",
    authPassport.authenticate("github", { scope: ["user:email"] })
  )
  .get(
    "/github/callback",
    authPassport.authenticate("github", { failureRedirect: "/auth/sign-in" }),
    githubController.callbackHandler
  );
oauthRouter.get("/logout", githubController.logout);

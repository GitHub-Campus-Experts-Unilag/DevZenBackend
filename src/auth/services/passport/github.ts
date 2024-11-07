import { Request, Response, NextFunction } from "express";
import { Profile } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { config, UnProcessableError } from "../../../core";
import { Users } from "../../../users";
import { IAuthData } from "../../types";

export const githubStrategy = new GitHubStrategy(
  {
    clientID: config.auth.passport.github.clientID,
    clientSecret: config.auth.passport.github.clientSecret,
    callbackURL: config.auth.passport.github.callBackUrl,
    // callbackURL: `${config.app.host}/auth/oauth/github/callback`,
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
  ) => {
    try {
      const email = profile.emails?.[0]?.value || undefined;

      let user = await Users.findOne({ githubId: profile.id });

      if (!user) {
        if (email) {
          user = await Users.findOne({ email });
        }
        if (!user) {
          user = await Users.create({
            githubId: profile.id,
            displayName:
              profile.displayName || profile.username || "Abercrombie",
            // email, 
          });
        }
      }

      const authData: IAuthData = {
        id: user.id,
        email: user.email!,
        accessToken,
      };
      return done(null, authData);
    } catch (error) {
      const newError = new UnProcessableError(
        `GitHub Authentication Error: ${error}`
      );
      return done(newError as Error, undefined);
    }
  }
);

//
class GitHubController {
  signInWithGitHub = (req: Request, res: Response): void => {
    res.redirect("/auth/github");
  };

  callbackHandler = (req: Request, res: Response): void => {
    const user = req.user as IAuthData; // Typecast to IAuthData

    if (user && user.accessToken) {
      res.status(200).json({
        message: "Successfully logged in with GitHub",
        accessToken: user.accessToken,
        id: user.id,
      });
    } else {
      res.status(500).json({ message: "Failed to retrieve access token" });
    }
  };

  logout = (req: Request, res: Response): void => {
    req.logout((err) => {
      if (err) {
        return res.status(500).send("Logout error");
      }
      res.redirect("/");
    });
  };
}

export const githubController = new GitHubController();

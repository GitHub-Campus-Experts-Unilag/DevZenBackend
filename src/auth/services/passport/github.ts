import { Request, Response, NextFunction } from "express";
import { Profile } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { config, UnProcessableError } from "../../../core";
import { Users } from "../../../users";

export const githubStrategy = new GitHubStrategy(
  {
    clientID: config.auth.passport.github.clientID,
    clientSecret: config.auth.passport.github.clientSecret,
    callbackURL: `${config.app.host}/auth/oauth/github/callback`,
    //   passReqToCallback: true,
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
  ) => {
    try {
      let user = await Users.findOne({ githubId: profile.id });

      if (!user) {
        user = await Users.create({
          githubId: profile.id,
          displayName: profile.displayName || profile.username || "Abercrombie",
          email: profile.emails ? profile.emails[0].value : undefined,
        });
      }

      return done(null, user);
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
    res.redirect("/profile");
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

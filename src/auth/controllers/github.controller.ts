import { Request, Response } from "express";

export class GitHubController {
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

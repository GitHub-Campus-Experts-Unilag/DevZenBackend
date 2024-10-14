import express, { Request, Response, Router } from "express";
import * as passport from "passport";
import * as session from "express-session";
import { config, HttpStatus } from "../core";
import { authRouter } from "../auth/routes";
import { serveDocumentation, setupDocumentation } from "../core";
import "../auth/strategies/passport-github";

const appRouter = Router();

appRouter.use(
  session({
    secret: config.auth.accessTokenSecret,
    resave: false,
    saveUninitialized: true,
  })
);

appRouter.use(passport.initialize());
appRouter.use(passport.session());

appRouter.get("/health", (_: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    message: "API ok",
    version: "1.0",
  });
});

appRouter.use("/api-docs", serveDocumentation, setupDocumentation);

appRouter.use("/auth", authRouter);

export { appRouter };

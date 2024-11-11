import { Request, Response, Router } from "express";
import * as session from "express-session";
import {
  config,
  HttpStatus,
  serveDocumentation,
  setupDocumentation,
} from "../../core";
import { authRouter, authPassport } from "../../auth";
import { protectedRouter } from "./protected";
import { feedbackRouter } from "../../users/routes/feedback.router";

const appRouter = Router();

appRouter.get("/health", (_: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    message: "API ok",
    version: "1.0",
  });
});
appRouter.use("/api-docs", serveDocumentation, setupDocumentation);

appRouter.use(
  session({
    secret: config.auth.passport.sessionSecret!,
    resave: false,
    saveUninitialized: false,
  })
);
appRouter.use(authPassport.initialize());
appRouter.use(authPassport.session());

appRouter.use("/auth", authRouter);
appRouter.use("/protected", protectedRouter);
appRouter.use("/feedback", feedbackRouter);

export { appRouter };

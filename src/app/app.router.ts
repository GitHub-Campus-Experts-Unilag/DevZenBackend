import { Request, Response, Router } from "express";

import { authRouter } from "../auth";
import { HttpStatus, serveDocumentation, setupDocumentation } from "../core";

export const appRouter = Router();

appRouter.get("/health", (_: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    message: "API ok",
    version: "1.0",
  });
});

// api documentation (swagger)
appRouter.use("/api-docs", serveDocumentation, setupDocumentation);

appRouter
  .use("/auth", authRouter);

import { Request, Response, Router } from "express";
import { HttpStatus, serveDocumentation, setupDocumentation } from "../../core";
import { authRouter } from "../../auth";
import { protectedRouter } from "./protected";

const appRouter = Router();

appRouter.get("/health", (_: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    message: "API ok",
    version: "1.0",
  });
});
appRouter.use("/api-docs", serveDocumentation, setupDocumentation);
appRouter.use("/auth", authRouter);
appRouter.use("/protected", protectedRouter);

export { appRouter };

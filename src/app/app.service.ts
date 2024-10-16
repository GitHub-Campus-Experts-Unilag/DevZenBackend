import * as parser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import helmet from "helmet";
import * as morgan from "morgan";
import { configurePassport } from "../auth/config/passport-config";
import { config, errorHandler, notFoundHandler } from "../core";
import { appRouter } from "./router";

export const app = express();

if (
  config.app.environment.isInDevelopment ||
  config.app.environment.isInTesting
) {
  app.use(morgan("dev"));
}

export const exp = app.use(express.json());
app.use(parser.urlencoded({ extended: false }));
app.use(helmet());
app.disable("x-powered-by");
app.use(compression());
app.use(cors());

configurePassport(app);

app.use("/v1", appRouter);
app.use(notFoundHandler.handle);
app.use(errorHandler.handle);

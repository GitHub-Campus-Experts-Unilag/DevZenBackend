import { Logger } from "winston";
import { prodDevLogger, buildDevLogger } from "./logs";

export const logger: Logger =
  process.env.NODE_ENV === "production" ? prodDevLogger() : buildDevLogger();

import { logger } from "../logging";

export const gracefullyShutdown = async (error: unknown) => {
  console.error("UNEXPECTED_APP_ERROR", { error });
  process.exit(1);
};

import { join } from "path";
import { createLogger, transports, format } from "winston";
const { combine, printf, timestamp, colorize } = format;

function logFormat() {
  return printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.stack || info.message}`;
  });
}

export function prodDevLogger() {
  return createLogger({
    format: combine(colorize(), timestamp(), logFormat()),
    transports: [
      new transports.File({
        filename: join(__dirname, "appLogs/app.log"),
      }),
    ],
  });
}

export function buildDevLogger() {
  return createLogger({
    format: combine(colorize(), timestamp(), logFormat()),
    transports: [new transports.Console()],
  });
}

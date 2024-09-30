import { CorsOptions } from "cors";

const allowedOrigins: string | RegExp | (string | RegExp)[] = [
  "localhost:3000",
  "*",
  /^http:\/\/localhost:\d+$/,
  /^https?:\/\/.+/,
];

const allowedMethods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const allowedHeaders: string[] = ["Content-Type", "Authorization"];

export const corsOptions: CorsOptions = {
  methods: allowedMethods,
  allowedHeaders,
  origin: allowedOrigins,
};

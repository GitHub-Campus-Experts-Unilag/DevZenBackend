import * as dotenv from "dotenv";
import { ENVIRONMENT } from "../utils";

dotenv.config();

export const config = Object.freeze({
  app: {
    port: parseInt(process.env.PORT!),
    environment: {
      mode: process.env.NODE_ENV,
      isInProduction: process.env.NODE_ENV === ENVIRONMENT.PROD,
      isInDevelopment: process.env.NODE_ENV === ENVIRONMENT.DEV,
      isInTesting: process.env.NODE_ENV === ENVIRONMENT.TEST,
    },
    encryption: {
      key: process.env.ENCRYPTION_KEY as string,
    },
  },
  mail: {
    apiKey: process.env.MAIL_API_KEY as string,
    domain: process.env.MAIL_DOMAIN as string,
    globalFrom: process.env.MAIL_FROM,
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    smtpUsername: process.env.USER_EMAIL,
    smtpClientId: process.env.CLIENT_ID as string,
    smtpClientSecret: process.env.CLIENT_SECRET as string,
    smtpRefreshToken: process.env.REFRESH_TOKEN as string,
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_SECRET_LIFESPAN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_SECRET_LIFESPAN as string,
  },
  cache: {
    port: parseInt(process.env.REDIS_PORT!),
    host: process.env.REDIS_HOST,
    ttl: parseInt(process.env.REDIS_TTL!),
  },
  db: {
    mongodb: {
      MONGO_URL: process.env.MONGO_URL as string,
    },
    postgresql: {
      POSTGRESQL_USER: process.env.POSTGRESQL_USER as string,
      POSTGRESQL_USER_PASSWORD: process.env.POSTGRESQL_USER_PASSWORD as string,
      POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE as string,
      POSTGRESQL_PORT: parseInt(process.env.POSTGRESQL_PORT!),
    },
  },
  rateLimit: {
    limit: process.env.WINDOW_RATE_LIMIT,
  },
});

export default config;

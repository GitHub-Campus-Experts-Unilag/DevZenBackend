// src/swaggerConfig.ts
import { Options } from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "./config";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Devzen API documentation",
      version: "1.0.0",
      description: "API documentation for Devzen backend",
    },
    servers: [
      {
        url: config.app.host,
        description: `Server in ${config.app.environment.mode}.`,
      },
    ],
  },
  
  apis: ["./src/**/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export const serveDocumentation = swaggerUi.serve;
export const setupDocumentation = swaggerUi.setup(swaggerDocs);

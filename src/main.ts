import { startApp } from "./app";
import { gracefullyShutdown, initializeDbConnection } from "./core";

initializeDbConnection().then(startApp).catch(gracefullyShutdown);

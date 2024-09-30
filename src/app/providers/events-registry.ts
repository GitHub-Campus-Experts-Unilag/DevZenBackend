import { logger, config } from "../../core";

/**
 * Event Listener Registry.
 */
export const register = {
	"app:up": [
		() =>
			logger.info(
				`Server started at port ${config.app.port} in ${config.app.environment.mode} environment`
			),
	],
	"database:conn:established": () =>
		logger.info(`Database connection established`),
	"cache:connection:established": () =>
		logger.info(`Cache connection established`),
	"event:registration:successful": () =>
		logger.info("Events listeners registered"),
};

import mongoose from "mongoose";
import config from "./config";
import { dispatch } from "../../app";

// database connection.
const initializeDbConnection = async () => {
	return mongoose
		.connect(config.db.mongodb.MONGO_URL)
		.then(() => {
			dispatch("database:conn:established");
		})
		.catch((error) => {
			console.log("error occured");
			throw new Error(error);
		});
};

export { initializeDbConnection };


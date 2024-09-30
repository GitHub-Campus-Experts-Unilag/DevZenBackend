import mongoose from "mongoose";
import config from "./config";

// database connection.
const initializeDbConnection = async () => {
  return  mongoose.connect(config.db.mongodb.MONGO_URL)
  .then(() => {
    console.log("db connected")
  })
  .catch((error) => {
    console.log("error occured")
    throw new Error(error)
  }); 
};

export { initializeDbConnection, mongoose };


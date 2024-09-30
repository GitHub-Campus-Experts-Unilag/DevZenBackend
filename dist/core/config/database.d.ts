import mongoose from "mongoose";
declare const initializeDbConnection: () => Promise<void>;
export { initializeDbConnection, mongoose };

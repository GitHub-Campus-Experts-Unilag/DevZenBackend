import { model } from "mongoose";
import { userSchema } from "./users.schema";




export const Users = model("Users", userSchema);
export type UserRepository = typeof Users;
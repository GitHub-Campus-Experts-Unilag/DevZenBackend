import { model } from "mongoose";
import { feedbackSchema, userSchema } from "./users.schema";




export const Users = model("Users", userSchema);
export type UserRepository = typeof Users;


export const Feedbacks = model("Feedbacks", feedbackSchema);
export type FeedbackRepository = typeof Feedbacks;
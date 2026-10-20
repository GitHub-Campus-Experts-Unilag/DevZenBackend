import { IModel } from "../../common";

export interface IUsers extends IModel {
  _id?: string;
  // user_id?: string;
  googleId?: string;
  githubId?: string;
  displayName: string;
  profileImage?: string;
  email?: string;
  password?: string;
  isDeleted: Boolean;
}


// adding feedback model interface
export interface IFeedback extends IModel {
  feedback_id?: string;
  email: string;
  message: string;
}
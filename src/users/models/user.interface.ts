import { IModel } from "../../common";

export interface IUsers extends IModel {
  user_id?: string;
  googleId?: string;
  githubId?: string;
  displayName: string;
  profileImage?: string;
  email?: string;
  password?: string;
  isDeleted: Boolean;
}

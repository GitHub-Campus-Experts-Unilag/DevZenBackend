import { IModel } from "../../common";

export interface IUsers extends IModel {
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isDeleted: boolean;
  refreshToken: string;
}



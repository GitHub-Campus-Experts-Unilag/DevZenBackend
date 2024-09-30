import { IJwtData } from "../../../auth/types";
declare global {
  namespace Express {
    export interface Request {
      user: IJwtData | null | undefined;
    }
  }
}

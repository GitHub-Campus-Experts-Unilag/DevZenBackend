import { IJwtData } from "../../../auth/types";
declare global {
    namespace Express {
        interface Request {
            user: IJwtData | null | undefined;
        }
    }
}

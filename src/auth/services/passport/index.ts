import * as passport from "passport";
import { githubStrategy } from "./github";
import { googleStrategy } from "./google";
import { Users, IUsers } from "../../../users";
import { IAuthData } from "../../types";

export { githubController } from "./github";

export const authPassport = passport;

authPassport.serializeUser((user: IUsers | IAuthData, done) => {
  done(null, (user as IUsers)._id || (user as IAuthData).id);
});

authPassport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

authPassport.use(githubStrategy);
authPassport.use(googleStrategy);

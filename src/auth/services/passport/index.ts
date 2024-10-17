import * as passport from "passport";
import { githubStrategy } from "./github";
import { googleStrategy } from "./google";
import { Users, IUsers } from "../../../users";

export { githubController } from "./github";

export const authPassport = passport;
authPassport.serializeUser((user: IUsers, done) => {
  done(null, user.user_id);
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

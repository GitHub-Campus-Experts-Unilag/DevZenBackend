import * as passport from "passport";
import { Profile } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Users } from "../../users";
import { config } from "../../core";


passport.use(
  new GitHubStrategy(
    {
      clientID: config.auth.passport.github.clientID,
      clientSecret: config.auth.passport.github.clientSecret,
      callbackURL: config.auth.passport.github.callBackUrl,
      //   passReqToCallback: true,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      try {
        let user = await Users.findOne({ githubId: profile.id });

        if (!user) {
          user = await Users.create({
            githubId: profile.id,
            displayName: profile.displayName || profile.username,
            email: profile.emails ? profile.emails[0].value : undefined,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("GitHub Authentication Error:", error);
        return done(error);
      }
    }
  )
);


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

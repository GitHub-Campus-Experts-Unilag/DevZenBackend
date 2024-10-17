import { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config, UnProcessableError } from "../../../core";
import { Users } from "../../../users";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.auth.passport.google.clientID,
    clientSecret: config.auth.passport.google.clientSecret,
    callbackURL: `${config.app.host}/auth/oauth/google/callback`,
  },
  async function (accessToken, refreshToken, profile: Profile, done) {
    try {
      let user = await Users.findOne({ googleId: profile.id });

      if (!user) {
        user = await Users.create({
          googleId: profile.id,
          displayName: profile.displayName || "Abercrombie",
          email: profile.emails?.[0]?.value,
          profileImage: profile.photos?.[0]?.value,
        });
      }

      return done(null, user);
    } catch (error) {
      const newError = new UnProcessableError(
        `Google Authentication Error: ${error}`
      );
      return done(newError as Error, undefined);
    }
  }
);

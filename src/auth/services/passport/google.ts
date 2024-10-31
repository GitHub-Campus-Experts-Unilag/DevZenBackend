import { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config, UnProcessableError } from "../../../core";
import { Users } from "../../../users";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.auth.passport.google.clientID,
    clientSecret: config.auth.passport.google.clientSecret,
    callbackURL: config.auth.passport.google.callBackUrl,
  },
  async function (accessToken, refreshToken, profile: Profile, done) {
    try {
      const email = profile.emails?.[0]?.value;

      let user = await Users.findOne({ googleId: profile.id });

      if (!user && email) {
        user = await Users.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          await user.save();
        } else {
          user = await Users.create({
            googleId: profile.id,
            displayName: profile.displayName || "Abercrombie",
            email,
            profileImage: profile.photos?.[0]?.value,
          });
        }
      }

      return done(null, user || undefined);
    } catch (error) {
      const newError = new UnProcessableError(
        `Google Authentication Error: ${error}`
      );
      return done(newError as Error, undefined);
    }
  }
);

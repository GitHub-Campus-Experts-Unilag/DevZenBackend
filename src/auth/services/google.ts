import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { IUsers } from '../../users';

dotenv.config();

export const configureGoogleStrategy = (userModel: Model<IUsers>) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await userModel.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value,
            profileImage: profile.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  ));

  passport.serializeUser((user: IUsers, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await userModel.findOne({ user_id: id });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

import * as dotenv from 'dotenv';
import express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { Users } from '../../users';
import { configureGoogleStrategy } from '../services/google';

dotenv.config();

export function configurePassport(app: express.Application) {
  app.use(session({
    secret: process.env.PASSPORT_SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  configureGoogleStrategy(Users);
}

import rateLimit from "express-rate-limit";
import * as moment from "moment";

export const globalRateLimiter = rateLimit({
  windowMs: moment().add(12, "hours").unix(), // 24 hrs in milliseconds
  max: 400, //TODO: to be decided on
  message: "You have exceeded the 100 requests in 24 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimiter = rateLimit({
  windowMs: moment().add(6, "hours").unix(), // 24 hrs in milliseconds
  max: 10,
  message: "You have exceeded the 10 requests in 24 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

import RateLimit from 'express-rate-limit';
// import MongoStore from 'rate-limit-mongo';
// import { getConfig } from '../config';

export function createRateLimiter({
  max,
  windowMs,
  message,
}: {
  max: number;
  windowMs: number;
  message: string;
}) {
  return new RateLimit({
    // store: new MongoStore({
    //   uri: getConfig().DATABASE_CONNECTION,
    // }),
    max,
    windowMs,
    message,
  });
}

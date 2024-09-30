import { RedisOptions } from "ioredis";

import config from "./config";

export const cacheOptions: RedisOptions = {
  port: config.cache.port,
  host: config.cache.host,
};

// ioredis-mock for testing.

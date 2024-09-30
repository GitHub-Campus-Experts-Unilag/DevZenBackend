import { Redis, RedisOptions } from "ioredis";

import { dispatch } from "./app.events";
import { logger, config, cacheOptions } from "../../core";

export class AppCacheManager extends Redis {
  public readonly TIME_TO_LIVE: number = config.cache.ttl;

  constructor(options: RedisOptions) {
    super(options);

    dispatch("cache:connection:established");

    super.on("close", () => {
      this.quit();
      logger.debug("Cache connection closed");
    });
  }

  put = async <T extends string | number = string>(
    key: string,
    field: string,
    values: T,
    ttl?: number,
  ): Promise<void> => {
    this.hsetnx(key, field, values);
  };

  read = async <T extends any = any>(key: string): Promise<T | null> => {
    const value: string | null = await this.get(key);
    if (!value) return null;
    return await this.parse<T>(value!);
  };

  has = async (key: string): Promise<boolean> =>
    (await this.get(key)) ? true : false;

  clean = async () => {
    await this.flushdb();
  };

  remove = async (key: string) => {
    try {
      if (await !this.has(key))
        throw new Error(
          `You tried removing the cache with a key[${key}] that does not exists.`,
        );

      await this.del(key);

      return true;
    } catch (err: unknown) {
      logger.debug("Operation failed, key not found in cache");
      // throw the error back to the consumer of the method to handle it.
      throw err;
    }
  };

  private parse = <K extends any = any>(val: string): K => {
    return JSON.parse(val) as K;
  };
}

// export const cache = new AppCacheManager(cacheOptions);

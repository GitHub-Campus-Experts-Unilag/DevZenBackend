import { Redis, RedisOptions } from "ioredis";
export declare class AppCacheManager extends Redis {
    readonly TIME_TO_LIVE: number;
    constructor(options: RedisOptions);
    put: <T extends string | number = string>(key: string, field: string, values: T, ttl?: number) => Promise<void>;
    read: <T extends unknown = any>(key: string) => Promise<T | null>;
    has: (key: string) => Promise<boolean>;
    clean: () => Promise<void>;
    remove: (key: string) => Promise<boolean>;
    private parse;
}

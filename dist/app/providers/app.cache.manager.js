"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCacheManager = void 0;
const ioredis_1 = require("ioredis");
const app_events_1 = require("./app.events");
const core_1 = require("../../core");
class AppCacheManager extends ioredis_1.Redis {
    constructor(options) {
        super(options);
        this.TIME_TO_LIVE = core_1.config.cache.ttl;
        this.put = async (key, field, values, ttl) => {
            this.hsetnx(key, field, values);
        };
        this.read = async (key) => {
            const value = await this.get(key);
            if (!value)
                return null;
            return await this.parse(value);
        };
        this.has = async (key) => (await this.get(key)) ? true : false;
        this.clean = async () => {
            await this.flushdb();
        };
        this.remove = async (key) => {
            try {
                if (await !this.has(key))
                    throw new Error(`You tried removing the cache with a key[${key}] that does not exists.`);
                await this.del(key);
                return true;
            }
            catch (err) {
                core_1.logger.debug("Operation failed, key not found in cache");
                throw err;
            }
        };
        this.parse = (val) => {
            return JSON.parse(val);
        };
        (0, app_events_1.dispatch)("cache:connection:established");
        super.on("close", () => {
            this.quit();
            core_1.logger.debug("Cache connection closed");
        });
    }
}
exports.AppCacheManager = AppCacheManager;
//# sourceMappingURL=app.cache.manager.js.map
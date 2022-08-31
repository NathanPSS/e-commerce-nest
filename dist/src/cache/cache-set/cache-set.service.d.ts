import type { RedisKey, RedisValue } from 'ioredis';
import { CacheGetService } from '../cache-get/cache-get.service';
import { RedisClient } from '../redis/RedisClient';
import type { RedisTTL } from '../types/RedisTypes';
export declare class CacheSetService extends RedisClient {
    private cacheGet;
    constructor(cacheGet: CacheGetService);
    set(key: RedisKey, value: RedisValue, ttl?: RedisTTL): Promise<void>;
    exitsCache(key: RedisKey): Promise<string | null>;
}

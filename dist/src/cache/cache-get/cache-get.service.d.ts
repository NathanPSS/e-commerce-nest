import type { RedisKey } from 'ioredis';
import { RedisClient } from '../redis/RedisClient';
export declare class CacheGetService extends RedisClient {
    get(key: RedisKey): Promise<string | null>;
}

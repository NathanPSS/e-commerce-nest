import { RedisKey } from 'ioredis';
import { RedisClient } from '../redis/RedisClient';
export declare class CacheDelService extends RedisClient {
    del(key: RedisKey, keys?: Array<RedisKey>): Promise<void>;
}

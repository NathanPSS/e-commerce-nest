import { Injectable } from '@nestjs/common';
import type { RedisKey } from 'ioredis';
import { RedisClient } from '../redis/RedisClient';

@Injectable()
export class CacheGetService extends RedisClient{
    async get(key :RedisKey) :Promise<string>{
        const value = await this.client.get(key)
        return value
    }
}

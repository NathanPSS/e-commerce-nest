import Redis from "ioredis";

export class RedisClient {
    constructor(
        protected readonly client = new Redis({
            host: "172.19.0.2",
            port: 6379
        }
    )){}
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheSetService = void 0;
const common_1 = require("@nestjs/common");
const cache_get_service_1 = require("../cache-get/cache-get.service");
const RedisClient_1 = require("../redis/RedisClient");
let CacheSetService = class CacheSetService extends RedisClient_1.RedisClient {
    constructor(cacheGet) {
        super();
        this.cacheGet = cacheGet;
    }
    async set(key, value, ttl = 7200) {
        const cache = await this.exitsCache(key);
        value = value + ';';
        if (cache) {
            value = cache + value;
        }
        await this.client.set(key, value, 'EX', ttl);
    }
    async exitsCache(key) {
        const cache = await this.cacheGet.get(key);
        return cache;
    }
};
CacheSetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_get_service_1.CacheGetService])
], CacheSetService);
exports.CacheSetService = CacheSetService;
//# sourceMappingURL=cache-set.service.js.map
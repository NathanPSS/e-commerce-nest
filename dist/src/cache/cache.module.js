"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModuleLocal = void 0;
const common_1 = require("@nestjs/common");
const cache_get_service_1 = require("./cache-get/cache-get.service");
const cache_del_service_1 = require("./cache-del/cache-del.service");
const cache_set_service_1 = require("./cache-set/cache-set.service");
const cache_normalize_service_1 = require("./cache-normalize/cache-normalize.service");
let CacheModuleLocal = class CacheModuleLocal {
};
CacheModuleLocal = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [cache_get_service_1.CacheGetService, cache_del_service_1.CacheDelService, cache_set_service_1.CacheSetService, cache_normalize_service_1.CacheNormalizeService],
        exports: [cache_del_service_1.CacheDelService, cache_get_service_1.CacheGetService, cache_set_service_1.CacheSetService, cache_normalize_service_1.CacheNormalizeService]
    })
], CacheModuleLocal);
exports.CacheModuleLocal = CacheModuleLocal;
//# sourceMappingURL=cache.module.js.map
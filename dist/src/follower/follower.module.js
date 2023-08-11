"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerModule = void 0;
const common_1 = require("@nestjs/common");
const follower_controller_1 = require("./follower.controller");
const follower_service_1 = require("./follower.service");
const prisma_service_1 = require("../prisma/prisma.service");
let FollowerModule = exports.FollowerModule = class FollowerModule {
};
exports.FollowerModule = FollowerModule = __decorate([
    (0, common_1.Module)({
        controllers: [follower_controller_1.FollowerController],
        providers: [follower_service_1.FollowerService, prisma_service_1.PrismaService],
    })
], FollowerModule);
//# sourceMappingURL=follower.module.js.map
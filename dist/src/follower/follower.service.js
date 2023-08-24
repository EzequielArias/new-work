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
exports.FollowerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("../utils");
let FollowerService = exports.FollowerService = class FollowerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async follow(currentUserId, personId) {
        try {
            await this.prisma.follower.create({
                data: {
                    follower_id: currentUserId,
                    following_id: personId,
                },
            });
            return {
                ok: true,
                statusCode: 200,
                payload: 'Follower',
            };
        }
        catch (err) {
            const res = new utils_1.CustomErr();
            return res.nestErr(err);
        }
    }
    async unfollow(currentUserId, personId) {
        try {
            await this.prisma.follower.delete({
                where: {
                    follower_id_following_id: {
                        follower_id: currentUserId,
                        following_id: personId,
                    },
                },
            });
            return {
                ok: true,
                statusCode: 200,
                payload: 'unfollow',
            };
        }
        catch (err) {
            const res = new utils_1.CustomErr();
            return res.nestErr(err);
        }
    }
    async getFollowersData(currentUserId) {
        try {
            const followers = await this.prisma.follower.findMany({
                where: {
                    follower_id: currentUserId,
                },
                include: {
                    FollowerId: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                        },
                    },
                },
            });
            const following = await this.prisma.follower.findMany({
                where: {
                    following_id: currentUserId,
                },
                include: {
                    FollowingId: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                        },
                    },
                },
            });
            return {
                ok: true,
                statusCode: 200,
                payload: {
                    followers,
                    following,
                },
            };
        }
        catch (err) {
            const res = new utils_1.CustomErr();
            return res.nestErr(err);
        }
    }
};
exports.FollowerService = FollowerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FollowerService);
//# sourceMappingURL=follower.service.js.map
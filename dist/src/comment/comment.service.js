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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const custom_errors_1 = require("../utils/errors/custom.errors");
let CommentService = exports.CommentService = class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadComment(currentUserId, postId, dto) {
        try {
            if (!currentUserId || !postId)
                throw new Error('Credentials invalid');
            await this.prisma.comment.create({
                data: {
                    postsId: postId,
                    accountId: currentUserId,
                    text: dto.text,
                },
            });
            return {
                ok: true,
                statusCode: 200,
                payload: 'comentario agregado'
            };
        }
        catch (err) {
            const res = new custom_errors_1.CustomErr();
            return res.nestErr(err);
        }
    }
    async editComment(currentUserId, commentId, dto) {
        try {
            const comment = await this.getCommentById(currentUserId);
            if (comment.accountId !== currentUserId)
                throw new Error('Credentials invalid');
            await this.prisma.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    text: dto.text,
                },
            });
            return {
                ok: true,
                statusCode: 200,
                payload: 'comentario editado'
            };
        }
        catch (err) {
            const res = new custom_errors_1.CustomErr();
            return res.nestErr(err);
        }
    }
    async getCommentById(commentId) {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });
        return comment;
    }
    async removeComment(currentUserId, commentId) {
        try {
            const comment = await this.getCommentById(currentUserId);
            if (comment.accountId !== currentUserId)
                throw new Error('Credentials invalid');
            await this.prisma.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    isDeleted: true,
                },
            });
            return {
                ok: true,
                statusCode: 200,
                payload: 'comment removed'
            };
        }
        catch (err) {
            const res = new custom_errors_1.CustomErr();
            return res.nestErr(err);
        }
    }
    async getPostComment(postId, limit, offset) {
        try {
            const sqlCommand = `SELECT * FROM Comment 
            WHERE isDeleted = false AND postsId = ${postId} 
            OFFSET ${offset} LIMIT ${limit}`;
            const comments = await this.prisma.$queryRaw `${sqlCommand}`;
            return {
                ok: true,
                statusCode: 200,
                payload: comments
            };
        }
        catch (err) {
            const res = new custom_errors_1.CustomErr();
            return res.nestErr(err);
        }
    }
};
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map
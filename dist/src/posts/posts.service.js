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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const firebase_service_1 = require("../firebase/firebase.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PostsService = exports.PostsService = class PostsService {
    constructor(prisma, firebase, cloudinary) {
        this.prisma = prisma;
        this.firebase = firebase;
        this.cloudinary = cloudinary;
    }
    async getPosts(offset, limit) {
        try {
            const SqlQuery = `SELECT * FROM Posts OFFSET ${offset} LIMIT ${limit};`;
            const result = await this.prisma.$queryRaw `${SqlQuery}`;
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getPostById(postId) {
        try {
            const result = await this.prisma.posts.findUnique({
                where: {
                    id: postId,
                },
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async uploadPost(userId, dto) {
        try {
            const user = await this.prisma.account.findUnique({
                where: { id: userId },
            });
            if (!user)
                throw new Error('Credentials invalid');
            const post = await this.prisma.posts.create({
                data: {
                    images: '',
                    description: dto.description,
                    account: {
                        connect: {
                            id: userId
                        }
                    }
                },
            });
            const url = this.cloudinary.uploadFiles(dto.images);
            console.log('llegando despues de cloudinary');
            return url;
        }
        catch (error) {
            console.log(error);
        }
    }
    async editPost(userId, dto, postId) {
        try {
            const oldPost = await this.prisma.posts.findUnique({
                where: {
                    id: postId,
                },
            });
            if (userId !== oldPost.accountId)
                throw new Error('Credentials invalid');
            let img;
            if (dto.images) {
                await this.firebase.removeFile(oldPost.id, true);
                img = await this.firebase.uploadFiles(dto.images, oldPost.id, true);
            }
            await this.prisma.posts.update({
                where: {
                    id: dto.postId,
                },
                data: {
                    images: dto.images ? img : oldPost.images,
                    description: dto.description ? dto.description : oldPost.description,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    }
    async removePost(userId, postId) {
        const selectedPost = await this.prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });
        if (userId !== selectedPost.accountId)
            throw new Error('Credentials invalid');
        await this.prisma.posts.update({
            where: {
                id: postId,
            },
            data: {
                isDeleted: true,
            },
        });
    }
};
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        firebase_service_1.FirebaseService,
        cloudinary_service_1.CloudinaryService])
], PostsService);
//# sourceMappingURL=posts.service.js.map
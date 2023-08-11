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
exports.WorkexperienceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkexperienceService = exports.WorkexperienceService = class WorkexperienceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadWorkExperince(userId, dto) {
        try {
            await this.prisma.workExperience.create({
                data: {
                    description: dto.description,
                    workplace: dto.workplace,
                    rol: dto.rol,
                    start: dto.start,
                    end: dto.end,
                    accountId: userId,
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllWorkExperience(userId) {
        try {
            const result = await this.prisma.workExperience.findMany({
                where: {
                    accountId: userId,
                },
            });
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateWorkExperience(userId, experienceId, data) {
        try {
            const exp = await this.prisma.workExperience.findUnique({
                where: {
                    id: experienceId,
                },
            });
            if (exp.accountId !== userId)
                throw new Error('Credentials invalid');
            await this.prisma.workExperience.update({
                where: {
                    id: experienceId,
                },
                data: {
                    start: data.start,
                    end: data.end,
                    rol: data.rol,
                    workplace: data.workplace,
                    description: data.description,
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async removeWorkExperience(userId, experienceId) {
        try {
            const exp = await this.prisma.workExperience.findUnique({
                where: {
                    id: experienceId,
                },
            });
            if (exp.accountId !== userId)
                throw new Error('Credentials invalid');
            await this.prisma.workExperience.delete({
                where: {
                    id: experienceId,
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.WorkexperienceService = WorkexperienceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkexperienceService);
//# sourceMappingURL=workexperience.service.js.map
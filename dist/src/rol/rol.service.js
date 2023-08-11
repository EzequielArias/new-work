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
exports.RolService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let RolService = exports.RolService = class RolService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async getAllRol() {
        try {
            const result = await this.prisma.type_rol.findMany();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addRol(rol) {
        try {
            const res = await this.prisma.type_rol.create({
                data: {
                    rol: rol,
                },
            });
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    async setRolToAccount(AccountId) {
        const rol = await this.prisma.type_rol.findFirst({
            where: {
                rol: this.config.get('ROL-ADMIN'),
            },
        });
        await this.prisma.account.update({
            where: {
                id: AccountId,
            },
            data: {
                Type_rol_id: rol.rol,
            },
        });
    }
    async deleteRol(rolId) {
        try {
            const result = await this.prisma.type_rol.delete({
                where: {
                    id: rolId,
                },
            });
            return 'El rol fue borrado correctamente';
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.RolService = RolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], RolService);
//# sourceMappingURL=rol.service.js.map
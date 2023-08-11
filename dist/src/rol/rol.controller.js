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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const rol_service_1 = require("./rol.service");
const decorators_1 = require("../common/decorators");
const swagger_1 = require("@nestjs/swagger");
let RolController = exports.RolController = class RolController {
    constructor(rol) {
        this.rol = rol;
    }
    addRol(dto) {
        const result = this.rol.addRol(dto.rol);
        return result;
    }
    getAllRoles() {
        return this.rol.getAllRol();
    }
    setRolToAccount(accountId) {
        return this.setRolToAccount(accountId);
    }
    deleteRol(rolId) {
        return this.deleteRol(rolId);
    }
};
__decorate([
    (0, decorators_1.Admin)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.rolDto]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "addRol", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolController.prototype, "getAllRoles", null);
__decorate([
    (0, decorators_1.Admin)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('set-rol'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "setRolToAccount", null);
__decorate([
    (0, decorators_1.Admin)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('del-rol'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], RolController.prototype, "deleteRol", null);
exports.RolController = RolController = __decorate([
    (0, swagger_1.ApiTags)('Rol'),
    (0, common_1.Controller)('rol'),
    __metadata("design:paramtypes", [rol_service_1.RolService])
], RolController);
//# sourceMappingURL=rol.controller.js.map
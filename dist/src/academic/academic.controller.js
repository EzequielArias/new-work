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
exports.AcademicController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const dto_1 = require("./dto");
const academic_service_1 = require("./academic.service");
const swagger_1 = require("@nestjs/swagger");
let AcademicController = exports.AcademicController = class AcademicController {
    constructor(academic) {
        this.academic = academic;
    }
    uploadAcademic(userId, dto) {
        return this.academic.uploadAcademic(userId, dto);
    }
    getAllAcademic(userId) {
        return this.academic.getAllAcademics(userId);
    }
    updateAcademic(userId, dto, academicId) {
        return this.academic.updateAcademic(userId, dto, academicId);
    }
    removeAcademic(userId, academicSlotId) {
        return this.academic.removeAcademic(userId, academicSlotId);
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AcademicDto]),
    __metadata("design:returntype", void 0)
], AcademicController.prototype, "uploadAcademic", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicController.prototype, "getAllAcademic", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AcademicDto, String]),
    __metadata("design:returntype", void 0)
], AcademicController.prototype, "updateAcademic", null);
__decorate([
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AcademicController.prototype, "removeAcademic", null);
exports.AcademicController = AcademicController = __decorate([
    (0, swagger_1.ApiTags)('Academic'),
    (0, common_1.Controller)('academic'),
    __metadata("design:paramtypes", [academic_service_1.AcademicService])
], AcademicController);
//# sourceMappingURL=academic.controller.js.map
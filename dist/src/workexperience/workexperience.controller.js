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
exports.WorkexperienceController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const dto_1 = require("./dto");
const workexperience_service_1 = require("./workexperience.service");
const swagger_1 = require("@nestjs/swagger");
let WorkexperienceController = exports.WorkexperienceController = class WorkexperienceController {
    constructor(workExperience) {
        this.workExperience = workExperience;
    }
    uploadWorkExperience(userId, dto) {
        this.workExperience.uploadWorkExperince(userId, dto);
    }
    getAllWorkExperience(userId) {
        this.workExperience.getAllWorkExperience(userId);
    }
    updateWorkExperience(userId, dto, experienceId) {
        this.workExperience.updateWorkExperience(userId, experienceId, dto);
    }
    removeWorkExperience(userId, workExperienceId) {
        this.workExperience.removeWorkExperience(userId, workExperienceId);
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.WorkExperienceDTO]),
    __metadata("design:returntype", void 0)
], WorkexperienceController.prototype, "uploadWorkExperience", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkexperienceController.prototype, "getAllWorkExperience", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.WorkExperienceDTO, String]),
    __metadata("design:returntype", void 0)
], WorkexperienceController.prototype, "updateWorkExperience", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WorkexperienceController.prototype, "removeWorkExperience", null);
exports.WorkexperienceController = WorkexperienceController = __decorate([
    (0, swagger_1.ApiTags)('WorkExperience'),
    (0, common_1.Controller)('workexperience'),
    __metadata("design:paramtypes", [workexperience_service_1.WorkexperienceService])
], WorkexperienceController);
//# sourceMappingURL=workexperience.controller.js.map
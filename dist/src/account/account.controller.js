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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const account_service_1 = require("./account.service");
const decorators_1 = require("../common/decorators");
const get_current_user_id_decorator_1 = require("../common/decorators/get-current-user-id-decorator");
const guards_1 = require("../common/guards");
const decorators_2 = require("../common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let AccountController = exports.AccountController = class AccountController {
    constructor(account) {
        this.account = account;
    }
    signup(dto, file) {
        try {
            if (file)
                dto.image = file;
            const result = this.account.signup(dto);
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    signin(dto) {
        try {
            return this.account.signin(dto.email, dto.password);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    logout(userId) {
        this.account.logout(userId);
    }
    verifyAccount(userId) {
        try {
            return this.account.verifyAccount(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    getUserRegister(userId) {
        try {
            return this.account.getUserRegister(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AccountDto, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "signup", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AccountSignInDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.AtGuard),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('verify-account'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_2.GetCurrentEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "verifyAccount", null);
__decorate([
    (0, common_1.Post)('getUser'),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getUserRegister", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('Accounts'),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map
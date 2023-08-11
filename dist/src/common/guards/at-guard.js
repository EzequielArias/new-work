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
exports.AtGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const jsonwebtoken_1 = require("jsonwebtoken");
let AtGuard = exports.AtGuard = class AtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        const isAdmin = this.reflector.getAllAndOverride('isAdmin', [
            context.getHandler(),
            context.getClass(),
        ]);
        let jwtToken;
        if (isPublic)
            return true;
        if (isAdmin) {
            jwtToken = request.headers['authorization'].replace('Bearer', '').trim();
            const payload = (0, jsonwebtoken_1.verify)(jwtToken, 'at');
            if (payload.rol === 'admin')
                return true;
            return false;
        }
        jwtToken = request.headers['authorization'].replace('Bearer', '').trim();
        const decoded = (0, jsonwebtoken_1.verify)(jwtToken, 'at');
        const expirationDate = new Date(decoded['exp'] * 1000);
        const currentDate = new Date();
        if (expirationDate > currentDate)
            return true;
        return false;
    }
};
exports.AtGuard = AtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AtGuard);
//# sourceMappingURL=at-guard.js.map
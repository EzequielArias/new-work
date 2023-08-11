"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const account_controller_1 = require("./account.controller");
const jwt_1 = require("@nestjs/jwt");
const strategies_1 = require("./strategies");
let AccountModule = exports.AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        providers: [account_service_1.AccountService, strategies_1.RtStrategy, strategies_1.AtStrategy],
        controllers: [account_controller_1.AccountController],
    })
], AccountModule);
//# sourceMappingURL=account.module.js.map
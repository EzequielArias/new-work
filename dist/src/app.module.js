"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const rol_module_1 = require("./rol/rol.module");
const account_module_1 = require("./account/account.module");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const core_1 = require("@nestjs/core");
const guards_1 = require("./common/guards");
const follower_module_1 = require("./follower/follower.module");
const posts_module_1 = require("./posts/posts.module");
const comment_module_1 = require("./comment/comment.module");
const firebase_module_1 = require("./firebase/firebase.module");
const platform_express_1 = require("@nestjs/platform-express");
const academic_module_1 = require("./academic/academic.module");
const workexperience_module_1 = require("./workexperience/workexperience.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            account_module_1.AccountModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            rol_module_1.RolModule,
            follower_module_1.FollowerModule,
            posts_module_1.PostsModule,
            comment_module_1.CommentModule,
            firebase_module_1.FirebaseModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            academic_module_1.AcademicModule,
            workexperience_module_1.WorkexperienceModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
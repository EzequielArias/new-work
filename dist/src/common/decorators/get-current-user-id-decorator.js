"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserId = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.GetCurrentUserId = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.headers['authorization']
        .replace('Bearer', '')
        .trim();
    let token = (0, jsonwebtoken_1.verify)(user, 'at');
    console.log(token.sub);
    return token.sub;
});
//# sourceMappingURL=get-current-user-id-decorator.js.map
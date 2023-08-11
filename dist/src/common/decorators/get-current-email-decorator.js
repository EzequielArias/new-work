"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentEmail = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.GetCurrentEmail = (0, common_1.createParamDecorator)((_, context) => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']
        .replace('Bearer', '')
        .trim();
    const user = (0, jsonwebtoken_1.verify)(token, 'at');
    return user.sub;
});
//# sourceMappingURL=get-current-email-decorator.js.map
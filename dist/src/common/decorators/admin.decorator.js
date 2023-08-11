"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const common_1 = require("@nestjs/common");
const Admin = () => (0, common_1.SetMetadata)('isAdmin', (req) => {
    var _a;
    const result = (_a = req === null || req === void 0 ? void 0 : req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
    return result;
});
exports.Admin = Admin;
//# sourceMappingURL=admin.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErr = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
class CustomErr {
    constructor() { }
    nestErr(err) {
        if (err instanceof common_1.BadRequestException) {
            const info = new common_1.BadRequestException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.UnauthorizedException) {
            const info = new common_1.UnauthorizedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.NotFoundException) {
            const info = new common_1.NotFoundException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.ForbiddenException) {
            const info = new common_1.ForbiddenException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.NotAcceptableException) {
            const info = new common_1.NotAcceptableException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.RequestTimeoutException) {
            const info = new common_1.RequestTimeoutException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.ConflictException) {
            const info = new common_1.ConflictException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.GoneException) {
            const info = new common_1.GoneException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.HttpVersionNotSupportedException) {
            const info = new common_1.HttpVersionNotSupportedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.PayloadTooLargeException) {
            const info = new common_1.PayloadTooLargeException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.UnsupportedMediaTypeException) {
            const info = new common_1.UnsupportedMediaTypeException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.UnprocessableEntityException) {
            const info = new common_1.UnprocessableEntityException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.InternalServerErrorException) {
            const info = new common_1.InternalServerErrorException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.NotImplementedException) {
            const info = new common_1.NotImplementedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.ImATeapotException) {
            const info = new common_1.ImATeapotException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.MethodNotAllowedException) {
            const info = new common_1.MethodNotAllowedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.BadGatewayException) {
            const info = new common_1.BadGatewayException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.ServiceUnavailableException) {
            const info = new common_1.ServiceUnavailableException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.GatewayTimeoutException) {
            const info = new common_1.GatewayTimeoutException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof common_1.PreconditionFailedException) {
            const info = new common_1.PreconditionFailedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof runtime_1.PrismaClientKnownRequestError) {
            const info = new common_1.PreconditionFailedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof runtime_1.PrismaClientUnknownRequestError) {
            const info = new common_1.PreconditionFailedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof runtime_1.PrismaClientRustPanicError) {
            const info = new common_1.PreconditionFailedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof runtime_1.PrismaClientInitializationError) {
            const info = new common_1.PreconditionFailedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else if (err instanceof runtime_1.PrismaClientValidationError) {
            const info = new common_1.PreconditionFailedException(err.message);
            const res = {
                ok: false,
                statusCode: info.getStatus(),
                payload: info.message,
            };
            return res;
        }
        else {
            const res = {
                ok: false,
                statusCode: 500,
                payload: err.message,
            };
            return res;
        }
    }
}
exports.CustomErr = CustomErr;
//# sourceMappingURL=custom.errors.js.map
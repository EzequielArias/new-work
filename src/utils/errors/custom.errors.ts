import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  HttpVersionNotSupportedException,
  ImATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  PreconditionFailedException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';


import { ResponseData } from 'src/interfaces/custom.response';

export class CustomErr {
  constructor() {}

  nestErr(err): ResponseData<string> {
    /**
     *
     * NEST COMMON ERRORS
     */

    if (err instanceof BadRequestException) {
      // Código si es una instancia de BadRequestException
      const info = new BadRequestException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof UnauthorizedException) {
      // Código si es una instancia de UnauthorizedException
      const info = new UnauthorizedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof NotFoundException) {
      // Código si es una instancia de NotFoundException
      const info = new NotFoundException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof ForbiddenException) {
      // Código si es una instancia de ForbiddenException
      const info = new ForbiddenException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof NotAcceptableException) {
      // Código si es una instancia de NotAcceptableException
      const info = new NotAcceptableException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof RequestTimeoutException) {
      // Código si es una instancia de RequestTimeoutException
      const info = new RequestTimeoutException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof ConflictException) {
      // Código si es una instancia de ConflictException
      const info = new ConflictException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof GoneException) {
      // Código si es una instancia de GoneException
      const info = new GoneException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof HttpVersionNotSupportedException) {
      // Código si es una instancia de HttpVersionNotSupportedException
      const info = new HttpVersionNotSupportedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PayloadTooLargeException) {
      // Código si es una instancia de PayloadTooLargeException
      const info = new PayloadTooLargeException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof UnsupportedMediaTypeException) {
      // Código si es una instancia de UnsupportedMediaTypeException
      const info = new UnsupportedMediaTypeException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof UnprocessableEntityException) {
      // Código si es una instancia de UnprocessableEntityException
      const info = new UnprocessableEntityException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof InternalServerErrorException) {
      // Código si es una instancia de InternalServerErrorException
      const info = new InternalServerErrorException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof NotImplementedException) {
      // Código si es una instancia de NotImplementedException
      const info = new NotImplementedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof ImATeapotException) {
      // Código si es una instancia de ImATeapotException
      const info = new ImATeapotException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof MethodNotAllowedException) {
      // Código si es una instancia de MethodNotAllowedException
      const info = new MethodNotAllowedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof BadGatewayException) {
      // Código si es una instancia de BadGatewayException
      const info = new BadGatewayException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof ServiceUnavailableException) {
      // Código si es una instancia de ServiceUnavailableException
      const info = new ServiceUnavailableException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof GatewayTimeoutException) {
      // Código si es una instancia de GatewayTimeoutException
      const info = new GatewayTimeoutException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PreconditionFailedException) {
      // Código si es una instancia de PreconditionFailedException
      const info = new PreconditionFailedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PrismaClientKnownRequestError) {
      /**
        ERROR FROM PRISMA ###################### 
       */
      const info = new PreconditionFailedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PrismaClientUnknownRequestError) {
      const info = new PreconditionFailedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PrismaClientRustPanicError) {
      const info = new PreconditionFailedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PrismaClientInitializationError) {
      const info = new PreconditionFailedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else if (err instanceof PrismaClientValidationError) {
      const info = new PreconditionFailedException();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: info.getStatus(),
        payload: info.message,
      };
      return res;
    } else {
      // Código para el caso en que no sea ninguna de las excepciones mencionadas

      const info = new Error();

      const res: ResponseData<string> = {
        ok: false,
        statusCode: 500,
        payload: info.message,
      };
    }
  }
}

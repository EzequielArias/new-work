import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { HeadersJwt } from 'src/account/types';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    const isAdmin = this.reflector.getAllAndOverride('isAdmin', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isAdmin) {
      const jwtToken: string = request.headers['authorization']
        .replace('Bearer', '')
        .trim();

      const payload = verify(jwtToken, 'at') as HeadersJwt;

      if (payload.rol === 'admin') return true;
      return false;
    }

    if (isPublic) return true;

    return super.canActivate(context);
  }
}

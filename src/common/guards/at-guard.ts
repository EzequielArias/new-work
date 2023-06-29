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

    let jwtToken: string;

    if (isPublic) return true;

    if (isAdmin) {
      jwtToken = request.headers['authorization'].replace('Bearer', '').trim();
      const payload = verify(jwtToken, 'at') as HeadersJwt;

      if (payload.rol === 'admin') return true;
      return false;
    }

    jwtToken = request.headers['authorization'].replace('Bearer', '').trim();

    const decoded = verify(jwtToken, 'at'); // Reemplaza 'yourSecretKey' con tu clave secreta utilizada para firmar el token
    const expirationDate = new Date(decoded['exp'] * 1000); // La fecha de expiración está en segundos, por lo que se multiplica por 1000 para convertirla en milisegundos
    const currentDate = new Date();

    if (expirationDate > currentDate) return true;
    return false;
  }
}

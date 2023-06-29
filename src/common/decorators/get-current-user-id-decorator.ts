import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../account/types';
import { verify } from 'jsonwebtoken';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request: Request = context.switchToHttp().getRequest();
    const user: string = request.headers['authorization']
      .replace('Bearer', '')
      .trim();
    let token = verify(user, 'at') as JwtPayload;
    console.log(token.sub);
    return token.sub;
  },
);

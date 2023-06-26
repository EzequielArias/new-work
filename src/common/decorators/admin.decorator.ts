import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export const Admin = () =>
  SetMetadata('isAdmin', (req: Request) => {
    const result = req?.get('Authorization')?.replace('Bearer', '').trim();
    return result;
  });

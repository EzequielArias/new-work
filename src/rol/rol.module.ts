import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RolController],
  providers: [RolService, PrismaService],
})
export class RolModule {}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AcademicDto } from './dto';
import { Academic } from './types';
import { CustomErr } from '../utils';
import { ResponseData } from '../interfaces/custom.response';

@Injectable()
export class AcademicService {
  constructor(private prisma: PrismaService) {}

  async uploadAcademic(
    userId: string,
    dto: AcademicDto,
  ): Promise<void | ResponseData<any>> {
    const date = new Date();

    try {
      await this.prisma.academic.create({
        data: {
          accountId: userId,
          institution: dto.institution,
          start: date,
          end: date,
          description: dto.description,
        },
      });
    } catch (err: any) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }

  async getAllAcademics(userId: string): Promise<ResponseData<any> | Academic[]> {
    try {
      const result = await this.prisma.academic.findMany({
        where: {
          id: userId,
        },
      });

      if (!result) throw new Error('No se encontraron coincidencias');

      return result;
    } catch (err: any) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }

  async updateAcademic(userId: string, dto: AcademicDto) {
    try {
      const validato = await this.prisma.academic.findUnique({
        where: {
          id: dto.id,
        },
      });

      if (validato.id !== userId) throw new ForbiddenException('Credentials Invalid');

      await this.prisma.academic.update({
        where: {
          id: dto.id,
        },
        data: {
          institution: dto.institution,
          description: dto.description,
          start: dto.start,
          end: dto.end,
        },
      });
    } catch (err: any) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }

  async removeAcademic(userId: string, academicSlotId: string) {
    try {
      const validato = await this.prisma.academic.findUnique({
        where: {
          id: academicSlotId,
        },
      });

      if (validato.id !== userId) throw new ForbiddenException('Credentials Invalid');

      await this.prisma.academic.delete({
        where: {
          id: academicSlotId,
        },
      });
    } catch (err: any) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }
}

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
  ): Promise<ResponseData<any>> {
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

      return {
        ok: true,
        statusCode: 200,
        payload: 'academic update',
      };
    } catch (err: any) {
      const res = new CustomErr();
      return res.nestErr(err);
    }
  }

  async getAllAcademics(
    userId: string,
  ): Promise<ResponseData<any | Academic[]>> {
    try {
      const result = await this.prisma.academic.findMany({
        where: {
          id: userId,
        },
      });

      if (!result) throw new Error('No se encontraron coincidencias');

      return {
        ok: true,
        statusCode: 200,
        payload: result,
      };
    } catch (err: any) {
      const res = new CustomErr();
      return res.nestErr(err);
    }
  }

  async updateAcademic(userId: string, dto: AcademicDto, academicId: string) {
    try {
      const validato = await this.prisma.academic.findUnique({
        where: {
          id: academicId,
        },
      });

      if (validato.id !== userId)
        throw new ForbiddenException('Credentials Invalid');

      await this.prisma.academic.update({
        where: {
          id: academicId,
        },
        data: {
          institution: dto.institution,
          description: dto.description,
          start: dto.start,
          end: dto.end,
        },
      });
    } catch (err: any) {
      const res = new CustomErr();
      return res.nestErr(err);
    }
  }

  async removeAcademic(
    userId: string,
    academicSlotId: string,
  ): Promise<ResponseData<string>> {
    try {
      const validato = await this.prisma.academic.findUnique({
        where: {
          id: academicSlotId,
        },
      });

      if (validato.id !== userId)
        throw new ForbiddenException('Credentials Invalid');

      await this.prisma.academic.delete({
        where: {
          id: academicSlotId,
        },
      });

      return {
        ok: true,
        statusCode: 200,
        payload: 'academic slot removed succesfully',
      };
    } catch (err: any) {
      const res = new CustomErr();
      return res.nestErr(err);
    }
  }
}

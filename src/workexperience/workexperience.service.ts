import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkExperienceDTO } from './dto';

@Injectable()
export class WorkexperienceService {
  constructor(private prisma: PrismaService) {}

  async uploadWorkExperince(
    userId: string,
    dto: WorkExperienceDTO,
  ): Promise<void | Error> {
    try {
      await this.prisma.workExperience.create({
        data: {
          description: dto.description,
          workplace: dto.workplace,
          rol: dto.rol,
          start: dto.start,
          end: dto.end,
          accountId: userId,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllWorkExperience(userId: string) {
    try {
      const result = await this.prisma.workExperience.findMany({
        where: {
          accountId: userId,
        },
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateWorkExperience(
    userId: string,
    experienceId: string,
    data: WorkExperienceDTO,
  ) {
    try {
      const exp = await this.prisma.workExperience.findUnique({
        where: {
          id: experienceId,
        },
      });

      if (exp.accountId !== userId) throw new Error('Credentials invalid');

      await this.prisma.workExperience.update({
        where: {
          id: experienceId,
        },
        data: {
          start: data.start,
          end: data.end,
          rol: data.rol,
          workplace: data.workplace,
          description: data.description,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeWorkExperience(userId: string, experienceId: string) {
    try {
      const exp = await this.prisma.workExperience.findUnique({
        where: {
          id: experienceId,
        },
      });

      if (exp.accountId !== userId) throw new Error('Credentials invalid');

      await this.prisma.workExperience.delete({
        where: {
          id: experienceId,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

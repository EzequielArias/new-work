import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getAllRol() {
    try {
      const result = await this.prisma.type_rol.findMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async addRol(rol: string) {
    try {
      const res = await this.prisma.type_rol.create({
        data: {
          rol: rol,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async setRolToAccount(AccountId: string) {
    const rol = await this.prisma.type_rol.findFirst({
      where: {
        rol: this.config.get('ROL-ADMIN'),
      },
    });

    await this.prisma.account.update({
      where: {
        id: AccountId,
      },
      data: {
        Type_rol_id: rol.rol,
      },
    });
  }

  async deleteRol(rolId: string) {
    try {
      const result = await this.prisma.type_rol.delete({
        where: {
          id: rolId,
        },
      });

      return 'El rol fue borrado correctamente';
    } catch (error) {
      console.log(error);
    }
  }
}

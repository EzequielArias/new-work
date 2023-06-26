import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import {
  JwtPayload,
  Token,
  currentUser,
  VerifyToken,
  VerifyTokenPayload,
} from './types';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private JwtService: JwtService,
    private config: ConfigService,
  ) {}

  async updateRt(userId: string, rt: string) {
    const hash = await argon.hash(rt);
    await this.prisma.account.update({
      where: {
        id: userId,
      },
      data: {
        rt_hash: hash,
      },
    });
  }

  async getToken(userId: string, email: string): Promise<Token> {
    const associated = await this.prisma.account.findUnique({
      where: {
        email: email,
      },
      include: {
        type_rol: true,
      },
    });

    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      rol: associated.type_rol.rol,
    };

    const [at, rt] = await Promise.all([
      this.JwtService.signAsync(jwtPayload, {
        secret: this.config.get('AT-SECRET'),
        expiresIn: '15m',
      }),

      this.JwtService.signAsync(jwtPayload, {
        secret: this.config.get('RT-SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  // Token de verificacion de cuenta o recuperacion de cuenta.
  async verifyToken(userId: string, email: string): Promise<VerifyToken> {
    const jwtPayload: VerifyTokenPayload = {
      sub: userId,
      email,
    };

    try {
      const [vt] = await Promise.all([
        this.JwtService.signAsync(jwtPayload, {
          secret: this.config.get('VT-SECRET'),
          expiresIn: '10m',
        }),
      ]);

      return {
        verify_token: vt,
      };

    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(email: string, userId: string): Promise<void> {
    try {
      let token: VerifyToken = await this.verifyToken(userId, email);

      let transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '27958fb0c72b87',
          pass: '0bbacdcdba3498',
        },
      });

      await transport.sendMail({
        from: 'newWork-team@gmail.com',
        to: email,
        subject: 'Email de verificacion',
        html: `<div>Haz click en el enlace para verificar tu mail
        <a>http://localhost:3000/verify-account?token=${token.verify_token}</a>
        </div>`,
      });
    } catch (error) {}
  }

  async verifyAccount(userId: string) {
    try {
      await this.prisma.account.update({
        where: {
          id: userId,
        },
        data: {
          isVerified: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signup(
    data: AccountDto,
  ): Promise<{ currentUser: currentUser; tokens: Token }> {
    try {
      const hash = await argon.hash(data.password);

      const newUser = await this.prisma.account.create({
        data: {
          name: data.name,
          image: data.image,
          email: data.email,
          followers: {}, // Proximamente
          Type_rol_id: data.Type_rol_id,
          password: hash,
        },
      });

      const tokens = await this.getToken(newUser.id, newUser.email);

      await this.updateRt(newUser.id, tokens.refresh_token);

      // Enviamos un mail para que el usuario verifique que su direccion email es real
      await this.sendVerificationEmail(newUser.email, newUser.id);

      const currentUser = {
        name: newUser.name,
        email: newUser.email,
      };

      return {
        currentUser,
        tokens,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async signin(email: string, pass: string) {
    try {
      const user = await this.prisma.account.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) throw new Error('Email o contraseña son invalidos');

      const verify = await argon.verify(user.password, pass);

      if (!verify) throw new Error('Email o contraseña son invalidos');

      const tokens = await this.getToken(user.id, user.email);
      await this.updateRt(user.id, tokens.refresh_token);

      const currentUser = {
        name: user.name,
        email: user.email,
      };

      return {
        currentUser,
        tokens,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async logout(userId: string) {
    await this.prisma.account.update({
      where: {
        id: userId,
      },
      data: {
        rt_hash: null,
      },
    });
  }

}

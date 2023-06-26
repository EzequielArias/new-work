import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccountDto, AccountSignInDto } from './dto';
import { AccountService } from './account.service';
import { Public } from 'src/common/decorators/public.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id-decorator';
import { AtGuard } from 'src/common/guards';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { VerifyTokenPayload } from './types';

@Controller('account')
export class AccountController {
  constructor(private account: AccountService, private config: ConfigService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AccountDto) {
    try {
      const result = this.account.signup(dto);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AccountSignInDto) {
    return this.account.signin(dto.email, dto.password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  logout(@GetCurrentUserId() userId: string) {
    this.account.logout(userId);
  }

  @Post('verify-account')
  @HttpCode(HttpStatus.OK)
  verifyAccount(req: Request) {
    const token: string = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    const data = verify(
      token,
      this.config.get('VT-SECRET'),
    ) as VerifyTokenPayload;
    this.account.verifyAccount(data.sub);
  }
}

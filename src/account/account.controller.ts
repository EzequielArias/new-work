import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountDto, AccountSignInDto } from './dto';
import { AccountService } from './account.service';
import { Public } from '../common/decorators';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id-decorator';
import { AtGuard } from '../common/guards';
import { GetCurrentEmail } from '../common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Token, currentUser } from './types';

@ApiTags('Accounts')
@Controller('account')
export class AccountController {
  constructor(private account: AccountService) {}

  @Public()
  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AccountDto, @UploadedFile() file: Express.Multer.File) {
    try {
      if (file) dto.image = file;

      const result = this.account.signup(dto);

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Body() dto: AccountSignInDto,
  ){
    try {
      return this.account.signin(dto.email, dto.password);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  logout(@GetCurrentUserId() userId: string) {
    this.account.logout(userId);
  }

  @Public()
  @Post('verify-account')
  @HttpCode(HttpStatus.OK)
  verifyAccount(@GetCurrentEmail() userId: string) {
    try {
      return this.account.verifyAccount(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('getUser')
  getUserRegister(@GetCurrentUserId() userId : string){
    try {
      return this.account.getUserRegister(userId);
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

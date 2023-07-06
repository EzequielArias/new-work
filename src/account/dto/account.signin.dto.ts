import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccountSignInDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

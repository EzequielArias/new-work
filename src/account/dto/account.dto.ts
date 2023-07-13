import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  image?: Express.Multer.File;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  Type_rol_id?: string;
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  //@Min(8)
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Type_rol_id: string;
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  //@Min(8)
  password: string;
}

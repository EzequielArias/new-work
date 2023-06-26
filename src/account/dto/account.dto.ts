import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  followers: JSON;

  @IsString()
  @IsNotEmpty()
  Type_rol_id: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  //@Min(8)
  password: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class rolDto {
  @IsString()
  @IsNotEmpty()
  rol: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class rolDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rol: string;
}

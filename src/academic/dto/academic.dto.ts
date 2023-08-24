import { IsBoolean, IsDate, IsNotEmpty, IsString, Max } from 'class-validator';

export class AcademicDto {
  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsDate()
  @IsNotEmpty()
  start: Date;

  @IsDate()
  @IsBoolean()
  @IsNotEmpty()
  end: Date;

  @IsString()
  description?: string;
}

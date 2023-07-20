import { IsDate, IsString } from 'class-validator';

export class WorkExperienceDTO {
  @IsString()
  id?: string;

  @IsString()
  description: string;

  @IsString()
  rol: string;
  @IsString()
  workplace: string;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;
}

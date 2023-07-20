import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomErr } from '../utils';
import { GetCurrentUserId, Public } from '../common/decorators';
import { WorkExperienceDTO } from './dto';
import { WorkexperienceService } from './workexperience.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WorkExperience')
@Controller('workexperience')
export class WorkexperienceController {
  constructor(private workExperience: WorkexperienceService) {}

  @Post('add')
  uploadWorkExperience(
    @GetCurrentUserId() userId: string,
    dto: WorkExperienceDTO,
  ) {
    this.workExperience.uploadWorkExperince(userId, dto);
  }

  @Get('getAll')
  getAllWorkExperience(@GetCurrentUserId() userId: string) {
    this.workExperience.getAllWorkExperience(userId);
  }

  @Put('update/:id')
  updateWorkExperience(
    @GetCurrentUserId() userId: string,
    dto: WorkExperienceDTO,
    @Param('id') experienceId: string,
  ) {
    this.workExperience.updateWorkExperience(userId, experienceId, dto);
  }

  @Delete('remove')
  removeWorkExperience(
    @GetCurrentUserId() userId: string,
    @Body() workExperienceId: string,
  ) {
    this.workExperience.removeWorkExperience(userId, workExperienceId);
  }
}

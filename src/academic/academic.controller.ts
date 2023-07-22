import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators';
import { AcademicDto } from './dto';
import { AcademicService } from './academic.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Academic')
@Controller('academic')
export class AcademicController {
  constructor(private academic: AcademicService) {}

  @Post('add')
  uploadAcademic(@GetCurrentUserId() userId: string, @Body() dto: AcademicDto) {
    return this.academic.uploadAcademic(userId, dto);
  }

  @Get('getAll')
  getAllAcademic(@GetCurrentUserId() userId: string) {
    return this.academic.getAllAcademics(userId);
  }

  @Put('update/:id')
  updateAcademic(
   @GetCurrentUserId() userId: string
  ,@Body() dto: AcademicDto
  ,@Param('id') academicId : string) {
    return this.academic.updateAcademic(userId, dto, academicId);
  }

  @Delete('remove/:id')
  removeAcademic(
    @GetCurrentUserId() userId: string,
    @Param('id') academicSlotId: string,
  ) {
    return this.academic.removeAcademic(userId, academicSlotId);
  }
}

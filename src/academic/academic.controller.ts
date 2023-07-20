import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators';
import { AcademicDto } from './dto';
import { AcademicService } from './academic.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Academic')
@Controller('academic')
export class AcademicController {
  constructor(private academic : AcademicService) {}

  @Post('add')
  uploadAcademic(@GetCurrentUserId() userId : string, @Body() dto : AcademicDto) {
    this.academic.uploadAcademic(userId,dto);
  }

  @Get('getAll')
  getAllAcademic(@GetCurrentUserId() userId : string){
    return this.academic.getAllAcademics(userId);
  }

  @Put('update')
  updateAcademic(@GetCurrentUserId() userId : string, @Body() dto : AcademicDto){
    this.academic.updateAcademic(userId, dto);
  }

  @Delete('remove')
  removeAcademic(@GetCurrentUserId() userId : string, @Body() academicSlotId : string){
    this.academic.removeAcademic(userId, academicSlotId);
  }
}

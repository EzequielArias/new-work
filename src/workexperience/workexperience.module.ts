import { Module } from '@nestjs/common';
import { WorkexperienceService } from './workexperience.service';
import { WorkexperienceController } from './workexperience.controller';

@Module({
  providers: [WorkexperienceService],
  controllers: [WorkexperienceController]
})
export class WorkexperienceModule {}

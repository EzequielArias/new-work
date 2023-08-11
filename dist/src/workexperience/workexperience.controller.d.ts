import { WorkExperienceDTO } from './dto';
import { WorkexperienceService } from './workexperience.service';
export declare class WorkexperienceController {
    private workExperience;
    constructor(workExperience: WorkexperienceService);
    uploadWorkExperience(userId: string, dto: WorkExperienceDTO): void;
    getAllWorkExperience(userId: string): void;
    updateWorkExperience(userId: string, dto: WorkExperienceDTO, experienceId: string): void;
    removeWorkExperience(userId: string, workExperienceId: string): void;
}

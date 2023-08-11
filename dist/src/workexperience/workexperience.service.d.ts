import { PrismaService } from '../prisma/prisma.service';
import { WorkExperienceDTO } from './dto';
export declare class WorkexperienceService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadWorkExperince(userId: string, dto: WorkExperienceDTO): Promise<void | Error>;
    getAllWorkExperience(userId: string): Promise<import(".prisma/client").WorkExperience[]>;
    updateWorkExperience(userId: string, experienceId: string, data: WorkExperienceDTO): Promise<void>;
    removeWorkExperience(userId: string, experienceId: string): Promise<void>;
}

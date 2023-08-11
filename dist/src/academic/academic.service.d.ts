import { PrismaService } from '../prisma/prisma.service';
import { AcademicDto } from './dto';
import { Academic } from './types';
import { ResponseData } from '../interfaces/custom.response';
export declare class AcademicService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadAcademic(userId: string, dto: AcademicDto): Promise<ResponseData<any>>;
    getAllAcademics(userId: string): Promise<ResponseData<any | Academic[]>>;
    updateAcademic(userId: string, dto: AcademicDto, academicId: string): Promise<ResponseData<string>>;
    removeAcademic(userId: string, academicSlotId: string): Promise<ResponseData<string>>;
}

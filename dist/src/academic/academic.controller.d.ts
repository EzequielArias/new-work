import { AcademicDto } from './dto';
import { AcademicService } from './academic.service';
export declare class AcademicController {
    private academic;
    constructor(academic: AcademicService);
    uploadAcademic(userId: string, dto: AcademicDto): Promise<import("../interfaces/custom.response").ResponseData<any>>;
    getAllAcademic(userId: string): Promise<import("../interfaces/custom.response").ResponseData<any>>;
    updateAcademic(userId: string, dto: AcademicDto, academicId: string): Promise<import("../interfaces/custom.response").ResponseData<string>>;
    removeAcademic(userId: string, academicSlotId: string): Promise<import("../interfaces/custom.response").ResponseData<string>>;
}

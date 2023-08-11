import { ResponseData } from 'src/interfaces/custom.response';
export declare class CustomErr {
    constructor();
    nestErr(err: any): ResponseData<string>;
}

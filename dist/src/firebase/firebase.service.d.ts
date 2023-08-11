import { FirebaseApp } from 'firebase/app';
import { FirebaseStorage } from 'firebase/storage';
export declare class FirebaseService {
    app: FirebaseApp;
    storage: FirebaseStorage;
    constructor();
    uploadFiles(file: any, id: string, postOrUser: boolean): Promise<string>;
    removeFile(id: string, postOrUser: boolean): Promise<void>;
}

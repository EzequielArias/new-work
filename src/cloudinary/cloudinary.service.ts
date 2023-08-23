import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    private config : any;

    constructor() {
        this.config = cloudinary;
            cloudinary.config({ 
            cloud_name: 'dewgjafvz', 
            api_key: '351938993798979', 
            api_secret: '7S5f2NAtvEjaFlNo_XyZkSVbvhM' 
        });
    }

    async uploadFiles(file: any) {
        try {
          const result = await this.config.uploader.upload(file.buffer, { public_id: "olympic_flag" });
          console.log(result);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      
}
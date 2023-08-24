import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path/posix';

@Injectable()
export class CloudinaryService {
  private config: any;

  constructor(private dot : ConfigService) {
    this.config = cloudinary;
    cloudinary.config({
      cloud_name: this.dot.get<string>('cloudinary_cloud_name'),
      api_key: this.dot.get<string>('cloudinary_key'),
      api_secret: this.dot.get<string>('cloudinary_secret'),
    });
  }
  // Files is a string[] with current id of images
  async uploadFiles(files: string[]) {
    let directory = path.join(__dirname, '../../uploads'),
      dirFiles = fs.readdirSync(directory),
      cloudinaryUrls = []

    try {
      for (const file of files) {
        for (let i = 0; i < dirFiles.length; i++) {
          if (dirFiles[i] == file) {
             await this.config.uploader.upload(`${directory}/${file}`, {
              public_id: `${file.split('.')[0]}`,
            }, (err : any, result : any) => {
              if(err) throw err
              else {
                cloudinaryUrls.push(result.url)
              }
            });
          }
        }
      }
      return cloudinaryUrls;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

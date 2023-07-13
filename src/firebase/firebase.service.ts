import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firebase_config } from '../../firebase.config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public storage: FirebaseStorage;

  constructor() {
    this.app = initializeApp({
      apiKey: firebase_config.apiKey,
      authDomain: firebase_config.authDomain,
      projectId: firebase_config.projectId,
      storageBucket: firebase_config.storageBucket,
      messagingSenderId: firebase_config.messagingSenderId,
      appId: firebase_config.appId,
    });

    this.storage = getStorage(this.app);
  }

  // If postOrUser is false, location will be profile otherwise posts
  async uploadFiles(file: any, id: string, postOrUser: boolean) {
    try {
      const storageRef = ref(
        this.storage,
        `${postOrUser ? 'posts' : 'profile'}/${id}`,
      );

      const bytes = new Uint8Array([...file.buffer]);

      await uploadBytes(storageRef, bytes);

      return await getDownloadURL(storageRef);
    } catch (error) {
      console.log(error);
    }
  }

  // Tengo que evaluar si lo que necesito borrar es un post o una imagen de perfil
  async removeFile(id: string, postOrUser: boolean) {
    const storageRef = ref(
      this.storage,
      `${postOrUser ? 'posts' : 'profile'}/${id}`,
    );

    await deleteObject(storageRef);
  }
}

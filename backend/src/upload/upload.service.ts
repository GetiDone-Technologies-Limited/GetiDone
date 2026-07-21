import { Injectable, Inject } from '@nestjs/common';
import { STORAGE_PROVIDER, StorageProvider } from './storage/storage.provider';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(
    @Inject(STORAGE_PROVIDER) private readonly storageProvider: StorageProvider,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const ext = path.extname(file.originalname);
    const filename = `${randomUUID()}${ext}`;
    return this.storageProvider.saveFile(file, filename);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { StorageProvider } from './storage.provider';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly logger = new Logger(LocalStorageProvider.name);
  private readonly basePath = path.join(process.cwd(), 'uploads');

  constructor() {
    this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists() {
    try {
      await fs.mkdir(this.basePath, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        this.logger.error('Could not create upload directory', error);
      }
    }
  }

  async saveFile(file: Express.Multer.File, filename: string): Promise<string> {
    const filePath = path.join(this.basePath, filename);
    await fs.writeFile(filePath, file.buffer);
    return `/uploads/${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(this.basePath, filename);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      this.logger.error(`Could not delete file: ${filePath}`, error);
    }
  }
}

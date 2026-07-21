export const STORAGE_PROVIDER = 'STORAGE_PROVIDER';

export interface StorageProvider {
  saveFile(file: Express.Multer.File, filename: string): Promise<string>;
  deleteFile(filename: string): Promise<void>;
}

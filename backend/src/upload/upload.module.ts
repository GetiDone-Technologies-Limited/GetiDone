import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { STORAGE_PROVIDER } from './storage/storage.provider';
import { LocalStorageProvider } from './storage/local-storage.provider';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: STORAGE_PROVIDER,
      useClass: LocalStorageProvider,
    },
  ],
  exports: [UploadService],
})
export class UploadModule {}

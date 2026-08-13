import { Module } from '@nestjs/common';
import { SecurityAlertService } from './security-alert.service';
import { IntrusionDetectionInterceptor } from './intrusion-detection.interceptor';
import { SecurityController } from './security.controller';

@Module({
  providers: [SecurityAlertService, IntrusionDetectionInterceptor],
  controllers: [SecurityController],
  exports: [SecurityAlertService, IntrusionDetectionInterceptor],
})
export class SecurityModule {}

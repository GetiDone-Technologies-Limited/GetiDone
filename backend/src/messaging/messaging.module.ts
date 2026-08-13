import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { MessagingGateway } from './messaging.gateway';

@Module({
  providers: [MessagingService, MessagingGateway],
  controllers: [MessagingController],
  exports: [MessagingService, MessagingGateway],
})
export class MessagingModule {}

import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { PaymentController } from './payment.controller';
import { PaymentWebhookController } from './payment.webhook.controller';
import { PaystackService } from './paystack.service';

@Module({
  providers: [PaymentService, PaymentRepository, PaystackService],
  controllers: [PaymentController, PaymentWebhookController],
  exports: [PaymentService, PaymentRepository, PaystackService],
})
export class PaymentModule {}

import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentWebhookController } from './payment.webhook.controller';
import { PaystackService } from './paystack.service';

@Module({
  providers: [PaymentService, PaystackService],
  controllers: [PaymentController, PaymentWebhookController],
  exports: [PaymentService, PaystackService],
})
export class PaymentModule {}

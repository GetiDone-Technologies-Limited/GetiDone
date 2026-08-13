import { Controller, Post, Body, Headers, Logger, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment/webhooks')
export class PaymentWebhookController {
  private readonly logger = new Logger(PaymentWebhookController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('paystack')
  async handlePaystackWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Body() body: any
  ) {
    this.logger.log(`💳 Received Paystack Webhook Event: ${body.event}`);

    if (body.event === 'charge.success') {
      const reference = body.data.reference;
      const amount = body.data.amount / 100;
      this.logger.log(`✅ Paystack Payment Confirmed for reference ${reference}: $${amount}`);

      return { status: 'success', reference, message: 'Escrow holding account funded via Paystack.' };
    }

    return { status: 'ignored' };
  }

  @Post('stripe')
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() body: any
  ) {
    this.logger.log(`💳 Received Stripe Webhook Event: ${body.type}`);

    if (body.type === 'payment_intent.succeeded') {
      const intentId = body.data.object.id;
      const amount = body.data.object.amount / 100;
      this.logger.log(`✅ Stripe Payment Succeeded for intent ${intentId}: $${amount}`);

      return { status: 'success', intentId, message: 'Escrow holding account funded via Stripe.' };
    }

    return { status: 'ignored' };
  }
}

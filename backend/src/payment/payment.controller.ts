import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentService, ProcessPaymentDto } from './payment.service';
import { CreateInvoiceData } from './payment.repository';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Thin Controller Endpoint: Create Invoice
   */
  @Post('invoice')
  createInvoice(@Body() body: CreateInvoiceData) {
    return this.paymentService.createInvoice(body);
  }

  /**
   * Thin Controller Endpoint: Get Invoice by ID
   */
  @Get('invoice/:id')
  getInvoice(@Param('id') invoiceId: string) {
    return this.paymentService.getInvoice(invoiceId);
  }

  /**
   * Thin Controller Endpoint: Process Financial Payment
   */
  @Post('process')
  processPayment(@Body() body: ProcessPaymentDto) {
    return this.paymentService.processPayment(body);
  }

  /* ---------------- Legacy Escrow Endpoints (Thin) ---------------- */

  @Get('projects/:id/escrow')
  getEscrow(@Param('id') projectId: string) {
    return this.paymentService.getEscrow(projectId, 'mock-client');
  }

  @Post('projects/:id/fund')
  fundEscrow(
    @Param('id') projectId: string,
    @Body('gateway') gateway: string,
  ) {
    return this.paymentService.fundEscrow(projectId, 'mock-client', gateway || 'stripe');
  }

  @Post('projects/:id/verify')
  verifyPayment(
    @Param('id') projectId: string,
    @Body('reference') reference: string,
  ) {
    return this.paymentService.verifyPayment(projectId, reference, 'mock-client');
  }

  @Post('projects/:id/release')
  releaseEscrow(@Param('id') projectId: string) {
    return this.paymentService.releaseEscrow(projectId, 'mock-client');
  }

  @Get('projects/:id/history')
  getPaymentHistory(@Param('id') projectId: string) {
    return this.paymentService.getPaymentHistory(projectId);
  }
}

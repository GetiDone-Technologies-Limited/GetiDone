import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly prisma: PrismaService,
  ) {}

  // Helper to get clientId for MVP testing without Auth
  private async getProjectClientId(projectId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    return project.clientId;
  }

  @Get('projects/:id/escrow')
  async getEscrow(@Param('id') projectId: string) {
    const clientId = await this.getProjectClientId(projectId);
    return this.paymentService.getEscrow(projectId, clientId);
  }

  @Post('projects/:id/fund')
  async fundEscrow(
    @Param('id') projectId: string,
    @Body('gateway') gateway: string,
  ) {
    const clientId = await this.getProjectClientId(projectId);
    return this.paymentService.fundEscrow(projectId, clientId, gateway || 'stripe');
  }

  @Post('projects/:id/verify')
  async verifyPayment(
    @Param('id') projectId: string,
    @Body('reference') reference: string,
  ) {
    const clientId = await this.getProjectClientId(projectId);
    return this.paymentService.verifyPayment(projectId, reference, clientId);
  }

  @Post('projects/:id/release')
  async releaseEscrow(@Param('id') projectId: string) {
    const clientId = await this.getProjectClientId(projectId);
    return this.paymentService.releaseEscrow(projectId, clientId);
  }

  @Get('projects/:id/history')
  getPaymentHistory(@Param('id') projectId: string) {
    return this.paymentService.getPaymentHistory(projectId);
  }
}

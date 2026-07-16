import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('projects/:id/fund')
  fundEscrow(
    @Param('id') projectId: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.paymentService.fundEscrow(projectId, user.id);
  }

  @Post('projects/:id/release')
  releaseEscrow(
    @Param('id') projectId: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.paymentService.releaseEscrow(projectId, user.id);
  }

  @Get('projects/:id/history')
  getPaymentHistory(@Param('id') projectId: string) {
    return this.paymentService.getPaymentHistory(projectId);
  }
}

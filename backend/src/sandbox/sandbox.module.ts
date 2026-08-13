import { Module } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { SandboxController } from './sandbox.controller';
import { PaymentModule } from '../payment/payment.module';
import { SecurityModule } from '../security/security.module';
import { MatchingModule } from '../matching/matching.module';

@Module({
  imports: [PaymentModule, SecurityModule, MatchingModule],
  providers: [SandboxService],
  controllers: [SandboxController],
  exports: [SandboxService],
})
export class SandboxModule {}

import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  SandboxService,
  SimulatePaymentDto,
  SimulateTestGateDto,
  SimulateAttackDto,
} from './sandbox.service';

@Controller('sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get('state')
  getSandboxState() {
    return this.sandboxService.getSandboxState();
  }

  @Post('payment')
  simulatePayment(@Body() body: SimulatePaymentDto) {
    return this.sandboxService.simulatePayment(body);
  }

  @Post('test-gate')
  simulateTestGateRun(@Body() body: SimulateTestGateDto) {
    return this.sandboxService.simulateTestGateRun(body);
  }

  @Post('attack')
  simulateAttack(@Body() body: SimulateAttackDto) {
    return this.sandboxService.simulateAttack(body);
  }

  @Post('reset')
  resetSandbox() {
    return this.sandboxService.resetSandbox();
  }
}

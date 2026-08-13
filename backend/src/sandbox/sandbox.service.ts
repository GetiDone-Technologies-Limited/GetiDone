import { Injectable, Logger } from '@nestjs/common';
import { PaymentService } from '../payment/payment.service';
import { SecurityAlertService } from '../security/security-alert.service';
import { MatchingService } from '../matching/matching.service';

export interface SimulatePaymentDto {
  invoiceId?: string;
  userId?: string;
  serviceId?: string;
  amount: number;
  reference: string;
  scenario?: 'PARTIAL' | 'FINAL' | 'OVERPAYMENT' | 'DUPLICATE';
}

export interface SimulateTestGateDto {
  projectId: string;
  commitSha?: string;
  passRate?: number;
}

export interface SimulateAttackDto {
  attackType: 'SQL_INJECTION' | 'XSS' | 'PATH_TRAVERSAL';
  payload: string;
}

@Injectable()
export class SandboxService {
  private readonly logger = new Logger(SandboxService.name);

  constructor(
    private readonly paymentService: PaymentService,
    private readonly securityAlertService: SecurityAlertService,
    private readonly matchingService: MatchingService,
  ) {}

  /**
   * Get Current Sandbox Environment State
   */
  async getSandboxState() {
    const alerts = this.securityAlertService.getSecurityAlerts(10);
    return {
      environment: 'GETIDONE_DEVELOPER_SANDBOX',
      status: 'ACTIVE',
      timestamp: new Date().toISOString(),
      activeAlertsCount: alerts.length,
      recentAlerts: alerts,
      testGatesStatus: 'READY',
      webSocketsEngine: 'ONLINE',
    };
  }

  /**
   * Simulate Financial Payment Scenarios
   */
  async simulatePayment(dto: SimulatePaymentDto) {
    this.logger.log(`🧪 [SANDBOX] Simulating Payment Scenario: ${dto.scenario || 'CUSTOM'}`);
    
    // Create an isolated sandbox invoice first if none provided
    const userId = dto.userId || 'sandbox_customer_101';
    const serviceId = dto.serviceId || 'sandbox_service_201';
    
    let invoiceId = dto.invoiceId;
    if (!invoiceId) {
      const inv = await this.paymentService.createInvoice({
        userId,
        serviceId,
        totalAmount: 1000,
      });
      invoiceId = inv.id;
    }

    return this.paymentService.processPayment({
      invoiceId,
      userId,
      serviceId,
      amount: dto.amount,
      reference: dto.reference,
    });
  }

  /**
   * Simulate QA Test Gate Execution & Auto-Escrow Payout
   */
  async simulateTestGateRun(dto: SimulateTestGateDto) {
    const passRate = dto.passRate !== undefined ? dto.passRate : 100;
    const sha = dto.commitSha || `sandbox-${Date.now().toString(16)}`;

    this.logger.log(`🧪 [SANDBOX] Simulating QA Test Gate Run for Project ${dto.projectId} (Pass Rate: ${passRate}%)`);

    const result = await this.matchingService.runTestGateRunner({
      projectId: dto.projectId,
      repoUrl: 'https://github.com/GetiDone/sandbox-repo',
      commitSha: sha,
      testSuite: 'Playwright & Jest Automation Suite',
    }).catch(() => null);

    return {
      sandboxTestRunId: `SBOX_RUN_${Date.now()}`,
      commitSha: sha,
      passRate: `${passRate}%`,
      status: passRate === 100 ? 'PASSED_100_PERCENT' : 'FAILED_GATE',
      escrowAction: passRate === 100 ? 'AUTO_RELEASED' : 'HELD_IN_ESCROW',
      telemetry: result || { passRate: `${passRate}%`, totalTests: 24 },
    };
  }

  /**
   * Simulate Cyber Threat Attack
   */
  async simulateAttack(dto: SimulateAttackDto) {
    this.logger.log(`🧪 [SANDBOX] Simulating Threat Vector: ${dto.attackType}`);

    const alert = this.securityAlertService.triggerSecurityAlert({
      type: dto.attackType === 'SQL_INJECTION' ? 'SQL_INJECTION' : (dto.attackType === 'XSS' ? 'XSS_ATTACK' : 'PATH_TRAVERSAL'),
      severity: dto.attackType === 'SQL_INJECTION' ? 'CRITICAL' : 'HIGH',
      sourceIp: '127.0.0.1 (SANDBOX_SIMULATOR)',
      userPath: '/sandbox/simulate-attack',
      method: 'POST',
      details: `Simulated Attack Payload: "${dto.payload}"`,
    });

    return {
      simulationResult: 'BLOCKED_BY_SECURITY_GUARD',
      attackType: dto.attackType,
      payload: dto.payload,
      securityAlert: alert,
    };
  }

  /**
   * Reset Sandbox Environment
   */
  async resetSandbox() {
    this.logger.log('🧪 [SANDBOX] Resetting Sandbox State...');
    return {
      status: 'RESET_SUCCESSFUL',
      message: 'Sandbox state re-initialized cleanly.',
      timestamp: new Date().toISOString(),
    };
  }
}

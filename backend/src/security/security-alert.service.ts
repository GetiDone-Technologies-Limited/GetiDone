import { Injectable, Logger } from '@nestjs/common';

export type ThreatSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SecurityAlert {
  alertId: string;
  type: 'SQL_INJECTION' | 'XSS_ATTACK' | 'FINANCIAL_FRAUD' | 'BRUTE_FORCE' | 'PATH_TRAVERSAL' | 'COMMAND_INJECTION';
  severity: ThreatSeverity;
  sourceIp: string;
  userPath: string;
  method: string;
  details: string;
  blockedAt: Date;
}

@Injectable()
export class SecurityAlertService {
  private readonly logger = new Logger('🚨 IntrusionDetectionSystem');
  private alerts: SecurityAlert[] = [];

  /**
   * Record and broadcast a high-priority security intrusion alert
   */
  triggerSecurityAlert(alert: Omit<SecurityAlert, 'alertId' | 'blockedAt'>): SecurityAlert {
    const alertId = `SEC_ALERT_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const fullAlert: SecurityAlert = {
      ...alert,
      alertId,
      blockedAt: new Date(),
    };

    this.alerts.push(fullAlert);

    // Keep alert log bounded to last 1000 incidents
    if (this.alerts.length > 1000) {
      this.alerts.shift();
    }

    this.logger.error(
      `🚨 [SECURITY THREAT BLOCKED] ${fullAlert.severity} | ID: ${alertId} | Type: ${fullAlert.type} | IP: ${fullAlert.sourceIp} | Path: ${fullAlert.method} ${fullAlert.userPath} | Details: ${fullAlert.details}`
    );

    return fullAlert;
  }

  /**
   * Get all active security alerts for admin monitoring
   */
  getSecurityAlerts(limit = 50): SecurityAlert[] {
    return this.alerts.slice(-limit).reverse();
  }
}

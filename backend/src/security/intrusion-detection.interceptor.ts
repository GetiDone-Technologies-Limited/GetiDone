import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SecurityAlertService } from './security-alert.service';

const SQLI_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|TRUNCATE)\b)/i,
  /('|\"|;)\s*(OR|AND)\s*('|\"|\d|\w)/i,
  /--/,
  /\/\*/,
  /(\bOR\b|\bAND\b)\s+1\s*=\s*1/i,
];

const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i,
  /javascript:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /<iframe/i,
  /<embed/i,
  /document\.cookie/i,
];

const PATH_TRAVERSAL_PATTERNS = [
  /\.\.[\/\\]/,
  /%2e%2e%2f/i,
  /%2e%2e\//i,
];

@Injectable()
export class IntrusionDetectionInterceptor implements NestInterceptor {
  constructor(private readonly securityAlertService: SecurityAlertService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params, headers, ip } = request;
    const clientIp = ip || headers['x-forwarded-for'] || '127.0.0.1';

    // Scan all incoming request payloads recursively
    const payloadString = JSON.stringify({ body, query, params });

    // 1. Scan for SQL Injection
    for (const pattern of SQLI_PATTERNS) {
      if (pattern.test(payloadString) || pattern.test(url)) {
        const alert = this.securityAlertService.triggerSecurityAlert({
          type: 'SQL_INJECTION',
          severity: 'CRITICAL',
          sourceIp: clientIp,
          userPath: url,
          method,
          details: `SQL Injection attack vector detected: Pattern [${pattern}]`,
        });

        throw new ForbiddenException({
          error: 'Security Vulnerability Blocked',
          message: 'Potential SQL Injection attack detected and blocked.',
          alertId: alert.alertId,
        });
      }
    }

    // 2. Scan for XSS Attacks
    for (const pattern of XSS_PATTERNS) {
      if (pattern.test(payloadString) || pattern.test(url)) {
        const alert = this.securityAlertService.triggerSecurityAlert({
          type: 'XSS_ATTACK',
          severity: 'HIGH',
          sourceIp: clientIp,
          userPath: url,
          method,
          details: `XSS Cross-Site Scripting attack vector detected: Pattern [${pattern}]`,
        });

        throw new ForbiddenException({
          error: 'Security Vulnerability Blocked',
          message: 'Potential XSS Attack detected and blocked.',
          alertId: alert.alertId,
        });
      }
    }

    // 3. Scan for Path Traversal
    for (const pattern of PATH_TRAVERSAL_PATTERNS) {
      if (pattern.test(url) || pattern.test(payloadString)) {
        const alert = this.securityAlertService.triggerSecurityAlert({
          type: 'PATH_TRAVERSAL',
          severity: 'HIGH',
          sourceIp: clientIp,
          userPath: url,
          method,
          details: `Directory path traversal attempt blocked.`,
        });

        throw new ForbiddenException({
          error: 'Security Vulnerability Blocked',
          message: 'Path traversal attempt blocked.',
          alertId: alert.alertId,
        });
      }
    }

    // 4. Scan for Financial Fraud & Integer Overflow Attacks
    if (url.includes('/payment') && body) {
      const amount = Number(body.amount);
      if (body.amount !== undefined && (isNaN(amount) || amount <= 0 || amount > 100000000)) {
        const alert = this.securityAlertService.triggerSecurityAlert({
          type: 'FINANCIAL_FRAUD',
          severity: 'CRITICAL',
          sourceIp: clientIp,
          userPath: url,
          method,
          details: `Suspicious financial payload manipulation attempt: Amount = ${body.amount}`,
        });

        throw new BadRequestException({
          error: 'Financial Fraud Prevention Triggered',
          message: 'Invalid or suspicious financial transaction payload.',
          alertId: alert.alertId,
        });
      }
    }

    return next.handle();
  }
}

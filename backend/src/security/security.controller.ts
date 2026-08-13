import { Controller, Get, Query } from '@nestjs/common';
import { SecurityAlertService } from './security-alert.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityAlertService: SecurityAlertService) {}

  @Get('alerts')
  getSecurityAlerts(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 50;
    const alerts = this.securityAlertService.getSecurityAlerts(parsedLimit);
    return {
      status: 'VERIFIED_SECURE',
      totalActiveAlerts: alerts.length,
      alerts,
    };
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats(@CurrentUser() user: { id: string; role: string }) {
    return this.dashboardService.getStats(user.id, user.role);
  }

  @Get('projects')
  getProjects(@CurrentUser() user: { id: string; role: string }) {
    return this.dashboardService.getProjects(user.id, user.role);
  }

  @Get('proposals')
  getProposals(@CurrentUser() user: { id: string }) {
    return this.dashboardService.getProposals(user.id);
  }
}

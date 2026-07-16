import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { JobService, CreateJobDto } from './job.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { JobStatus } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateJobDto) {
    return this.jobService.create(user.id, dto);
  }

  @Get()
  findAll(@Query('status') status?: JobStatus) {
    return this.jobService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post(':id/apply')
  @UseGuards(JwtAuthGuard)
  apply(
    @Param('id') jobId: string,
    @CurrentUser() user: { id: string },
    @Body() body: { proposal: string; bidAmount: number },
  ) {
    return this.jobService.apply(jobId, user.id, body);
  }

  @Post('applications/:applicationId/accept')
  @UseGuards(JwtAuthGuard)
  acceptApplication(
    @Param('applicationId') applicationId: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.jobService.acceptApplication(applicationId, user.id);
  }
}

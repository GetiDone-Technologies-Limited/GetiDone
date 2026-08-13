import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MatchingService } from './matching.service';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get('recommend/:jobId')
  recommend(@Param('jobId') jobId: string) {
    return this.matchingService.recommend(jobId);
  }

  @Get('donescore/:userId')
  getDoneScore(@Param('userId') userId: string) {
    return this.matchingService.getDoneScore(userId);
  }

  @Get('jobs-for-freelancer/:freelancerId')
  recommendJobsForFreelancer(@Param('freelancerId') freelancerId: string) {
    return this.matchingService.recommendJobsForFreelancer(freelancerId);
  }

  @Post('telemetry/commit')
  recordGitTelemetry(
    @Body() body: { userId: string; repoUrl: string; commitSha: string; branch: string; commitMessage: string }
  ) {
    return this.matchingService.recordGitTelemetry(body);
  }

  @Post('telemetry/test-run')
  runTestGateRunner(
    @Body() body: { projectId: string; repoUrl: string; commitSha: string; testSuite: string }
  ) {
    return this.matchingService.runTestGateRunner(body);
  }
}

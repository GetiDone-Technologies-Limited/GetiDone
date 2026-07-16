import { Controller, Get, Param } from '@nestjs/common';
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
}

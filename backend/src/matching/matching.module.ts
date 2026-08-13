import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { GithubBotService } from './github-bot.service';
import { GithubBotController } from './github-bot.controller';

@Module({
  providers: [MatchingService, GithubBotService],
  controllers: [MatchingController, GithubBotController],
  exports: [MatchingService, GithubBotService],
})
export class MatchingModule {}

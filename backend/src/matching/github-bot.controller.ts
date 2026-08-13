import { Controller, Post, Body, Headers, Logger } from '@nestjs/common';
import { GithubBotService, GitHubWebhookPayload } from './github-bot.service';

@Controller('matching/github')
export class GithubBotController {
  private readonly logger = new Logger(GithubBotController.name);

  constructor(private readonly githubBotService: GithubBotService) {}

  @Post('webhook')
  async handleGitHubWebhook(
    @Headers('x-github-event') githubEvent: string,
    @Body() payload: GitHubWebhookPayload
  ) {
    this.logger.log(`🤖 Received GitHub Webhook Event: ${githubEvent}`);

    if (githubEvent === 'pull_request') {
      return this.githubBotService.processPullRequestEvent(payload);
    }

    if (githubEvent === 'push') {
      return {
        status: 'success',
        event: 'push',
        message: 'Git commit telemetry recorded successfully.',
      };
    }

    return { status: 'ignored', event: githubEvent };
  }
}

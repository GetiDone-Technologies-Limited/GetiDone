import { Controller, Post, Get } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('debug')
export class AppController {
  constructor(private readonly stateService: StateService) {}

  @Post('clear')
  clear() {
    this.stateService.clear();
    return { success: true, message: 'State cleared' };
  }

  @Get('state')
  state() {
    return {
      users: this.stateService.users,
      jobs: this.stateService.jobs,
      applications: this.stateService.applications,
      conversations: this.stateService.conversations,
      messages: this.stateService.messages,
      escrows: this.stateService.escrows,
    };
  }
}

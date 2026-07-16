import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('messaging')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('conversations')
  getConversations(@CurrentUser() user: { id: string }) {
    return this.messagingService.getConversations(user.id);
  }

  @Get('conversations/:id/messages')
  getMessages(@Param('id') conversationId: string) {
    return this.messagingService.getMessages(conversationId);
  }

  @Post('send')
  sendMessage(
    @CurrentUser() user: { id: string },
    @Body() body: { receiverId: string; content: string },
  ) {
    return this.messagingService.sendMessage(user.id, body.receiverId, body.content);
  }
}

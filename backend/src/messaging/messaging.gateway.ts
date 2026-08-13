import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagingService: MessagingService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(`user_${userId}`);
      console.log(`🔌 Client connected to WebSockets: ${userId} (${client.id})`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌 Client disconnected from WebSockets: ${client.id}`);
  }

  @SubscribeMessage('join_conversation')
  handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string }
  ) {
    client.join(`conv_${payload.conversationId}`);
    return { event: 'joined_conversation', conversationId: payload.conversationId };
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string; userId: string; isTyping: boolean }
  ) {
    client.to(`conv_${payload.conversationId}`).emit('user_typing', payload);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { senderId: string; receiverId: string; content: string; conversationId?: string }
  ) {
    const message = await this.messagingService.sendMessage(
      payload.senderId,
      payload.receiverId,
      payload.content
    );

    // Emit live message to conversation room and recipient user channel
    this.server.to(`conv_${message.conversationId}`).emit('new_message', message);
    this.server.to(`user_${payload.receiverId}`).emit('new_notification', {
      type: 'MESSAGE',
      title: 'New Message Received',
      message: `${message.sender.name}: ${payload.content.slice(0, 50)}...`,
      sender: message.sender,
      createdAt: new Date(),
    });

    return message;
  }
}

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

let socket: Socket | null = null;

export function getSocket(userId?: string): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      query: userId ? { userId } : {},
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('⚡ WebSockets connected to GetiDone server:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('⚡ WebSockets disconnected');
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

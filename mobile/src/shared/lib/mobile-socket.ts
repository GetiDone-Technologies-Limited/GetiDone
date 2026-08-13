import { io, Socket } from 'socket.io-client';

// Real-time API Endpoint (Syncs 1:1 with Web & Backend)
const API_URL = 'http://localhost:3000';

let mobileSocket: Socket | null = null;

export function getMobileSocket(userId?: string): Socket {
  if (!mobileSocket) {
    mobileSocket = io(API_URL, {
      autoConnect: true,
      query: userId ? { userId } : {},
      transports: ['websocket', 'polling'],
    });

    mobileSocket.on('connect', () => {
      console.log('📱 Mobile App connected to GetiDone Real-Time WebSockets Engine:', mobileSocket?.id);
    });

    mobileSocket.on('disconnect', () => {
      console.log('📱 Mobile App disconnected from Real-Time WebSockets Engine');
    });
  }

  return mobileSocket;
}

export function disconnectMobileSocket() {
  if (mobileSocket) {
    mobileSocket.disconnect();
    mobileSocket = null;
  }
}

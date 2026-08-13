'use client';

import { useEffect, useState } from 'react';
import { getSocket } from '../lib/socket-client';
import { useAuthStore } from '@/store/auth.store';
import type { Socket } from 'socket.io-client';

export function useSocket() {
  const { user } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    const socketInstance = getSocket(user.id);
    setSocket(socketInstance);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);

    if (socketInstance.connected) {
      setIsConnected(true);
    }

    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
    };
  }, [user]);

  return { socket, isConnected };
}

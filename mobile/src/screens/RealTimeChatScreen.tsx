import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useMobileAuthStore } from '../store/auth.mobile.store';
import { getMobileSocket } from '../shared/lib/mobile-socket';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export function RealTimeChatScreen() {
  const { user } = useMobileAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: 'client-1',
      senderName: 'Acme Corp',
      content: 'Hi Sarah! We reviewed the PR for the E-commerce Redesign. The Playwright QA test gates passed 100%.',
      timestamp: '10:30 AM',
    },
    {
      id: 'm2',
      senderId: user?.id || 'mobile-user-1',
      senderName: user?.name || 'Sarah Kim',
      content: 'Thanks! The automated test gate telemetry runs on every commit. Escrow auto-releases upon PR merge.',
      timestamp: '10:32 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (!user) return;
    const socket = getMobileSocket(user.id);

    // Listen for incoming live WebSockets messages from Web/Backend
    socket.on('new_message', (msg: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id || String(Date.now()),
          senderId: msg.senderId || 'peer',
          senderName: msg.sender?.name || 'Client',
          content: msg.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    });

    socket.on('user_typing', (data: { isTyping: boolean }) => {
      setIsPeerTyping(data.isTyping);
    });

    return () => {
      socket.off('new_message');
      socket.off('user_typing');
    };
  }, [user]);

  const sendMessage = () => {
    if (!inputText.trim() || !user) return;

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      senderId: user.id,
      senderName: user.name,
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);

    // Emit live WebSockets message to sync with Web & Backend instantly
    const socket = getMobileSocket(user.id);
    socket.emit('send_message', {
      senderId: user.id,
      receiverId: 'client-1',
      content: inputText,
    });

    setInputText('');
  };

  return (
    <View style={styles.container}>
      {/* Real-time WebSockets Sync Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Acme Corp</Text>
        <View style={styles.statusPill}>
          <View style={styles.greenDot} />
          <Text style={styles.statusText}>
            {isConnected ? 'WEBSOCKETS REAL-TIME SYNC' : 'CONNECTING...'}
          </Text>
        </View>
      </View>

      {/* DoneScore Banner */}
      <View style={styles.doneScoreBanner}>
        <Text style={styles.doneScoreText}>🏆 DoneScore™ 98.4% · Verified Executioner</Text>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((item) => {
          const isMe = item.senderId === user?.id;
          return (
            <View
              key={item.id}
              style={[
                styles.messageBubble,
                isMe ? styles.sentBubble : styles.receivedBubble,
              ]}
            >
              <Text style={styles.senderName}>{item.senderName}</Text>
              <Text style={isMe ? styles.sentText : styles.receivedText}>
                {item.content}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          );
        })}

        {isPeerTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Acme Corp is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type message..."
          placeholderTextColor="#94A39A"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#131A16',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2923',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '800',
  },
  doneScoreBanner: {
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  doneScoreText: {
    color: '#14B8A6',
    fontSize: 11,
    fontWeight: '700',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#10B981',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#131A16',
    borderWidth: 1,
    borderColor: '#1E2923',
  },
  senderName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A39A',
    marginBottom: 4,
  },
  sentText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  receivedText: {
    color: '#E2EAE5',
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  typingIndicator: {
    padding: 8,
  },
  typingText: {
    color: '#10B981',
    fontSize: 12,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#131A16',
    borderTopWidth: 1,
    borderTopColor: '#1E2923',
  },
  input: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1E2923',
  },
  sendButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});

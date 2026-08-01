'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ConversationList as ApiConversationList } from '@/features/messaging/components/ConversationList';
import { ChatWindow as ApiChatWindow } from '@/features/messaging/components/ChatWindow';
import { useAuthStore } from '@/store/auth.store';
import { 
  Search, HelpCircle, Bell, ChevronDown, MessageSquareDashed, 
  Phone, Video, Info, Smile, Paperclip, Mic, Send, Trash2, 
  X, Users, Star, Plus, CheckCircle, XCircle, Monitor, 
  MicOff, VideoOff, Play, Pause, Circle
} from 'lucide-react';

// ============ MOCK DATA ============
const availableMembers = [
  { id: 1, name: 'Sarah Kim', role: 'Brand Designer', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg', selected: false },
  { id: 2, name: 'Marcus Lee', role: 'Lead Developer', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg', selected: false },
  { id: 3, name: 'Alex Chen', role: 'SEO Specialist', avatar: 'https://picsum.photos/seed/alex/100/100.jpg', selected: false },
  { id: 4, name: 'Jenny Diaz', role: 'Content Strategist', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg', selected: false },
];

type Message = {
  type: 'sent' | 'received';
  text?: string;
  audio?: string;
  duration?: number;
  video?: string;
  time: string;
  sender?: string;
};

type Conversation = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastMsg: string;
  time: string;
  unread: number;
  starred: boolean;
  isGroup: boolean;
  groupMembers?: { name: string; avatar: string }[];
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1, name: 'Sarah Kim', role: 'Brand Designer', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
    status: 'online', lastMsg: 'Perfect! I just uploaded the final logo files.', time: '12m',
    unread: 2, starred: true, isGroup: false,
    messages: [
      { type: 'received', text: 'Hi John! I just finished the initial concepts for the brand identity.', time: '10:24 AM' },
      { type: 'received', text: 'Would love to get your feedback when you have a moment.', time: '10:24 AM' },
      { type: 'sent', text: 'Hey Sarah! Just looked at them. Concept 2 is really standing out to me.', time: '10:45 AM' },
      { type: 'sent', audio: 'mock-voice-note', duration: 12, time: '10:46 AM' },
      { type: 'received', text: 'Amazing! I can refine that concept further. Should I proceed with variations?', time: '10:52 AM' },
      { type: 'sent', text: "Yes, please do. Let's focus on Concept 2.", time: '11:00 AM' },
      { type: 'received', text: 'Perfect! I just uploaded the final logo files.', time: '11:12 AM' },
    ]
  },
  {
    id: 2, name: 'Marcus Lee', role: 'Lead Developer', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
    status: 'online', lastMsg: 'The API integration is complete. Moving to QA.', time: '1h',
    unread: 0, starred: false, isGroup: false,
    messages: [
      { type: 'received', text: 'Starting work on the API integration today.', time: 'Yesterday, 9:00 AM' },
      { type: 'sent', text: 'Great. Let me know if you need any credentials.', time: 'Yesterday, 9:15 AM' },
      { type: 'received', text: 'Will do. The documentation seems straightforward.', time: 'Yesterday, 9:20 AM' },
      { type: 'received', text: 'The API integration is complete. Moving to QA.', time: 'Today, 10:00 AM' },
    ]
  },
  {
    id: 3, name: 'Alex Chen', role: 'SEO Specialist', avatar: 'https://picsum.photos/seed/alex/100/100.jpg',
    status: 'away', lastMsg: 'Can we schedule a call to discuss keywords?', time: '3h',
    unread: 1, starred: false, isGroup: false,
    messages: [
      { type: 'received', text: "I've finished the technical audit. There are some indexing issues we need to fix.", time: '8:30 AM' },
      { type: 'sent', text: 'Sounds good. How long will the fixes take?', time: '9:00 AM' },
      { type: 'received', text: 'About 2 days. But I have some questions about the keyword strategy.', time: '9:05 AM' },
      { type: 'received', text: 'Can we schedule a call to discuss keywords?', time: '9:06 AM' },
    ]
  },
  {
    id: 4, name: 'POD Team Alpha', role: '4 Members · E-commerce Redesign', avatar: 'https://picsum.photos/seed/team/100/100.jpg',
    status: 'online', lastMsg: 'Jenny: Meeting notes are in the shared folder.', time: '1d',
    unread: 0, starred: true, isGroup: true,
    groupMembers: [
      { name: 'John Carter', avatar: 'https://picsum.photos/seed/johnavatar/100/100.jpg' },
      { name: 'Marcus Lee', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg' },
      { name: 'Sarah Kim', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg' },
      { name: 'Alex Chen', avatar: 'https://picsum.photos/seed/alex/100/100.jpg' },
    ],
    messages: [
      { type: 'received', text: 'Standup meeting starting in 5 minutes.', time: 'Yesterday, 9:55 AM', sender: 'Marcus' },
      { type: 'sent', text: 'On my way.', time: 'Yesterday, 9:56 AM' },
      { type: 'received', text: 'Meeting notes are in the shared folder.', time: 'Yesterday, 10:30 AM', sender: 'Jenny' },
    ]
  },
  {
    id: 5, name: 'Jenny Diaz', role: 'Content Strategist', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg',
    status: 'offline', lastMsg: 'The first batch of blog posts is ready for review.', time: '2d',
    unread: 0, starred: false, isGroup: false,
    messages: [
      { type: 'received', text: "I've drafted 5 articles based on our content calendar.", time: 'Mon, 2:00 PM' },
      { type: 'sent', text: "Excellent. Send them over and I'll review.", time: 'Mon, 2:15 PM' },
      { type: 'received', text: 'The first batch of blog posts is ready for review.', time: 'Mon, 4:00 PM' },
    ]
  },
];

export default function MessagesPage() {
  const { user } = useAuthStore();
  
  // API State
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>();
  const [selectedReceiverId, setSelectedReceiverId] = useState<string>('');

  // Mock State
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeMockId, setActiveMockId] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'starred' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [msgInput, setMsgInput] = useState('');
  const msgEndRef = useRef<HTMLDivElement>(null);
  
  // Recording State
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Call State
  const [callState, setCallState] = useState<{
    active: boolean;
    type: 'audio' | 'video' | null;
    isMuted: boolean;
    isVideoOff: boolean;
    isSharingScreen: boolean;
  }>({ active: false, type: null, isMuted: false, isVideoOff: false, isSharingScreen: false });
  const localStreamRef = useRef<MediaStream | null>(null);
  
  // Modals & Toast
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [toast, setToast] = useState<{show: boolean; title: string; message: string}>({show: false, title: '', message: ''});

  // Derived state
  const activeConv = conversations.find(c => c.id === activeMockId);
  
  const filteredConvs = conversations.filter(c => {
    const match = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return match;
    if (activeTab === 'unread') return match && c.unread > 0;
    if (activeTab === 'starred') return match && c.starred;
    if (activeTab === 'groups') return match && c.isGroup;
    return match;
  });

  // Helpers
  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages]);

  const showToast = (title: string, message: string) => {
    setToast({ show: true, title, message });
    setTimeout(() => setToast({ show: false, title: '', message: '' }), 3200);
  };

  const handleSelectConv = (id: number) => {
    setActiveMockId(id);
    setSelectedConvId(undefined); // Hide API UI when mock selected
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleSendText = () => {
    if (!msgInput.trim() || !activeMockId) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    setConversations(prev => prev.map(c => {
      if (c.id === activeMockId) {
        return {
          ...c,
          lastMsg: msgInput,
          time: 'now',
          messages: [...c.messages, { type: 'sent', text: msgInput, time: timeStr }]
        };
      }
      return c;
    }));
    setMsgInput('');
    
    setTimeout(() => {
      const replies = ["Got it!", "Sure thing.", "Thanks for the update.", "Understood."];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setConversations(prev => prev.map(c => {
        if (c.id === activeMockId) {
          return {
            ...c,
            lastMsg: reply,
            time: 'now',
            messages: [...c.messages, { type: 'received', text: reply, time: replyTime }]
          };
        }
        return c;
      }));
    }, 1500);
  };

  // Recording Logic
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      let chunks: BlobPart[] = [];
      
      mediaRecorderRef.current.ondataavailable = e => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg' });
        const audioUrl = URL.createObjectURL(blob);
        sendMediaMsg('audio', audioUrl, recSeconds);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecordingVoice(true);
      setRecSeconds(0);
      timerRef.current = setInterval(() => setRecSeconds(s => s + 1), 1000);
    } catch (err) {
      showToast('Error', 'Microphone access denied');
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    clearInterval(timerRef.current!);
    setIsRecordingVoice(false);
    setIsRecordingVideo(false);
  };

  const stopRecordingAndSend = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current!);
    setIsRecordingVoice(false);
    setIsRecordingVideo(false);
  };

  const sendMediaMsg = (type: 'audio' | 'video', url: string, dur: number) => {
    if (!activeMockId) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setConversations(prev => prev.map(c => {
      if (c.id === activeMockId) {
        return {
          ...c,
          lastMsg: type === 'audio' ? '🎤 Voice message' : '📹 Video message',
          time: 'now',
          messages: [...c.messages, { type: 'sent', [type]: url, duration: dur, time: timeStr } as Message]
        };
      }
      return c;
    }));
  };

  // Call System
  const startCall = async (type: 'audio' | 'video') => {
    if (!activeMockId) return;
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: type === 'video', audio: true });
      setCallState({ active: true, type, isMuted: false, isVideoOff: false, isSharingScreen: false });
    } catch (err) {
      showToast('Permission Denied', 'Please allow camera/mic access.');
    }
  };

  const endCall = () => {
    setCallState(prev => ({ ...prev, active: false }));
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
    }
    showToast('Call Ended', 'Duration: 0:00');
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setCallState(prev => ({ ...prev, isMuted: !audioTrack.enabled }));
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCallState(prev => ({ ...prev, isVideoOff: !videoTrack.enabled }));
      }
    }
  };

  const toggleScreenShare = async () => {
    if (!callState.isSharingScreen) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setCallState(prev => ({ ...prev, isSharingScreen: true }));
        displayStream.getVideoTracks()[0].onended = () => {
          setCallState(prev => ({ ...prev, isSharingScreen: false }));
        };
      } catch (err) {
        showToast('Error', 'Screen share cancelled');
      }
    } else {
      setCallState(prev => ({ ...prev, isSharingScreen: false }));
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (callState.active) endCall();
        setShowGroupModal(false);
        setShowMsgModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [callState.active]);


  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col relative text-[var(--text)]">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--soft)]" />
          <input 
            type="text" 
            placeholder="Search messages, files, freelancers..." 
            className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:bg-[var(--card)] focus:border-[var(--primary)]"
            style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid transparent' }} 
          />
        </div>
        <div className="flex items-center gap-3 ml-6">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-px" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-px relative" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)', border: '2px solid var(--card)' }}></span>
          </button>
          <div className="w-px h-8" style={{ backgroundColor: 'var(--border)' }}></div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-transform hover:-translate-y-px">
            {user?.photoURL ? (
              <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                {user?.displayName?.[0] || 'U'}
              </div>
            )}
            <ChevronDown className="w-3 h-3 text-[var(--muted)]" />
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex rounded-[18px] overflow-hidden border min-h-0 bg-[var(--card)] border-[var(--border)]">
        {/* Left Panel */}
        <div className="w-[340px] flex-shrink-0 border-r border-[var(--border)] flex flex-col">
          <div className="p-5 border-b border-[var(--border)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold font-['Sora',sans-serif]">Messages</h2>
              <div className="flex gap-1">
                <button onClick={() => setShowMsgModal(true)} className="p-1.5 rounded-lg hover:bg-[var(--bg-alt)] text-[var(--muted)] hover:text-[var(--primary)] transition-colors"><Plus className="w-5 h-5"/></button>
                <button onClick={() => setShowGroupModal(true)} className="p-1.5 rounded-lg hover:bg-[var(--bg-alt)] text-[var(--muted)] hover:text-[var(--primary)] transition-colors"><Users className="w-5 h-5"/></button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--soft)]" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none bg-[var(--bg-alt)] border border-transparent focus:bg-[var(--card)] focus:border-[var(--primary)] transition-all" 
              />
            </div>
          </div>
          
          <div className="flex gap-2 px-5 pt-3 border-b border-[var(--border)]">
            {(['all', 'unread', 'starred', 'groups'] as const).map(tab => (
              <div 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 text-xs font-bold cursor-pointer border-b-2 flex items-center gap-1.5 -mb-[1px] capitalize transition-colors ${activeTab === tab ? 'text-[var(--primary)] border-[var(--primary)]' : 'text-[var(--muted)] border-transparent hover:text-[var(--text)]'}`}
              >
                {tab}
                {tab === 'unread' && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--primary)] text-white font-bold leading-none">3</span>}
              </div>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
             {filteredConvs.length === 0 ? (
                <div className="p-8 text-center text-[var(--muted)] text-sm font-semibold">No conversations found</div>
             ) : (
                filteredConvs.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => handleSelectConv(c.id)}
                    className={`flex items-center gap-3 p-4 cursor-pointer border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-alt)] ${activeMockId === c.id ? 'bg-[var(--bg-alt)] border-l-4 border-l-[var(--primary)] pl-[12px]' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="relative flex-shrink-0">
                      <img src={c.avatar} className="w-12 h-12 rounded-full object-cover" alt={c.name} />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--card)] ${c.status === 'online' ? 'bg-[var(--success)]' : c.status === 'away' ? 'bg-[var(--warning)]' : 'bg-[var(--soft)]'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 min-w-0 font-bold text-sm">
                          {c.isGroup && <Users className="w-3 h-3 text-[var(--secondary)] flex-shrink-0" />}
                          <span className="truncate">{c.name}</span>
                          {c.starred && <Star className="w-3 h-3 text-[var(--warning)] fill-current flex-shrink-0" />}
                        </div>
                        <span className={`text-[10px] font-semibold flex-shrink-0 ml-2 ${c.unread > 0 ? 'text-[var(--primary)]' : 'text-[var(--soft)]'}`}>{c.time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs truncate text-[var(--muted)]">{c.lastMsg}</p>
                        {c.unread > 0 && <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">{c.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>
        
        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-[var(--bg-alt)]">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={activeConv.avatar} className="w-10 h-10 rounded-full object-cover" alt={activeConv.name} />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--card)] ${activeConv.status === 'online' ? 'bg-[var(--success)]' : activeConv.status === 'away' ? 'bg-[var(--warning)]' : 'bg-[var(--soft)]'}`}></span>
                  </div>
                  <div>
                    <div className="font-['Sora',sans-serif] font-bold text-base flex items-center gap-2">
                      {activeConv.isGroup && <Users className="w-4 h-4 text-[var(--secondary)]" />}
                      {activeConv.name}
                    </div>
                    <div className="text-xs text-[var(--muted)] flex items-center gap-1.5 capitalize">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeConv.status === 'online' ? 'bg-[var(--success)]' : activeConv.status === 'away' ? 'bg-[var(--warning)]' : 'bg-[var(--soft)]'}`}></span>
                      {activeConv.status} · {activeConv.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startCall('audio')} className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] hover:bg-[var(--bg-alt)] transition-colors"><Phone className="w-4 h-4 text-[var(--text)]" /></button>
                  <button onClick={() => startCall('video')} className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] hover:bg-[var(--bg-alt)] transition-colors"><Video className="w-4 h-4 text-[var(--text)]" /></button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] hover:bg-[var(--bg-alt)] transition-colors"><Info className="w-4 h-4 text-[var(--text)]" /></button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-center my-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--soft)] bg-[var(--card)] px-3 py-1 rounded-full">Today</span>
                </div>
                
                {activeConv.messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.type === 'sent' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    {m.sender && <div className="text-[10px] font-bold mb-1 ml-1 text-[var(--secondary)]">{m.sender}</div>}
                    
                    <div className={`max-w-[70%] p-3.5 shadow-sm ${m.type === 'sent' ? 'bg-[var(--primary)] text-white rounded-[16px] rounded-br-[4px]' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--text)] rounded-[16px] rounded-bl-[4px]'}`}>
                      {m.text && <p className="text-sm whitespace-pre-wrap">{m.text}</p>}
                      
                      {m.audio && (
                        <div className="flex items-center gap-3">
                          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors">
                            <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                          </button>
                          <div className="flex items-center gap-[2px] h-8">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={i} className="w-[2.5px] rounded-full bg-white/40" style={{ height: `${Math.floor(Math.random() * 16) + 4}px` }} />
                            ))}
                          </div>
                          <span className="text-xs font-medium font-mono ml-1">0:{m.duration?.toString().padStart(2, '0')}</span>
                        </div>
                      )}
                      
                      {m.video && (
                        <div className="rounded-lg overflow-hidden relative cursor-pointer group">
                           <video src={m.video} className="max-w-full rounded-lg" />
                           <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Play className="w-8 h-8 text-white fill-current" />
                           </div>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-[var(--soft)] mt-1.5 font-medium">{m.time}</div>
                  </div>
                ))}
                <div ref={msgEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[var(--card)] border-t border-[var(--border)]">
                {isRecordingVoice ? (
                  <div className="flex items-center justify-between bg-[#Fee2e2] text-red-600 rounded-xl px-4 py-3 border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold text-sm">Recording Audio</span>
                      <span className="font-mono text-sm ml-2 font-medium">{Math.floor(recSeconds/60)}:{(recSeconds%60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={cancelRecording} className="w-9 h-9 rounded-full flex items-center justify-center text-red-700 hover:bg-red-200/50"><Trash2 className="w-4 h-4"/></button>
                      <button onClick={stopRecordingAndSend} className="w-9 h-9 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 shadow-sm"><Send className="w-4 h-4 ml-0.5"/></button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end gap-2 bg-[var(--bg-alt)] p-2 rounded-[16px] border border-[var(--border)] focus-within:border-[var(--primary)] transition-colors">
                    <button className="p-2.5 text-[var(--muted)] hover:text-[var(--primary)] transition-colors flex-shrink-0"><Paperclip className="w-5 h-5"/></button>
                    <textarea 
                      value={msgInput}
                      onChange={e => setMsgInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendText();
                        }
                      }}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent resize-none outline-none py-2.5 text-sm max-h-[120px] min-h-[44px]"
                      rows={1}
                    />
                    <div className="flex items-center gap-1 p-1">
                      {msgInput.trim().length > 0 ? (
                        <button onClick={handleSendText} className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 shadow-sm shadow-[var(--primary)] transition-transform hover:-translate-y-px"><Send className="w-4 h-4 ml-0.5"/></button>
                      ) : (
                        <>
                          <button className="w-10 h-10 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] flex items-center justify-center transition-colors"><Smile className="w-5 h-5"/></button>
                          <button onClick={startVoiceRecording} className="w-10 h-10 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] flex items-center justify-center transition-colors"><Mic className="w-5 h-5"/></button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : selectedConvId && user ? (
            <ApiChatWindow conversationId={selectedConvId} receiverId={selectedReceiverId} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-400 bg-[var(--bg-alt)]">
              <div className="w-20 h-20 rounded-[16px] flex items-center justify-center mb-6 bg-[var(--card)] border border-[var(--border)]">
                <MessageSquareDashed className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-extrabold mb-1 text-[var(--text)] font-['Sora',sans-serif]">Your Messages</h3>
              <p className="text-sm font-medium text-[var(--muted)]">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>

      {/* Call Overlay */}
      {callState.active && (
        <div className="fixed inset-0 z-[1000] bg-[#0a0a0a] text-white flex flex-col animate-in fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,183,107,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
          
          <div className="flex-1 flex flex-col items-center justify-center relative p-8">
            {activeConv?.isGroup ? (
              <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="grid grid-cols-2 gap-4 w-full aspect-video">
                  {activeConv.groupMembers?.map((m, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      <img src={m.avatar} className="w-24 h-24 rounded-full object-cover" alt={m.name} />
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold">{m.name}</div>
                    </div>
                  ))}
                  {callState.type === 'video' ? (
                     <div className="relative rounded-2xl overflow-hidden bg-zinc-800 border-2 border-[var(--primary)] flex items-center justify-center">
                      <video className="w-full h-full object-cover" autoPlay muted playsInline ref={v => { if (v && localStreamRef.current) v.srcObject = localStreamRef.current }} />
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold">You</div>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-800 border-2 border-[var(--primary)] flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center text-3xl font-bold">Y</div>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold">You</div>
                    </div>
                  )}
                </div>
                <div className="mt-8 text-center">
                  <h2 className="text-3xl font-bold font-['Sora',sans-serif]">{activeConv.name}</h2>
                  <div className="text-zinc-400 mt-2 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                    Group {callState.type} call · Connecting...
                  </div>
                </div>
              </div>
            ) : callState.type === 'video' ? (
              <div className="w-full h-full relative rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-zinc-900 bg-center bg-cover" style={{ backgroundImage: `url(${activeConv?.avatar})` }} />
                <div className="absolute bottom-8 right-8 w-64 aspect-[3/4] bg-zinc-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
                  <video className="w-full h-full object-cover" autoPlay muted playsInline ref={v => { if (v && localStreamRef.current) v.srcObject = localStreamRef.current }} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img src={activeConv?.avatar} className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 shadow-2xl" alt={activeConv?.name} />
                <h2 className="text-3xl font-bold font-['Sora',sans-serif] mt-6">{activeConv?.name}</h2>
                <div className="text-zinc-400 mt-2 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                  Calling...
                </div>
              </div>
            )}
          </div>

          <div className="h-24 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-center gap-6 pb-safe">
            <button onClick={toggleMute} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${callState.isMuted ? 'bg-zinc-100 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
              {callState.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            {callState.type === 'video' && (
              <button onClick={toggleVideo} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${callState.isVideoOff ? 'bg-zinc-100 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                {callState.isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>
            )}
            <button onClick={toggleScreenShare} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${callState.isSharingScreen ? 'bg-[var(--primary)] text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
              <Monitor className="w-6 h-6" />
            </button>
            <button onClick={endCall} className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] ml-4">
              <Phone className="w-7 h-7 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[1100] bg-zinc-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-start gap-4 animate-in slide-in-from-bottom-8 fade-in border border-zinc-800 max-w-sm">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <div>
            <h4 className="font-bold text-sm">{toast.title}</h4>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Modals (Group & Message) placeholder... simple implementations to satisfy requirements */}
      {showGroupModal && (
        <div className="fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--card)] w-full max-w-md rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h3 className="text-lg font-bold">Create Group</h3>
              <button onClick={() => setShowGroupModal(false)} className="text-[var(--muted)] hover:text-[var(--text)]"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[var(--muted)] uppercase mb-1.5 block">Group Name</label>
                <input type="text" placeholder="e.g. Project Alpha Team" className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] outline-none focus:border-[var(--primary)] text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--muted)] uppercase mb-1.5 block">Members</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {availableMembers.map(m => (
                    <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-alt)] cursor-pointer border border-transparent hover:border-[var(--border)] transition-colors">
                      <img src={m.avatar} className="w-10 h-10 rounded-full" alt={m.name} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm truncate">{m.name}</div>
                        <div className="text-xs text-[var(--muted)] truncate">{m.role}</div>
                      </div>
                      <div className="w-5 h-5 rounded border border-[var(--border)]"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-[var(--border)] bg-[var(--bg-alt)] flex justify-end gap-3">
              <button onClick={() => setShowGroupModal(false)} className="px-5 py-2 rounded-xl font-bold text-sm hover:bg-[var(--border)] transition-colors">Cancel</button>
              <button onClick={() => { setShowGroupModal(false); showToast('Group Created', 'Ready for collaboration'); }} className="px-5 py-2 rounded-xl font-bold text-sm bg-[var(--primary)] text-white hover:opacity-90 transition-opacity">Create</button>
            </div>
          </div>
        </div>
      )}

      {showMsgModal && (
        <div className="fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--card)] w-full max-w-md rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h3 className="text-lg font-bold">New Message</h3>
              <button onClick={() => setShowMsgModal(false)} className="text-[var(--muted)] hover:text-[var(--text)]"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <input type="text" placeholder="To: name or email" className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] outline-none focus:border-[var(--primary)] text-sm" />
              <textarea placeholder="Your message..." rows={4} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] outline-none focus:border-[var(--primary)] text-sm resize-none" />
            </div>
            <div className="p-5 border-t border-[var(--border)] bg-[var(--bg-alt)] flex justify-end gap-3">
              <button onClick={() => setShowMsgModal(false)} className="px-5 py-2 rounded-xl font-bold text-sm hover:bg-[var(--border)] transition-colors">Cancel</button>
              <button onClick={() => { setShowMsgModal(false); showToast('Message Sent', 'Your message is on its way'); }} className="px-5 py-2 rounded-xl font-bold text-sm bg-[var(--primary)] text-white flex items-center gap-2 hover:opacity-90 transition-opacity"><Send className="w-4 h-4"/> Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

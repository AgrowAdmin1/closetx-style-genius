
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Send, Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import ChatMessage from '@/components/Chat/ChatMessage';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CallInterface from '@/components/Chat/CallInterface';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey, I love your latest outfit post!',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Thanks! I just got that jacket yesterday.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: '3',
      text: 'Here\'s that dress I was telling you about',
      sender: 'other',
      timestamp: new Date(Date.now() - 1800000),
      attachment: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop',
        name: 'summer_dress.jpg'
      }
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isInAudioCall, setIsInAudioCall] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'That sounds great! Looking forward to seeing more of your style.',
        sender: 'other',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };
  
  const handleAttachment = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would upload the file to your storage
    // and get back a URL. For this demo, we'll create an object URL.
    const fileType = file.type.startsWith('image/') ? 'image' : 'document';
    
    const message: Message = {
      id: Date.now().toString(),
      text: `Sent an attachment: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      attachment: {
        type: fileType,
        url: URL.createObjectURL(file),
        name: file.name
      }
    };
    
    setMessages([...messages, message]);
    toast.success('Attachment sent!');
  };
  
  const startVideoCall = () => {
    setIsInVideoCall(true);
  };
  
  const startAudioCall = () => {
    setIsInAudioCall(true);
  };
  
  const endCall = () => {
    setIsInVideoCall(false);
    setIsInAudioCall(false);
    toast.info('Call ended');
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Contact" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Sarah Chen</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={startAudioCall}>
                  <Mic className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Audio Call</DialogTitle>
                </DialogHeader>
                <CallInterface mode="audio" contact="Sarah Chen" onEndCall={endCall} />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={startVideoCall}>
                  <Video className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Video Call</DialogTitle>
                </DialogHeader>
                <CallInterface mode="video" contact="Sarah Chen" onEndCall={endCall} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card className="flex-1 overflow-auto p-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </Card>
        
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline" 
            size="icon"
            onClick={handleAttachment}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Chat;

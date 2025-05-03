
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

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

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder.svg" alt="Contact" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
        <Card className={`p-3 inline-block ${
          isUser ? 'bg-closetx-teal text-white' : 'bg-gray-100'
        } rounded-2xl`}>
          <p>{message.text}</p>
          
          {message.attachment && (
            <div className="mt-2">
              {message.attachment.type === 'image' ? (
                <img 
                  src={message.attachment.url} 
                  alt={message.attachment.name}
                  className="rounded-md max-h-48 max-w-full"
                />
              ) : (
                <div className="bg-white p-2 rounded-md flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">{message.attachment.name}</span>
                </div>
              )}
            </div>
          )}
        </Card>
        <p className="text-xs text-gray-500 mt-1">
          {format(message.timestamp, 'p')}
        </p>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;


import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import ChatList from '@/components/Chat/ChatList';

const ChatOverview = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Messages</h1>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Chat
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
          />
        </div>
        
        <div className="pb-4">
          <ChatList />
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatOverview;

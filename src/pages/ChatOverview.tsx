
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users, MessageSquare } from 'lucide-react';
import ChatList from '@/components/Chat/ChatList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChatOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  const availableContacts = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      status: 'online'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar: '/placeholder.svg',
      status: 'away'
    },
    {
      id: '3',
      name: 'Emily Roberts',
      avatar: '/placeholder.svg',
      status: 'offline'
    },
    {
      id: '4',
      name: 'Carlos Miranda',
      avatar: '/placeholder.svg',
      status: 'online'
    }
  ];
  
  const groups = [
    {
      id: 'g1',
      name: 'Fashion Enthusiasts',
      avatars: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      lastMessage: 'Has anyone tried the new summer collection?',
      time: '2:30 PM',
      unread: 3,
      members: 8
    },
    {
      id: 'g2',
      name: 'Sustainable Style',
      avatars: ['/placeholder.svg', '/placeholder.svg'],
      lastMessage: 'Check out this thrift store I found!',
      time: 'Yesterday',
      unread: 0,
      members: 6
    }
  ];
  
  const toggleContactSelection = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    } else {
      setSelectedContacts(prev => [...prev, contactId]);
    }
  };
  
  const createGroupChat = () => {
    if (selectedContacts.length < 2) {
      toast.error('Please select at least 2 contacts for a group chat');
      return;
    }
    
    toast.success('Group chat created successfully!');
    setSelectedContacts([]);
    // In a real app, you would navigate to the new group chat
    navigate('/chat');
  };
  
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Messages</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start a New Conversation</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="direct" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="direct">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Direct Message
                  </TabsTrigger>
                  <TabsTrigger value="group">
                    <Users className="h-4 w-4 mr-2" />
                    Group Chat
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="direct" className="mt-4 space-y-4">
                  <Input placeholder="Search contacts..." />
                  <div className="max-h-60 overflow-y-auto">
                    {availableContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigate(`/chat/${contact.id}`)}
                      >
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{contact.name}</p>
                          <span 
                            className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              contact.status === 'online' ? 'bg-green-500' : 
                              contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}
                          ></span>
                          <span className="text-xs text-gray-500">{contact.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="group" className="mt-4 space-y-4">
                  <Input placeholder="Group name" className="mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Select contacts to add:</p>
                  <div className="max-h-60 overflow-y-auto">
                    {availableContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={`flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer ${
                          selectedContacts.includes(contact.id) ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => toggleContactSelection(contact.id)}
                      >
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{contact.name}</p>
                          <span 
                            className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              contact.status === 'online' ? 'bg-green-500' : 
                              contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}
                          ></span>
                          <span className="text-xs text-gray-500">{contact.status}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border ${
                          selectedContacts.includes(contact.id) ? 'bg-closetx-teal border-closetx-teal' : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {selectedContacts.includes(contact.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={createGroupChat}
                    disabled={selectedContacts.length < 2}
                    className="w-full mt-4"
                  >
                    Create Group Chat ({selectedContacts.length} selected)
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="direct">
              <MessageSquare className="h-4 w-4 mr-2" />
              Direct Messages
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Users className="h-4 w-4 mr-2" />
              Group Chats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct" className="space-y-2">
            <ChatList />
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-2">
            {groups.map(group => (
              <div 
                key={group.id}
                className="p-3 bg-white rounded-lg border border-gray-200 flex items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/chat/${group.id}`)}
              >
                <div className="relative flex -space-x-2 mr-3">
                  {group.avatars.map((avatar, index) => (
                    <Avatar key={index} className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={avatar} />
                      <AvatarFallback>{group.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {group.members > group.avatars.length && (
                    <div className="h-8 w-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium">
                      +{group.members - group.avatars.length}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{group.name}</h3>
                    <span className="text-xs text-gray-500">{group.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate max-w-[200px]">
                      {group.lastMessage}
                    </p>
                    {group.unread > 0 && (
                      <div className="bg-closetx-teal text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {group.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center py-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toast.info("Create a new group chat to start collaborating")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create New Group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
      </div>
    </AppLayout>
  );
};

export default ChatOverview;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import useContacts, { Contact } from '@/hooks/useContacts';

const ChatList: React.FC = () => {
  const { contacts, markAsRead } = useContacts();
  const navigate = useNavigate();

  const handleSelectChat = (contactId: string) => {
    markAsRead(contactId);
    navigate(`/chat/${contactId}`);
  };

  return (
    <div className="space-y-2">
      {contacts.map((contact) => (
        <Card 
          key={contact.id} 
          className={`p-3 flex items-center hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
            contact.unreadCount > 0 ? 'bg-blue-50' : ''
          }`}
          onClick={() => handleSelectChat(contact.id)}
        >
          <div className="relative">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span 
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                contact.status === 'online' ? 'bg-green-500' : 
                contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              } border-2 border-white`}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{contact.name}</h3>
              <span className="text-xs text-gray-500">
                {format(contact.lastSeen, 'p')}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 truncate">
                {contact.id === '1' ? 'Here\'s that dress I was telling you about' : 'Hey! How are you?'}
              </p>
              
              {contact.unreadCount > 0 && (
                <Badge variant="default" className="bg-closetx-teal ml-2">
                  {contact.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ChatList;

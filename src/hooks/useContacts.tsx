
import { useState, useEffect } from 'react';

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastSeen: Date;
  status: 'online' | 'offline' | 'away';
  unreadCount: number;
};

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      lastSeen: new Date(),
      status: 'online',
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar: '/placeholder.svg',
      lastSeen: new Date(Date.now() - 1000 * 60 * 15),
      status: 'away',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Emma Williams',
      avatar: '/placeholder.svg',
      lastSeen: new Date(),
      status: 'online',
      unreadCount: 0
    },
    {
      id: '4',
      name: 'James Smith',
      avatar: '/placeholder.svg',
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: 'offline',
      unreadCount: 1
    }
  ]);

  return {
    contacts,
    setContacts,
    markAsRead: (contactId: string) => {
      setContacts(prev => prev.map(contact => 
        contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
      ));
    }
  };
};

export default useContacts;

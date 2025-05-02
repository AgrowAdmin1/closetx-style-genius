
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Share, Users, Check } from 'lucide-react';
import { toast } from 'sonner';

type FriendType = {
  id: string;
  name: string;
  avatar: string;
  closetShared: boolean;
};

const mockFriends: FriendType[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/150?img=1',
    closetShared: true,
  },
  {
    id: '2',
    name: 'Rahul Verma',
    avatar: 'https://i.pravatar.cc/150?img=2',
    closetShared: false,
  },
  {
    id: '3',
    name: 'Meera Patel',
    avatar: 'https://i.pravatar.cc/150?img=3',
    closetShared: false,
  },
];

const WardrobeSharing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState(mockFriends);
  const [inviteEmail, setInviteEmail] = useState('');

  const toggleSharing = (id: string) => {
    setFriends(friends.map(friend => 
      friend.id === id 
        ? { ...friend, closetShared: !friend.closetShared } 
        : friend
    ));
    
    const friend = friends.find(f => f.id === id);
    if (friend) {
      toast.success(
        friend.closetShared 
          ? `Stopped sharing with ${friend.name}` 
          : `Started sharing with ${friend.name}`
      );
    }
  };

  const sendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail) {
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full flex gap-2"
      >
        <Users size={16} />
        Wardrobe Sharing
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Wardrobe</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Invite a Friend</h3>
              <form onSubmit={sendInvite} className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Share size={16} className="mr-2" />
                  Invite
                </Button>
              </form>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Friends</h3>
              <div className="space-y-3">
                {friends.map(friend => (
                  <div 
                    key={friend.id}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={friend.avatar} 
                          alt={friend.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium">{friend.name}</p>
                    </div>
                    
                    <Button 
                      size="sm"
                      variant={friend.closetShared ? "default" : "outline"}
                      className={friend.closetShared ? "bg-closetx-teal" : ""}
                      onClick={() => toggleSharing(friend.id)}
                    >
                      {friend.closetShared ? (
                        <>
                          <Check size={16} className="mr-1" />
                          Shared
                        </>
                      ) : (
                        "Share"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Wardrobe Sharing Benefits</h3>
              <ul className="text-sm mt-2 space-y-1 text-gray-600">
                <li>• Borrow items for special occasions</li>
                <li>• Compare styles with friends</li>
                <li>• Reduce clothing waste</li>
                <li>• Get inspired by friends' outfits</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WardrobeSharing;

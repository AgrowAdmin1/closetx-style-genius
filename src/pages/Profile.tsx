
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingBag, Heart, Share2, Settings, LogOut } from 'lucide-react';

const Profile = () => {
  const userStats = [
    { label: 'Items', value: '42' },
    { label: 'Outfits', value: '15' },
    { label: 'Shared', value: '3' },
  ];

  const mockSharedItems = [
    { 
      id: '1',
      name: 'Black Evening Dress',
      owner: 'Meera S.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      returnDate: '2023-05-20'
    },
    { 
      id: '2',
      name: 'Leather Handbag',
      owner: 'Ananya R.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      returnDate: '2023-05-25'
    }
  ];

  const mockFavoriteOutfits = [
    { 
      id: '1',
      name: 'Summer Party',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
    { 
      id: '2',
      name: 'Office Formal',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="User" />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold text-xl mt-3">Priya Singh</h2>
        <p className="text-sm text-gray-500">Mumbai, India</p>
        
        <div className="flex justify-center mt-4">
          {userStats.map((stat, index) => (
            <div key={stat.label} className="text-center px-4">
              <p className="font-bold text-closetx-teal text-lg">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="shared" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="shared">Shared Items</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shared">
          <div className="space-y-4">
            {mockSharedItems.map(item => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">Borrowed from {item.owner}</p>
                    <p className="text-xs text-closetx-teal mt-1">
                      Return by {new Date(item.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="mt-4 text-center">
              <Button 
                className="bg-closetx-teal hover:bg-closetx-teal/90 w-full max-w-xs"
              >
                <ShoppingBag size={18} className="mr-2" />
                Browse Items to Borrow
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="space-y-4">
            {mockFavoriteOutfits.map(outfit => (
              <Card key={outfit.id} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <img 
                    src={outfit.image} 
                    alt={outfit.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-medium">{outfit.name}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 space-y-3">
        <Button 
          variant="outline" 
          className="w-full flex justify-start items-center border-gray-200"
        >
          <Share2 size={18} className="mr-2" /> Share Wardrobe
        </Button>
        <Button 
          variant="outline" 
          className="w-full flex justify-start items-center border-gray-200"
        >
          <Settings size={18} className="mr-2" /> Settings
        </Button>
        <Button 
          variant="outline" 
          className="w-full flex justify-start items-center text-red-500 border-gray-200"
        >
          <LogOut size={18} className="mr-2" /> Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;

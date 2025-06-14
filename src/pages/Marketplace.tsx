
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Flame, Users, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import VirtualTryOnDialog from '@/components/Marketplace/VirtualTryOnDialog';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type MovementType = {
  id: string;
  creator: string;
  creatorAvatar: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  isTrending: boolean;
  members: string[];
  date: string;
  outfitImage: string;
};

const mockMovements: MovementType[] = [
  {
    id: '1',
    creator: 'Priya',
    creatorAvatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    title: "Priya's Dinner Outing",
    description: "Classy night at The Table. See who else is going!",
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    tags: ['Dinner', 'Luxury', 'Mumbai'],
    isTrending: true,
    members: ['Priya', 'Ankita', 'Megha'],
    date: '2025-07-10',
    outfitImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '2',
    creator: 'Meera',
    creatorAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    title: "Meera's Goa Trip",
    description: 'Sun, sand, and style. Who’s in? Already 7 girls joined!',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Vacation', 'Beach', 'Goa', 'Girls Trip'],
    isTrending: true,
    members: ['Meera', 'Sonali', 'Tara', 'Juhi'],
    date: '2025-07-15',
    outfitImage: 'https://images.unsplash.com/photo-1594618776274-0498b952a8a4?auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '3',
    creator: 'Office Team',
    creatorAvatar: 'https://randomuser.me/api/portraits/women/70.jpg',
    title: "Team Movie Night",
    description: 'New Barbenheimer release! Join before seats fill.',
    image: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80',
    tags: ['Movie', 'Fun', 'Colleagues'],
    isTrending: false,
    members: ['Priya', 'Meera', 'Sara', 'Ananya', 'Team'],
    date: '2025-07-12',
    outfitImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=870&q=80'
  },
];

const audienceDescription = (
  <div className="mb-7 mt-2">
    <span className="text-md text-gray-600">
      Platform for <span className="font-bold text-closetx-teal">corporate women</span>, girls, students, and fashionistas. Plan your next movement—be it a dinner, concert, or a vacation—get instant outfit ideas and join with friends. Jealous of your friend’s trip or that new dress? We get it—catch those moments, book together, show off, or be inspired!
    </span>
  </div>
);

const Marketplace = () => {
  const [movements, setMovements] = useState(mockMovements);
  const [joiningMovement, setJoiningMovement] = useState<MovementType | null>(null);

  const navigate = useNavigate();

  const handleJoin = (movement: MovementType) => {
    setJoiningMovement(movement);
  };

  const handleStartMovement = () => {
    toast.info("Movement creation coming soon! Suggest events, dinners, trips & more.");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-2 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">
            Movements & Stories
          </h1>
          <Button onClick={handleStartMovement} variant="default" className="flex items-center gap-2 font-semibold">
            <Plus size={18} /> Start Movement
          </Button>
        </div>
        {audienceDescription}

        <div className="space-y-7">
          {movements.map((movement) => (
            <Card key={movement.id} className="p-0 overflow-hidden shadow-lg group">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-52 w-full h-48 bg-gray-200 flex-shrink-0">
                  <img
                    src={movement.image}
                    alt={movement.title}
                    className="object-cover w-full h-full"
                  />
                  {movement.isTrending && (
                    <Badge className="absolute top-2 right-2 bg-pink-100 text-pink-700 flex items-center gap-1">
                      <Flame size={14} /> Trending
                    </Badge>
                  )}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <Users size={14} className="text-closetx-teal" />
                    <span className="text-xs text-white bg-closetx-teal/80 rounded px-2 py-0.5">{movement.members.length} joined</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="p-4 pb-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <img
                        src={movement.creatorAvatar}
                        alt={movement.creator}
                        className="h-7 w-7 rounded-full border-2 border-white shadow"
                      />
                      <span className="font-semibold text-sm text-gray-700 leading-tight">{movement.creator}</span>
                      <span className="ml-1 text-xs text-gray-400">{new Date(movement.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                    </div>
                    <h2 className="text-lg font-bold">{movement.title}</h2>
                    <p className="text-gray-600 text-sm mt-0.5">{movement.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {movement.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
                    <div className="flex gap-1 items-center text-xs text-gray-500">
                      {movement.members.slice(0, 3).map((name, idx) => (
                        <span key={idx}>{name}{idx < movement.members.length - 1 && ','} </span>
                      ))}
                      {movement.members.length > 3 && <span>+{movement.members.length - 3} more</span>}
                    </div>
                    <Button
                      size="sm"
                      className="bg-closetx-teal text-white font-semibold px-4"
                      onClick={() => handleJoin(movement)}
                    >
                      Join <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Join Movement Dialog (incl. outfit generator / try-on) */}
        {joiningMovement && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setJoiningMovement(null)}>
            <div className="bg-white rounded-2xl px-7 py-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-1"
                onClick={() => setJoiningMovement(null)}
                aria-label="Close"
              >✕</button>
              <h2 className="font-black text-xl mb-1 text-gray-900 text-center">{joiningMovement.title}</h2>
              <p className="text-gray-600 mb-4 text-center">{joiningMovement.description}</p>
              <div className="flex flex-col items-center">
                <div className="relative w-36 h-48 mb-3">
                  <img
                    src={joiningMovement.outfitImage}
                    alt={"Outfit Suggestion"}
                    className="absolute w-full h-full object-cover rounded-lg z-10"
                  />
                </div>
                <span className="mb-2 text-gray-700 font-semibold text-sm">Try on the trending outfit for this movement</span>
                <VirtualTryOnDialog
                  itemImage={joiningMovement.outfitImage}
                  itemName={joiningMovement.title}
                />
                <Button
                  className="mt-5 w-full bg-closetx-teal"
                  onClick={() => {
                    toast.success("You joined the movement! Outfit suggestion saved.");
                    setJoiningMovement(null);
                  }}
                >
                  Confirm & Join Movement
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Marketplace;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OutfitSuggestion, { OutfitType } from '@/components/Wardrobe/OutfitSuggestion';
import PersonalizedOutfit from '@/components/Personalization/PersonalizedOutfit';
import AppLayout from '@/components/Layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Calendar, Star, ArrowRight, Users } from 'lucide-react';
import OutfitGenerator from '@/components/OutfitGenerator/OutfitGenerator';
import MarketplacePreview from '@/components/Marketplace/MarketplacePreview';
import WardrobeSharing from '@/components/Sharing/WardrobeSharing';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import StarRating from '@/components/UI/StarRating';

// Sample data
const mockWeather = {
  temp: 28,
  condition: 'Sunny',
};

const mockWardrobe: ClothingItemType[] = [
  {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'Tops',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    season: ['Spring', 'Summer', 'Fall'],
    brand: 'Zara'
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['All Season'],
    brand: 'Levi\'s'
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'Outerwear',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['Fall', 'Winter'],
    brand: 'H&M'
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'Footwear',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    season: ['All Season'],
    brand: 'Nike'
  },
];

const mockOutfits: OutfitType[] = [
  {
    id: '1',
    title: 'Today\'s Perfect Outfit',
    occasion: 'Work Meeting',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    items: [
      {
        id: '101',
        name: 'White Button-up Shirt',
        category: 'Top',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        season: ['Spring', 'Summer', 'Fall'],
      },
      {
        id: '102',
        name: 'Navy Trousers',
        category: 'Bottom',
        color: 'Navy',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        season: ['All Season'],
      },
      {
        id: '103',
        name: 'Leather Loafers',
        category: 'Footwear',
        color: 'Brown',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        season: ['All Season'],
      }
    ]
  },
  {
    id: '2',
    title: 'Evening Casual',
    occasion: 'Dinner with Friends',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    items: [
      {
        id: '104',
        name: 'Casual T-shirt',
        category: 'Top',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        season: ['Spring', 'Summer'],
      },
      {
        id: '105',
        name: 'Jeans',
        category: 'Bottom',
        color: 'Blue',
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        season: ['All Season'],
      },
      {
        id: '106',
        name: 'Sneakers',
        category: 'Footwear',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        season: ['All Season'],
      }
    ]
  },
];

const mockEvents = [
  { id: '1', title: 'Meeting with Design Team', time: '10:00 AM' },
  { id: '2', title: 'Lunch with Client', time: '1:00 PM' },
];

const Home = () => {
  const navigate = useNavigate();
  const [events] = useState(mockEvents);
  const [outfits] = useState(mockOutfits);
  const [personalPreferences] = useState({
    favoriteColors: ['Blue', 'Teal', 'Beige'],
    stylePersonality: ['Professional', 'Creative', 'Casual'],
    recentlyWorn: ['White Shirt', 'Blue Jeans'],
    matchScore: 4.5
  });

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <AppLayout weather={mockWeather}>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium text-closetx-teal">Hello, Priya!</p>
            <p className="text-sm text-gray-600">{formatDate()}</p>
          </div>
          <div className="flex items-center">
            <StarRating rating={personalPreferences.matchScore} size={18} />
            <span className="text-xs text-gray-500 ml-1">Style Match</span>
          </div>
        </div>
      </div>

      <section className="mb-8 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4">Today's Perfect Outfit</h2>
        <PersonalizedOutfit 
          outfit={outfits[0]}
          personalityTraits={personalPreferences.stylePersonality}
          matchScore={personalPreferences.matchScore}
          onClick={() => navigate(`/outfit/${outfits[0].id}`)}
          className="mb-4"
        />
        <div className="mt-4">
          <OutfitGenerator wardrobe={mockWardrobe} />
        </div>
      </section>

      <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <Button variant="ghost" className="p-1 text-closetx-teal">
            <Calendar size={18} />
          </Button>
        </div>
        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex justify-between">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">No events today</p>
        )}
      </section>

      <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <MarketplacePreview />
      </section>

      <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col gap-4">
          <WardrobeSharing />
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="w-full flex gap-2"
          >
            <Star size={16} />
            Discover Sustainable Fashion
            <ArrowRight size={16} className="ml-auto" />
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;

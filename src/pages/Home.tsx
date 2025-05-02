import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OutfitSuggestion, { OutfitType } from '@/components/Wardrobe/OutfitSuggestion';
import PersonalizedOutfit from '@/components/Personalization/PersonalizedOutfit';
import AppLayout from '@/components/Layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Calendar, Star, ArrowRight, Users, Grid3x3, ListOrdered } from 'lucide-react';
import OutfitGenerator from '@/components/OutfitGenerator/OutfitGenerator';
import MarketplacePreview from '@/components/Marketplace/MarketplacePreview';
import WardrobeSharing from '@/components/Sharing/WardrobeSharing';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import StarRating from '@/components/UI/StarRating';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import Stories from '@/components/Social/Stories';
import Feed from '@/components/Social/Feed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CameraCapture from '@/components/Camera/CameraCapture';
import { toast } from 'sonner';

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
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
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
    thumbnail: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
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
  {
    id: '3',
    title: 'Weekend Brunch',
    occasion: 'Casual Outing',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    items: [
      {
        id: '107',
        name: 'Summer Dress',
        category: 'Dress',
        color: 'Floral',
        image: 'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9',
        season: ['Spring', 'Summer'],
      },
      {
        id: '108',
        name: 'Sandals',
        category: 'Footwear',
        color: 'Tan',
        image: 'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9',
        season: ['Summer'],
      }
    ]
  },
  {
    id: '4',
    title: 'Outdoor Adventure',
    occasion: 'Weekend Getaway',
    thumbnail: 'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9',
    items: [
      {
        id: '109',
        name: 'Hiking Shirt',
        category: 'Top',
        color: 'Green',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
        season: ['Spring', 'Summer', 'Fall'],
      },
      {
        id: '110',
        name: 'Cargo Pants',
        category: 'Bottom',
        color: 'Khaki',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
        season: ['All Season'],
      }
    ]
  }
];

const mockEvents = [
  { id: '1', title: 'Meeting with Design Team', time: '10:00 AM' },
  { id: '2', title: 'Lunch with Client', time: '1:00 PM' },
];

const Home = () => {
  const navigate = useNavigate();
  const [events] = useState(mockEvents);
  const [outfits] = useState(mockOutfits);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('list');
  const [showCamera, setShowCamera] = useState(false);
  const [activeTab, setActiveTab] = useState<'for-you' | 'feed'>('for-you');
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
  
  const handleCapture = (imageSrc: string) => {
    setShowCamera(false);
    toast.success("Story created successfully!");
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
            <StarRating rating={personalPreferences.matchScore} size={18} animated={true} />
            <span className="text-xs text-gray-500 ml-1">Style Match</span>
          </div>
        </div>
      </div>
      
      {/* Stories Section */}
      <section className="mb-6">
        <Stories 
          onCreateStory={() => setShowCamera(true)}
          className="animate-fade-in"
        />
      </section>

      {/* Main Content Tabs */}
      <Tabs 
        defaultValue="for-you" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'for-you' | 'feed')}
        className="animate-fade-in"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="for-you" className="space-y-8">
          <section className="animate-fade-in">
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
          
          <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Other Outfit Suggestions</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(displayMode === 'grid' && "text-closetx-teal")}
                  onClick={() => setDisplayMode('grid')}
                >
                  <Grid3x3 size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(displayMode === 'list' && "text-closetx-teal")}
                  onClick={() => setDisplayMode('list')}
                >
                  <ListOrdered size={16} />
                </Button>
              </div>
            </div>
            
            <Carousel>
              <CarouselContent>
                {outfits.slice(1).map((outfit) => (
                  <CarouselItem key={outfit.id} className="md:basis-1/2 lg:basis-1/3">
                    <PersonalizedOutfit 
                      outfit={outfit}
                      personalityTraits={personalPreferences.stylePersonality.slice(0, 2)}
                      matchScore={3.5 + Math.random() * 1.5}
                      onClick={() => navigate(`/outfit/${outfit.id}`)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative inset-0 translate-y-0 mr-2" />
                <CarouselNext className="relative inset-0 translate-y-0 ml-2" />
              </div>
            </Carousel>
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
        </TabsContent>
        
        <TabsContent value="feed">
          <Feed />
        </TabsContent>
      </Tabs>
      
      {showCamera && (
        <CameraCapture 
          onCapture={handleCapture} 
          onClose={() => setShowCamera(false)}
        />
      )}
    </AppLayout>
  );
};

export default Home;

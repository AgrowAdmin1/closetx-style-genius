
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import ClothingItem, { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TrendingCollections from '@/components/Collection/TrendingCollections';
import { Separator } from '@/components/ui/separator';
import WardrobeSharing from '@/components/Sharing/WardrobeSharing';
import FilterOptions from '@/components/Wardrobe/FilterOptions';
import { toast } from 'sonner';

// Sample data
const mockItems: ClothingItemType[] = [
  {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'Tops',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    season: ['Spring', 'Summer', 'Fall'],
    brand: 'Zara',
    condition: {
      isClean: true,
      isIroned: true,
      isUsed: false
    },
    isTrending: true
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['All Season'],
    brand: 'Levi\'s',
    condition: {
      isClean: true,
      isIroned: false,
      isUsed: true,
      lastWorn: '2 days ago'
    }
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'Outerwear',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['Fall', 'Winter'],
    brand: 'H&M',
    condition: {
      isClean: false,
      isIroned: false,
      isUsed: true,
      lastWorn: 'Yesterday'
    }
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'Footwear',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    season: ['All Season'],
    brand: 'Nike',
    condition: {
      isClean: false,
      isIroned: false,
      isUsed: true,
      lastWorn: '3 days ago'
    }
  },
  {
    id: '5',
    name: 'Red Summer Dress',
    category: 'Dresses',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['Summer'],
    brand: 'Mango',
    condition: {
      isClean: true,
      isIroned: true,
      isUsed: false
    },
    isTrending: true
  },
];

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories'];

const Wardrobe = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSeasons, setActiveSeasons] = useState<string[]>([]);
  const [showOnlyClean, setShowOnlyClean] = useState(false);
  const [showOnlyIroned, setShowOnlyIroned] = useState(false);
  const [items] = useState(mockItems);
  const [isRealtime, setIsRealtime] = useState(true);

  // Filter items based on selected criteria
  const filteredItems = items
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => !activeColor || item.color === activeColor)
    .filter(item => activeSeasons.length === 0 || item.season.some(s => activeSeasons.includes(s)))
    .filter(item => !showOnlyClean || (item.condition && item.condition.isClean))
    .filter(item => !showOnlyIroned || (item.condition && item.condition.isIroned));

  // Simulate real-time updates
  useEffect(() => {
    if (isRealtime) {
      const interval = setInterval(() => {
        // This would be replaced with actual real-time data fetching
        console.log("Checking for real-time updates...");
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [isRealtime]);

  const toggleRealtime = () => {
    setIsRealtime(!isRealtime);
    toast.success(isRealtime ? "Real-time updates paused" : "Real-time updates enabled");
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 mr-2">{items.length} items in your wardrobe</p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={toggleRealtime}
                className={isRealtime ? "bg-green-100" : ""}
              >
                {isRealtime ? "Real-time: ON" : "Real-time: OFF"}
              </Button>
            </div>
            <Button 
              className="bg-closetx-teal hover:bg-closetx-teal/90"
              onClick={() => navigate('/add-item')}
            >
              <Plus size={18} className="mr-1" />
              Add Item
            </Button>
          </div>

          <FilterOptions 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
            activeSeasons={activeSeasons}
            setActiveSeasons={setActiveSeasons}
            showOnlyClean={showOnlyClean}
            setShowOnlyClean={setShowOnlyClean}
            showOnlyIroned={showOnlyIroned}
            setShowOnlyIroned={setShowOnlyIroned}
            categories={categories}
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <ClothingItem 
                key={item.id} 
                item={item} 
                onClick={() => navigate(`/item/${item.id}`)}
              />
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 mb-4">No items found with the selected filters</p>
                <Button 
                  className="bg-closetx-teal hover:bg-closetx-teal/90"
                  onClick={() => navigate('/add-item')}
                >
                  <Plus size={18} className="mr-1" />
                  Add Item
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <TrendingCollections />
          
          <Separator className="my-6" />
          
          <WardrobeSharing />
        </div>
      </div>
    </AppLayout>
  );
};

export default Wardrobe;

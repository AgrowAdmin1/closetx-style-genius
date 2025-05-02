import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, RefreshCw, Save, Star, ThumbsUp, ThumbsDown, Activity } from 'lucide-react';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import { toast } from 'sonner';

// Sample data - in a real app this would come from the user's wardrobe
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
  {
    id: '5',
    name: 'Red Summer Dress',
    category: 'Dresses',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['Summer'],
    brand: 'Mango'
  },
];

type OutfitType = {
  id: string;
  name: string;
  occasion: string;
  items: ClothingItemType[];
};

const OutfitGenerator = () => {
  const [occasion, setOccasion] = useState('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [outfitName, setOutfitName] = useState('');
  const [currentOutfit, setCurrentOutfit] = useState<OutfitType | null>(null);
  const [generatedOutfits, setGeneratedOutfits] = useState<OutfitType[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<OutfitType[]>([]);

  const occasions = ['casual', 'formal', 'work', 'date', 'party', 'workout'];

  const generateOutfit = () => {
    setIsGenerating(true);
    
    // Simulate AI outfit generation with a delay
    setTimeout(() => {
      // Simple algorithm - in a real app this would be more sophisticated
      const tops = mockWardrobe.filter(item => item.category === 'Tops' || item.category === 'Outerwear');
      const bottoms = mockWardrobe.filter(item => item.category === 'Bottoms');
      const footwear = mockWardrobe.filter(item => item.category === 'Footwear');
      const dresses = mockWardrobe.filter(item => item.category === 'Dresses');
      
      let outfit: ClothingItemType[] = [];
      
      // For occasion-specific logic
      if (occasion === 'formal') {
        // Prefer formal items
        const formalTop = tops.find(item => item.name.includes('Shirt')) || tops[0];
        if (formalTop) outfit.push(formalTop);
      } else if (occasion === 'workout') {
        // For workout, we might select athletic wear
      } else {
        // Default selection
        if (Math.random() > 0.3 && dresses.length > 0) {
          // Sometimes choose a dress
          const dress = dresses[Math.floor(Math.random() * dresses.length)];
          outfit.push(dress);
        } else {
          // Otherwise choose top and bottom
          const top = tops[Math.floor(Math.random() * tops.length)];
          const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
          if (top) outfit.push(top);
          if (bottom) outfit.push(bottom);
        }
      }
      
      // Add shoes
      if (footwear.length > 0) {
        const shoe = footwear[Math.floor(Math.random() * footwear.length)];
        outfit.push(shoe);
      }
      
      const newOutfit = {
        id: Date.now().toString(),
        name: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Outfit`,
        occasion: occasion,
        items: outfit,
      };
      
      setCurrentOutfit(newOutfit);
      setOutfitName(newOutfit.name);
      setGeneratedOutfits([newOutfit, ...generatedOutfits.slice(0, 4)]);
      setIsGenerating(false);
    }, 1500);
  };

  const saveOutfit = () => {
    if (currentOutfit) {
      const outfitToSave = {
        ...currentOutfit,
        name: outfitName || currentOutfit.name,
      };
      
      setSavedOutfits([outfitToSave, ...savedOutfits]);
      toast.success('Outfit saved to your collection!');
    }
  };

  const handleFeedback = (positive: boolean) => {
    toast.success(
      positive 
        ? 'Thanks! This helps improve your recommendations' 
        : 'Got it! We\'ll suggest different styles next time'
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Outfit Generator</h1>
          <Button variant="ghost" size="sm" className="text-closetx-teal">
            <Activity size={16} className="mr-1" />
            AI Style Analysis
          </Button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">What's the occasion?</label>
            <div className="flex flex-wrap gap-2">
              {occasions.map(o => (
                <Button 
                  key={o}
                  variant={occasion === o ? "default" : "outline"}
                  className={`text-xs ${occasion === o ? 'bg-closetx-teal' : ''}`}
                  onClick={() => setOccasion(o)}
                >
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 flex items-center">
              <Calendar size={16} className="mr-2" />
              When will you wear it?
            </label>
            <Input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <Button
            onClick={generateOutfit}
            className="w-full bg-closetx-teal"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Creating Your Outfit...
              </>
            ) : (
              <>
                <Star className="mr-2 h-5 w-5" />
                Generate Perfect Outfit
              </>
            )}
          </Button>
        </div>
        
        {currentOutfit && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <Input 
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="font-medium text-lg border-none p-0 h-auto focus-visible:ring-0"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleFeedback(true)}>
                  <ThumbsUp size={14} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleFeedback(false)}>
                  <ThumbsDown size={14} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {currentOutfit.items.map(item => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button
                className="flex-1"
                variant="outline"
                onClick={generateOutfit}
              >
                <RefreshCw size={16} className="mr-2" />
                Regenerate
              </Button>
              <Button
                className="flex-1 bg-closetx-teal"
                onClick={saveOutfit}
              >
                <Save size={16} className="mr-2" />
                Save Outfit
              </Button>
            </div>
          </div>
        )}
        
        {savedOutfits.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Saved Outfits</h2>
            <div className="space-y-3">
              {savedOutfits.map(outfit => (
                <div 
                  key={outfit.id}
                  className="bg-white rounded-lg p-3 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{outfit.name}</p>
                    <span className="text-xs bg-closetx-beige px-2 py-1 rounded-full">
                      {outfit.occasion}
                    </span>
                  </div>
                  <div className="flex overflow-x-auto gap-2 pb-2">
                    {outfit.items.map(item => (
                      <div key={item.id} className="w-14 h-14 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default OutfitGenerator;

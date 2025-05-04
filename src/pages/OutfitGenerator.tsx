import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, RefreshCw, Save, Star, ThumbsUp, ThumbsDown, Activity } from 'lucide-react';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import { toast } from 'sonner';

// Realistic clothing images by category
const realClothingImages = {
  tops: [
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  bottoms: [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  footwear: [
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  dresses: [
    "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596783074918-c84cb1bd5d44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  outerwear: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ]
};

// Helper function to get a realistic image for a clothing category
const getRealisticImage = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('top')) return realClothingImages.tops[Math.floor(Math.random() * realClothingImages.tops.length)];
  if (lowerCategory.includes('bottom') || lowerCategory.includes('pant') || lowerCategory.includes('jean')) 
    return realClothingImages.bottoms[Math.floor(Math.random() * realClothingImages.bottoms.length)];
  if (lowerCategory.includes('shoe') || lowerCategory.includes('footwear') || lowerCategory.includes('boot')) 
    return realClothingImages.footwear[Math.floor(Math.random() * realClothingImages.footwear.length)];
  if (lowerCategory.includes('dress')) 
    return realClothingImages.dresses[Math.floor(Math.random() * realClothingImages.dresses.length)];
  if (lowerCategory.includes('coat') || lowerCategory.includes('jacket') || lowerCategory.includes('outerwear')) 
    return realClothingImages.outerwear[Math.floor(Math.random() * realClothingImages.outerwear.length)];
  
  // Fallback to tops if category doesn't match
  return realClothingImages.tops[Math.floor(Math.random() * realClothingImages.tops.length)];
};

// Enhanced sample data with realistic images
const mockWardrobe: ClothingItemType[] = [
  {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'Tops',
    color: 'White',
    image: getRealisticImage('Tops'),
    season: ['Spring', 'Summer', 'Fall'],
    brand: 'Zara'
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    color: 'Blue',
    image: getRealisticImage('Bottoms'),
    season: ['All Season'],
    brand: 'Levi\'s'
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'Outerwear',
    color: 'Black',
    image: getRealisticImage('Outerwear'),
    season: ['Fall', 'Winter'],
    brand: 'H&M'
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'Footwear',
    color: 'White',
    image: getRealisticImage('Footwear'),
    season: ['All Season'],
    brand: 'Nike'
  },
  {
    id: '5',
    name: 'Red Summer Dress',
    category: 'Dresses',
    color: 'Red',
    image: getRealisticImage('Dresses'),
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
      // Enhanced algorithm to create more realistic outfits
      const tops = mockWardrobe.filter(item => item.category === 'Tops' || item.category === 'Outerwear');
      const bottoms = mockWardrobe.filter(item => item.category === 'Bottoms');
      const footwear = mockWardrobe.filter(item => item.category === 'Footwear');
      const dresses = mockWardrobe.filter(item => item.category === 'Dresses');
      const outerwear = mockWardrobe.filter(item => item.category === 'Outerwear');
      
      let outfit: ClothingItemType[] = [];
      
      // For occasion-specific logic
      if (occasion === 'formal') {
        // Prefer formal items
        const formalTop = tops.find(item => item.name.includes('Shirt')) || 
          {
            id: 'formal-top',
            name: 'Formal Shirt',
            category: 'Tops',
            color: 'White',
            image: getRealisticImage('Tops'),
            season: ['All Season'],
            brand: 'Designer Brand'
          };
          
        const formalBottom = {
          id: 'formal-bottom',
          name: 'Formal Slacks',
          category: 'Bottoms',
          color: 'Black',
          image: getRealisticImage('Bottoms'),
          season: ['All Season'],
          brand: 'Designer Brand'
        };
        
        const formalShoes = {
          id: 'formal-shoes',
          name: 'Leather Oxfords',
          category: 'Footwear',
          color: 'Black',
          image: getRealisticImage('Footwear'),
          season: ['All Season'],
          brand: 'Designer Brand'
        };
        
        outfit = [formalTop, formalBottom, formalShoes];
      } else if (occasion === 'workout') {
        // For workout, select athletic wear
        const athleticTop = {
          id: 'athletic-top',
          name: 'Performance Tee',
          category: 'Tops',
          color: 'Gray',
          image: getRealisticImage('Tops'),
          season: ['All Season'],
          brand: 'Athletic Brand'
        };
        
        const athleticBottom = {
          id: 'athletic-bottom',
          name: 'Athletic Shorts',
          category: 'Bottoms',
          color: 'Black',
          image: getRealisticImage('Bottoms'),
          season: ['All Season'],
          brand: 'Athletic Brand'
        };
        
        const athleticShoes = {
          id: 'athletic-shoes',
          name: 'Running Shoes',
          category: 'Footwear',
          color: 'Multi',
          image: getRealisticImage('Footwear'),
          season: ['All Season'],
          brand: 'Athletic Brand'
        };
        
        outfit = [athleticTop, athleticBottom, athleticShoes];
      } else {
        // For casual and other occasions
        if (Math.random() > 0.3 && dresses.length > 0 && ['date', 'party'].includes(occasion)) {
          // Sometimes choose a dress for date or party
          const dress = dresses[0] || {
            id: 'casual-dress',
            name: 'Casual Dress',
            category: 'Dresses',
            color: 'Blue',
            image: getRealisticImage('Dresses'),
            season: ['Spring', 'Summer'],
            brand: 'Fashion Brand'
          };
          
          const shoes = {
            id: 'casual-shoes',
            name: 'Casual Shoes',
            category: 'Footwear',
            color: 'Brown',
            image: getRealisticImage('Footwear'),
            season: ['All Season'],
            brand: 'Fashion Brand'
          };
          
          outfit = [dress, shoes];
        } else {
          // Otherwise choose top and bottom
          const casual = occasion === 'casual';
          const top = tops[0] || {
            id: 'top',
            name: casual ? 'Casual Tee' : 'Stylish Top',
            category: 'Tops',
            color: casual ? 'Gray' : 'Blue',
            image: getRealisticImage('Tops'),
            season: ['Spring', 'Summer', 'Fall'],
            brand: casual ? 'Everyday Brand' : 'Fashion Brand'
          };
          
          const bottom = bottoms[0] || {
            id: 'bottom',
            name: casual ? 'Jeans' : 'Stylish Pants',
            category: 'Bottoms',
            color: casual ? 'Blue' : 'Black',
            image: getRealisticImage('Bottoms'),
            season: ['All Season'],
            brand: casual ? 'Everyday Brand' : 'Fashion Brand'
          };
          
          const shoe = footwear[0] || {
            id: 'shoe',
            name: casual ? 'Sneakers' : 'Stylish Shoes',
            category: 'Footwear',
            color: casual ? 'White' : 'Brown',
            image: getRealisticImage('Footwear'),
            season: ['All Season'],
            brand: casual ? 'Everyday Brand' : 'Fashion Brand'
          };
          
          outfit = [top, bottom, shoe];
          
          // Sometimes add outerwear for certain seasons or occasions
          if (!casual || Math.random() > 0.7) {
            const jacket = outerwear[0] || {
              id: 'jacket',
              name: casual ? 'Casual Jacket' : 'Stylish Jacket',
              category: 'Outerwear',
              color: casual ? 'Blue' : 'Black',
              image: getRealisticImage('Outerwear'),
              season: ['Fall', 'Winter'],
              brand: casual ? 'Everyday Brand' : 'Fashion Brand'
            };
            
            outfit.push(jacket);
          }
        }
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


import React from 'react';
import { Card } from '@/components/ui/card';
import { ClothingItemType } from './ClothingItem';
import { Badge } from '@/components/ui/badge';
import { Shirt, Eye, Gem, Watch, Brush, Sunglasses, Palette, Scissors, Nail } from 'lucide-react';

export type StyleItemType = {
  id: string;
  name: string;
  category: string;
  image: string;
  brand?: string;
  price?: string;
};

export type OutfitType = {
  id: string;
  title: string;
  occasion: string;
  items: ClothingItemType[];
  thumbnail: string;
  styleElements?: {
    hairstyle?: StyleItemType;
    makeup?: StyleItemType;
    jewelry?: StyleItemType[];
    footwear?: StyleItemType;
    eyewear?: StyleItemType;
    nails?: StyleItemType;
  };
  designerNotes?: string;
  celebrityInspiration?: string;
};

type OutfitSuggestionProps = {
  outfit: OutfitType;
  onClick?: () => void;
  showFullDetails?: boolean;
};

const OutfitSuggestion: React.FC<OutfitSuggestionProps> = ({ 
  outfit, 
  onClick, 
  showFullDetails = false 
}) => {
  // Helper function to get the appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'eyewear':
      case 'glasses':
      case 'sunglasses':
        return <Sunglasses className="h-4 w-4 text-gray-500" />;
      case 'jewelry':
      case 'ring':
        return <Gem className="h-4 w-4 text-gray-500" />;
      case 'necklace':
      case 'watch':
      case 'bracelet':
        return <Watch className="h-4 w-4 text-gray-500" />;
      case 'makeup':
      case 'lipstick':
        return <Palette className="h-4 w-4 text-gray-500" />;
      case 'footwear':
      case 'shoe':
      case 'shoes':
      case 'boots':
        return <Shirt className="h-4 w-4 text-gray-500" />;
      case 'hairstyle':
      case 'hair':
        return <Scissors className="h-4 w-4 text-gray-500" />;
      case 'nails':
      case 'nail polish':
        return <Nail className="h-4 w-4 text-gray-500" />;
      default:
        return <Shirt className="h-4 w-4 text-gray-500" />;
    }
  };

  // Count all styling elements
  const hasExtraElements = outfit.styleElements && Object.values(outfit.styleElements).some(item => item);
  const isCelebrityInspired = outfit.celebrityInspiration && outfit.celebrityInspiration.length > 0;

  return (
    <Card 
      className={`closetx-card overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${showFullDetails ? '' : 'cursor-pointer'}`}
      onClick={!showFullDetails && onClick ? onClick : undefined}
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={outfit.thumbnail} 
            alt={outfit.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-medium">{outfit.title}</h3>
          <p className="text-white/80 text-sm">{outfit.occasion}</p>
          
          {isCelebrityInspired && (
            <Badge variant="secondary" className="mt-1 bg-closetx-teal/70 text-white text-xs">
              Inspired by {outfit.celebrityInspiration}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {outfit.items.map((item) => (
            <div key={item.id} className="w-10 h-10 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
            </div>
          ))}
        </div>
        
        {hasExtraElements && (
          <div className="border-t pt-2">
            <p className="text-xs font-medium mb-2">Complete Look Details:</p>
            <div className="flex flex-wrap gap-1">
              {outfit.styleElements?.hairstyle && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getCategoryIcon('hairstyle')}
                  {outfit.styleElements.hairstyle.name}
                </Badge>
              )}
              
              {outfit.styleElements?.makeup && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getCategoryIcon('makeup')}
                  {outfit.styleElements.makeup.name}
                </Badge>
              )}
              
              {outfit.styleElements?.eyewear && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getCategoryIcon('eyewear')}
                  {outfit.styleElements.eyewear.name}
                </Badge>
              )}
              
              {outfit.styleElements?.footwear && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getCategoryIcon('footwear')}
                  {outfit.styleElements.footwear.name}
                </Badge>
              )}
              
              {outfit.styleElements?.jewelry && outfit.styleElements.jewelry.map(item => (
                <Badge key={item.id} variant="outline" className="text-xs flex items-center gap-1">
                  {getCategoryIcon(item.category)}
                  {item.name}
                </Badge>
              ))}
              
              {outfit.styleElements?.nails && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getCategoryIcon('nails')}
                  {outfit.styleElements.nails.name}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {outfit.designerNotes && (
          <div className="text-xs italic text-gray-500 mt-2">
            "{outfit.designerNotes}"
          </div>
        )}
        
        {showFullDetails && hasExtraElements && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium text-sm mb-3">Full Styling Details</h4>
            <div className="grid grid-cols-2 gap-3">
              {outfit.styleElements?.hairstyle && (
                <div className="border rounded-md overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={outfit.styleElements.hairstyle.image}
                      alt={outfit.styleElements.hairstyle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="font-medium text-xs">{outfit.styleElements.hairstyle.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">Hairstyle</Badge>
                  </div>
                </div>
              )}
              
              {outfit.styleElements?.makeup && (
                <div className="border rounded-md overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={outfit.styleElements.makeup.image}
                      alt={outfit.styleElements.makeup.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="font-medium text-xs">{outfit.styleElements.makeup.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">Makeup</Badge>
                  </div>
                </div>
              )}
              
              {outfit.styleElements?.eyewear && (
                <div className="border rounded-md overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={outfit.styleElements.eyewear.image}
                      alt={outfit.styleElements.eyewear.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="font-medium text-xs">{outfit.styleElements.eyewear.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">Eyewear</Badge>
                  </div>
                </div>
              )}
              
              {outfit.styleElements?.nails && (
                <div className="border rounded-md overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={outfit.styleElements.nails.image}
                      alt={outfit.styleElements.nails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="font-medium text-xs">{outfit.styleElements.nails.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">Nails</Badge>
                  </div>
                </div>
              )}
              
              {outfit.styleElements?.jewelry && outfit.styleElements.jewelry.map((item) => (
                <div key={item.id} className="border rounded-md overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="font-medium text-xs">{item.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="outline" className="text-xs">Jewelry</Badge>
                      {item.brand && <span className="text-[10px] text-gray-500">{item.brand}</span>}
                    </div>
                    {item.price && <p className="text-[11px] mt-1 font-medium">{item.price}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OutfitSuggestion;

import React from 'react';
import { Card } from '@/components/ui/card';
import { ClothingItemType } from './ClothingItem';
import { Badge } from '@/components/ui/badge';
import { Shirt, Eye, Ring, Watch, Brush } from 'lucide-react';

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
};

const OutfitSuggestion: React.FC<OutfitSuggestionProps> = ({ outfit, onClick }) => {
  // Helper function to get the appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'eyewear':
        return <Eye className="h-4 w-4 text-gray-500" />;
      case 'jewelry':
      case 'ring':
        return <Ring className="h-4 w-4 text-gray-500" />;
      case 'necklace':
      case 'watch':
        return <Watch className="h-4 w-4 text-gray-500" />;
      case 'makeup':
      case 'lipstick':
        return <Brush className="h-4 w-4 text-gray-500" />;
      case 'footwear':
      case 'shoe':
        return <Shirt className="h-4 w-4 text-gray-500" />;
      case 'hairstyle':
        return <Brush className="h-4 w-4 text-gray-500" />;
      default:
        return <Shirt className="h-4 w-4 text-gray-500" />;
    }
  };

  // Count all styling elements
  const hasExtraElements = outfit.styleElements && Object.values(outfit.styleElements).some(item => item);
  const isCelebrityInspired = outfit.celebrityInspiration && outfit.celebrityInspiration.length > 0;

  return (
    <Card 
      className="closetx-card overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
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
        <div className="flex overflow-x-auto gap-2 pb-2">
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
          <div className="text-xs italic text-gray-500">
            "{outfit.designerNotes}"
          </div>
        )}
      </div>
    </Card>
  );
};

export default OutfitSuggestion;

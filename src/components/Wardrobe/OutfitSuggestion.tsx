
import React from 'react';
import { Card } from '@/components/ui/card';
import { ClothingItemType } from './ClothingItem';

export type OutfitType = {
  id: string;
  title: string;
  occasion: string;
  items: ClothingItemType[];
  thumbnail: string;
};

type OutfitSuggestionProps = {
  outfit: OutfitType;
  onClick?: () => void;
};

const OutfitSuggestion: React.FC<OutfitSuggestionProps> = ({ outfit, onClick }) => {
  return (
    <Card 
      className="closetx-card overflow-hidden"
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
        </div>
      </div>
      <div className="p-3 flex overflow-x-auto gap-2 pb-4">
        {outfit.items.map((item) => (
          <div key={item.id} className="w-10 h-10 flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OutfitSuggestion;


import React from 'react';
import { Card } from '@/components/ui/card';

export type ClothingItemType = {
  id: string;
  name: string;
  category: string;
  color: string;
  image: string;
  season: string[];
  brand?: string;
};

type ClothingItemProps = {
  item: ClothingItemType;
  onClick?: () => void;
};

const ClothingItem: React.FC<ClothingItemProps> = ({ item, onClick }) => {
  return (
    <Card 
      className="closetx-card overflow-hidden flex flex-col" 
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{item.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{item.category}</span>
          {item.brand && <span className="text-xs text-gray-500">{item.brand}</span>}
        </div>
      </div>
    </Card>
  );
};

export default ClothingItem;

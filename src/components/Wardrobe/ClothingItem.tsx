
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ItemStatus, { ClothingCondition } from '@/components/Collection/ItemStatus';
import StarRating from '@/components/UI/StarRating';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export type ClothingItemType = {
  id: string;
  name: string;
  category: string;
  color: string;
  image: string;
  season: string[];
  brand?: string;
  condition?: ClothingCondition;
  isTrending?: boolean;
  rating?: number;
  reviewCount?: number;
  price?: number;
};

type ClothingItemProps = {
  item: ClothingItemType;
  onClick?: () => void;
  showCartOption?: boolean;
};

const ClothingItem: React.FC<ClothingItemProps> = ({ 
  item, 
  onClick,
  showCartOption = false
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Added ${item.name} to cart`);
  };
  
  return (
    <Card 
      className="closetx-card overflow-hidden flex flex-col relative hover:shadow-md transition-all duration-300 cursor-pointer" 
      onClick={onClick}
    >
      {item.isTrending && (
        <Badge className="absolute top-2 right-2 bg-closetx-teal/90 z-10">
          Trending
        </Badge>
      )}
      
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={item.image || '/placeholder.svg'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        
        {/* Natural lighting overlay to enhance image appearance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        
        {/* Shopping cart button for marketplace items */}
        {showCartOption && item.price && (
          <Button 
            size="icon"
            variant="secondary"
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{item.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-600">{item.category}</span>
          {item.brand && <span className="text-xs text-gray-600 font-medium">{item.brand}</span>}
        </div>
        
        {item.rating && (
          <StarRating 
            rating={item.rating} 
            size={12} 
            readOnly 
            className="mt-1.5"
            showCount={true}
            reviewCount={item.reviewCount || 0}
          />
        )}
        
        {item.price && (
          <div className="mt-1.5 font-medium">
            ${item.price.toFixed(2)}
          </div>
        )}
        
        {item.condition && (
          <ItemStatus condition={item.condition} className="mt-2" />
        )}
      </div>
    </Card>
  );
};

export default ClothingItem;

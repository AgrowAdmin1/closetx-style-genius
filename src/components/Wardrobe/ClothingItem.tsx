
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ItemStatus, { ClothingCondition } from '@/components/Collection/ItemStatus';
import StarRating from '@/components/UI/StarRating';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const [showRating, setShowRating] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Added ${item.name} to cart`);
  };
  
  const handleRateItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRating(true);
  };
  
  const submitRating = () => {
    if (userRating > 0) {
      toast.success(`Thank you for rating ${item.name}!`);
      setShowRating(false);
    } else {
      toast.error("Please select a rating before submitting");
    }
  };
  
  return (
    <>
      <Card 
        className="closetx-card overflow-hidden flex flex-col relative transition-all duration-300 cursor-pointer" 
        onClick={onClick}
      >
        {item.isTrending && (
          <Badge className="absolute top-2 right-2 bg-closetx-teal z-10">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
          
          {/* Action buttons */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            {showCartOption && item.price && (
              <Button 
                size="icon"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
            
            {item.rating !== undefined && (
              <Button 
                size="icon"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleRateItem}
              >
                <Star className="h-4 w-4" />
              </Button>
            )}
          </div>
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
      
      {/* Rating Dialog */}
      <Dialog open={showRating} onOpenChange={setShowRating}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate this item</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center mb-4">
              <img 
                src={item.image || '/placeholder.svg'} 
                alt={item.name} 
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <h3 className="font-medium text-center mb-4">{item.name}</h3>
            <div className="flex justify-center mb-6">
              <StarRating 
                rating={userRating} 
                onRatingChange={setUserRating}
                readOnly={false}
                size={24}
                animated={true}
              />
            </div>
            <textarea 
              className="w-full border rounded p-2 mb-4" 
              placeholder="Add a review comment (optional)"
              rows={3}
            ></textarea>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRating(false)}>
                Cancel
              </Button>
              <Button className="bg-closetx-teal" onClick={submitRating}>
                Submit Rating
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClothingItem;

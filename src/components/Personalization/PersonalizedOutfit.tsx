
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OutfitType } from '@/components/Wardrobe/OutfitSuggestion';
import StarRating from '@/components/UI/StarRating';
import { User, Calendar, Tag, Heart, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PersonalizedOutfitProps {
  outfit: OutfitType;
  userName?: string;
  personalityTraits?: string[];
  matchScore?: number;
  onClick?: () => void;
  className?: string;
}

const PersonalizedOutfit: React.FC<PersonalizedOutfitProps> = ({
  outfit,
  userName = 'Priya',
  personalityTraits = ['Creative', 'Professional', 'Trendy'],
  matchScore = 4.5,
  onClick,
  className
}) => {
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    toast.success(liked ? 'Removed from favorites' : 'Added to favorites');
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Outfit shared with your friends!');
  };
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast.success(`You rated this outfit ${rating} stars!`);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 animate-fade-in", 
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-[16/9]">
          <img 
            src={outfit.thumbnail} 
            alt={outfit.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="outline"
            className={cn(
              "bg-white/80 backdrop-blur-sm rounded-full h-8 w-8",
              liked && "text-red-500"
            )}
            onClick={handleLike}
          >
            <Heart size={16} className={cn(liked && "fill-current")} />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm rounded-full h-8 w-8"
            onClick={handleShare}
          >
            <Share2 size={16} />
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-medium">{outfit.title}</h3>
          <div className="flex items-center gap-2 text-white/90 text-xs">
            <User size={12} /> 
            <span>Perfect for {userName}'s style</span>
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className="absolute top-3 left-3 bg-white/90 text-closetx-teal"
        >
          {outfit.occasion}
        </Badge>
      </div>
      
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <ThumbsUp size={14} className="text-closetx-teal" />
            <span className="text-sm font-medium">{matchScore * 20}% match</span>
          </div>
          <StarRating rating={matchScore} size={14} />
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {personalityTraits.map(trait => (
            <Badge 
              key={trait} 
              variant="secondary" 
              className="text-xs px-2 py-0.5 bg-closetx-beige text-closetx-charcoal"
            >
              {trait}
            </Badge>
          ))}
        </div>
        
        {!userRating && (
          <div className="mt-3 border-t pt-2">
            <p className="text-xs text-gray-500 mb-1">Rate this outfit:</p>
            <StarRating 
              rating={0} 
              readOnly={false} 
              onRatingChange={handleRating} 
              size={18} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedOutfit;

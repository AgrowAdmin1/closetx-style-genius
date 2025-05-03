
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OutfitType } from '@/components/Wardrobe/OutfitSuggestion';
import StarRating from '@/components/UI/StarRating';
import { User, Calendar, Tag, Heart, Share2, ThumbsUp, Baby, UserRound, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type AgeGroup = 'Gen Z' | 'Millennial' | 'Gen Alpha' | 'Gen Beta';
type Gender = 'Men' | 'Women' | 'Boys' | 'Girls' | 'Unisex';
type CulturePreference = 'Western' | 'Eastern' | 'Global' | 'Fusion' | 'Traditional' | 'Modern';

interface PersonalizedOutfitProps {
  outfit: OutfitType;
  userName?: string;
  personalityTraits?: string[];
  matchScore?: number;
  onClick?: () => void;
  className?: string;
  ageGroup?: AgeGroup;
  gender?: Gender;
  culturePreference?: CulturePreference;
}

// Natural outfit image URLs
const naturalOutfitImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  "https://images.unsplash.com/photo-1554412933-514a83d2f3c8",
  "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9"
];

const ageGroupColors = {
  'Gen Z': 'bg-purple-100 text-purple-800',
  'Millennial': 'bg-blue-100 text-blue-800',
  'Gen Alpha': 'bg-green-100 text-green-800',
  'Gen Beta': 'bg-amber-100 text-amber-800',
};

const genderIcons = {
  'Men': UserRound,
  'Women': UserRound, 
  'Boys': Baby,
  'Girls': Baby,
  'Unisex': Users
};

const PersonalizedOutfit: React.FC<PersonalizedOutfitProps> = ({
  outfit,
  userName = 'Priya',
  personalityTraits = ['Creative', 'Professional', 'Trendy'],
  matchScore = 4.5,
  onClick,
  className,
  ageGroup = 'Gen Z',
  gender = 'Women',
  culturePreference = 'Global'
}) => {
  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  
  // Get a natural image instead of the original one
  const getEnhancedOutfitImage = () => {
    // Use the outfit ID to consistently select the same image for the same outfit
    const index = parseInt(outfit.id) % naturalOutfitImages.length;
    return naturalOutfitImages[index] || outfit.thumbnail;
  };
  
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

  // Get the appropriate icon for the gender
  const GenderIcon = genderIcons[gender] || User;
  
  // Get age group color class
  const ageGroupColorClass = ageGroupColors[ageGroup] || 'bg-gray-100 text-gray-800';

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
            src={getEnhancedOutfitImage()} 
            alt={outfit.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
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
            <Heart size={16} className={cn(liked && "fill-current animate-pulse")} />
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
            <GenderIcon size={12} /> 
            <span>Perfect for {gender} • {ageGroup}</span>
          </div>
        </div>
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <Badge 
            variant="outline" 
            className="bg-white/90 text-closetx-teal"
          >
            {outfit.occasion}
          </Badge>
          
          <Badge 
            variant="outline" 
            className={cn("text-xs", ageGroupColorClass)}
          >
            {ageGroup}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <ThumbsUp size={14} className="text-closetx-teal" />
            <span className="text-sm font-medium">{matchScore * 20}% match</span>
          </div>
          <StarRating rating={matchScore} size={14} animated={true} />
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {personalityTraits.map(trait => (
            <Badge 
              key={trait} 
              variant="secondary" 
              className="text-xs px-2 py-0.5 bg-closetx-beige text-closetx-charcoal hover:bg-closetx-teal/20 transition-colors"
            >
              {trait}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
          <Globe size={12} />
          <span>{culturePreference} style</span>
        </div>
        
        {!userRating && (
          <div className="mt-3 border-t pt-2">
            <p className="text-xs text-gray-500 mb-1">Rate this outfit:</p>
            <StarRating 
              rating={0} 
              readOnly={false} 
              onRatingChange={handleRating} 
              size={18} 
              animated={true}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedOutfit;

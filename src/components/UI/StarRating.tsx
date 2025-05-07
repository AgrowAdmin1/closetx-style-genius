
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  onRatingChange?: (newRating: number) => void;
  readOnly?: boolean;
  animated?: boolean;
  showCount?: boolean;
  reviewCount?: number;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  className,
  onRatingChange,
  readOnly = true,
  animated = false,
  showCount = false,
  reviewCount = 0
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const filled = i <= (hoverRating !== null ? hoverRating : rating);
      stars.push(
        <button
          key={i}
          type="button"
          className={cn(
            "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110",
            animated && "animate-scale-in",
            animated && filled && "animate-pulse"
          )}
          onClick={() => !readOnly && onRatingChange?.(i)}
          onMouseEnter={() => !readOnly && setHoverRating(i)}
          onMouseLeave={() => !readOnly && setHoverRating(null)}
          disabled={readOnly}
          aria-label={`Rate ${i} out of ${maxRating}`}
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <Star 
            size={size} 
            className={cn(
              "transition-colors",
              filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
              !readOnly && filled && "drop-shadow-md"
            )}
          />
        </button>
      );
    }
    
    return stars;
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {renderStars()}
      {!readOnly && (
        <span className={cn(
          "text-xs text-gray-500 ml-2",
          hoverRating !== null && "text-yellow-600 font-medium"
        )}>
          {hoverRating || rating}/{maxRating}
        </span>
      )}
      {showCount && reviewCount > 0 && (
        <Badge variant="outline" className="ml-2 text-xs font-normal">
          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </Badge>
      )}
    </div>
  );
};

export default StarRating;

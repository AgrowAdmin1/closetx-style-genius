
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  onRatingChange?: (newRating: number) => void;
  readOnly?: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  className,
  onRatingChange,
  readOnly = true
}) => {
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const filled = i <= rating;
      stars.push(
        <button
          key={i}
          type="button"
          className={cn(
            "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
          )}
          onClick={() => !readOnly && onRatingChange?.(i)}
          disabled={readOnly}
          aria-label={`Rate ${i} out of ${maxRating}`}
        >
          <Star 
            size={size} 
            className={cn(
              "transition-colors",
              filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
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
        <span className="text-xs text-gray-500 ml-2">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;

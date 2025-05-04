
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ShoppingCart, Tag, Star, TrendingUp, MessageSquare } from 'lucide-react';
import SocialActions, { CommentType } from './SocialActions';
import { ClothingCondition } from '@/components/Collection/ItemStatus';
import { Badge } from '@/components/ui/badge';
import { Droplets, Wind } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

export type ClothingItemDetail = {
  id: string;
  name: string;
  brand: string;
  price?: string;
  condition?: ClothingCondition;
  trend?: 'rising' | 'stable' | 'falling';
  rating?: number;
  reviewCount?: number;
  coordinates?: { x1: number; y1: number; x2: number; y2: number };
};

export type FeedPostType = {
  id: string;
  userName: string;
  userAvatar?: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  location?: string;
  likes: number;
  comments: CommentType[];
  saved?: boolean;
  outfitDetails?: ClothingItemDetail[];
  zone?: string;
};

interface FeedPostProps {
  post: FeedPostType;
  onPostClick?: (postId: string) => void;
  className?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, onPostClick, className }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const formatPostTime = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - postDate.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minutes ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs} hours ago`;
    } else {
      return `${Math.floor(diffHrs / 24)} days ago`;
    }
  };
  
  const handleAddToCart = (itemId: string) => {
    const item = post.outfitDetails?.find(item => item.id === itemId);
    if (item) {
      toast.success(`Added ${item.name} to cart`);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={post.userAvatar} alt={post.userName} />
              <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.userName}</p>
              {post.location && (
                <p className="text-xs text-gray-500">{post.location}</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <div 
        className="aspect-square overflow-hidden cursor-pointer relative"
        onClick={() => onPostClick && onPostClick(post.id)}
      >
        <img 
          src={post.imageUrl} 
          alt={`${post.userName}'s post`} 
          className="w-full h-full object-cover"
        />
        
        {post.zone && (
          <Badge className="absolute top-3 right-3 bg-closetx-teal/90">
            {post.zone} Zone
          </Badge>
        )}
        
        {post.outfitDetails?.map(item => (
          item.coordinates && (
            <div 
              key={item.id}
              className="absolute border-2 border-closetx-teal/60 cursor-pointer transition-all duration-300 hover:bg-closetx-teal/20"
              style={{ 
                top: `${item.coordinates.y1}%`, 
                left: `${item.coordinates.x1}%`, 
                width: `${item.coordinates.x2 - item.coordinates.x1}%`, 
                height: `${item.coordinates.y2 - item.coordinates.y1}%`,
                opacity: hoveredItem === item.id ? 1 : 0.3,
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={(e) => {
                e.stopPropagation();
                toast.info(`Viewing ${item.name} details`);
              }}
            >
              {hoveredItem === item.id && (
                <div className="absolute -top-16 left-0 bg-white p-2 rounded-md shadow-md z-10 min-w-[150px]">
                  <p className="font-medium text-xs">{item.name}</p>
                  <p className="text-xs text-gray-700">{item.brand}</p>
                  {item.price && <p className="text-xs font-semibold">{item.price}</p>}
                  {item.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs">{item.rating} ({item.reviewCount || 0})</span>
                    </div>
                  )}
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="w-full mt-1 h-6 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item.id);
                    }}
                  >
                    <ShoppingCart size={10} className="mr-1" /> Add to Cart
                  </Button>
                </div>
              )}
            </div>
          )
        ))}
      </div>
      
      <CardContent className="p-4">
        <SocialActions 
          postId={post.id}
          initialLikes={post.likes}
          initialComments={post.comments}
          initialSaved={post.saved}
        />
        
        <div className="mt-3">
          <p className="text-sm">
            <span className="font-medium">{post.userName}</span>{" "}
            {post.caption}
          </p>
          
          <p className="text-xs text-gray-500 mt-1">
            {formatPostTime(post.timestamp)}
          </p>
        </div>
      </CardContent>
      
      {post.outfitDetails && post.outfitDetails.length > 0 && (
        <CardFooter className="px-4 py-3 border-t text-xs border-gray-100">
          <div className="w-full">
            <p className="font-medium text-xs mb-1">Outfit Details</p>
            <div className="space-y-2">
              {post.outfitDetails.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p>{item.name} - <span className="text-gray-500">{item.brand}</span></p>
                    {item.trend && (
                      <TrendingUp size={12} className={item.trend === 'rising' ? 'text-green-500' : 'text-gray-400'} />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.price && (
                      <Badge variant="outline" className="text-xs font-medium">
                        {item.price}
                      </Badge>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-6 text-xs"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <ShoppingCart size={12} className="mr-1" /> Add
                    </Button>
                  </div>
                  
                  {item.condition && (
                    <TooltipProvider>
                      <div className="flex items-center gap-1">
                        {!item.condition.isClean && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center">
                                <Droplets size={12} />
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Needs washing</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        {!item.condition.isIroned && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                                <Wind size={12} />
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Needs ironing</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TooltipProvider>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeedPost;


import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import SocialActions, { CommentType } from './SocialActions';

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
  outfitDetails?: Array<{
    id: string;
    name: string;
    brand: string;
  }>;
};

interface FeedPostProps {
  post: FeedPostType;
  onPostClick?: (postId: string) => void;
  className?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, onPostClick, className }) => {
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
        className="aspect-square overflow-hidden cursor-pointer"
        onClick={() => onPostClick && onPostClick(post.id)}
      >
        <img 
          src={post.imageUrl} 
          alt={`${post.userName}'s post`} 
          className="w-full h-full object-cover"
        />
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
          <div>
            <p className="font-medium text-xs mb-1">Outfit Details</p>
            <div className="space-y-0.5">
              {post.outfitDetails.map(item => (
                <p key={item.id}>{item.name} - <span className="text-gray-500">{item.brand}</span></p>
              ))}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeedPost;

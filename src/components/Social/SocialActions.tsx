
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type SocialActionsProps = {
  postId: string;
  initialLikes?: number;
  initialComments?: CommentType[];
  initialSaved?: boolean;
  onLike?: (postId: string, liked: boolean) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string, saved: boolean) => void;
  className?: string;
};

export type CommentType = {
  id: string;
  userName: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
};

const SocialActions: React.FC<SocialActionsProps> = ({
  postId,
  initialLikes = 0,
  initialComments = [],
  initialSaved = false,
  onLike,
  onComment,
  onShare,
  onSave,
  className
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [saved, setSaved] = useState(initialSaved);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikes(prev => newLikedState ? prev + 1 : Math.max(prev - 1, 0));
    
    if (onLike) {
      onLike(postId, newLikedState);
    }
    
    toast.success(newLikedState ? "Added to your likes" : "Removed from likes");
  };
  
  const handleShare = () => {
    if (onShare) {
      onShare(postId);
    }
    
    toast.success("Shared with your friends!");
  };
  
  const handleSave = () => {
    const newSavedState = !saved;
    setSaved(newSavedState);
    
    if (onSave) {
      onSave(postId, newSavedState);
    }
    
    toast.success(newSavedState ? "Added to saved items" : "Removed from saved items");
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const comment: CommentType = {
      id: `comment-${Date.now()}`,
      userName: "You",
      userAvatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      text: newComment,
      timestamp: new Date().toISOString()
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
    
    if (onComment) {
      onComment(postId, newComment);
    }
    
    toast.success("Comment added!");
  };
  
  const formatCommentTime = (timestamp: string) => {
    const commentDate = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - commentDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return `${Math.floor(diffMins / 1440)}d ago`;
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1 px-2",
              liked && "text-red-500"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-5 w-5", liked && "fill-current")} />
            <span>{likes > 0 ? likes : ""}</span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-2"
                onClick={() => setShowComments(!showComments)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{comments.length > 0 ? comments.length : ""}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Comments</h3>
                </div>
                
                <form onSubmit={handleSubmitComment} className="p-4 border-b">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Your avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-closetx-teal text-sm"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="ghost"
                      size="sm"
                      className="text-closetx-teal"
                      disabled={!newComment.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </form>
                
                {comments.length > 0 ? (
                  <div className="divide-y">
                    {comments.map((comment) => (
                      <div key={comment.id} className="p-4">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                            <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                              <h4 className="font-medium text-sm">{comment.userName}</h4>
                              <span className="text-xs text-gray-500">{formatCommentTime(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 text-sm">No comments yet</p>
                    <p className="text-gray-500 text-xs mt-1">Be the first to leave a comment!</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1 px-2",
            saved && "text-closetx-teal"
          )}
          onClick={handleSave}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-5 w-5"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default SocialActions;

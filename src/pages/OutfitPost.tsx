
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SocialActions from '@/components/Social/SocialActions';
import { FeedPostType } from '@/components/Social/FeedPost';
import { Separator } from '@/components/ui/separator';

// Mock post data (in a real app this would come from an API)
const mockPost: FeedPostType = {
  id: '1',
  userName: 'Priya',
  userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
  imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  caption: 'Perfect outfit for today\'s meeting. Feeling confident and professional! #workstyle #professionaloutfit #ootd',
  timestamp: '2025-05-02T11:30:00.000Z',
  location: 'Mumbai',
  likes: 24,
  comments: [
    {
      id: 'c1',
      userName: 'Meera',
      userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      text: 'Love this look! Where is the blazer from?',
      timestamp: '2025-05-02T12:00:00.000Z'
    },
    {
      id: 'c2',
      userName: 'Riya',
      userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      text: 'So professional! 👔',
      timestamp: '2025-05-02T12:15:00.000Z'
    }
  ],
  outfitDetails: [
    {
      id: 'od1',
      name: 'Navy Blazer',
      brand: 'Zara'
    },
    {
      id: 'od2',
      name: 'White Button-up',
      brand: 'H&M'
    },
    {
      id: 'od3',
      name: 'Tailored Trousers',
      brand: 'Mango'
    }
  ]
};

const OutfitPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the post data based on postId
  const post = mockPost;
  
  const formatPostDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppLayout>
      <div className="mb-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold ml-2">Outfit Post</h1>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.userAvatar} alt={post.userName} />
            <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.userName}</p>
            {post.location && (
              <p className="text-xs text-gray-500">{post.location}</p>
            )}
          </div>
        </div>
        
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={`${post.userName}'s post`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <Card>
          <CardContent className="p-4">
            <SocialActions 
              postId={post.id}
              initialLikes={post.likes}
              initialComments={post.comments}
            />
            
            <div className="mt-4">
              <p className="text-sm mb-2">
                <span className="font-medium">{post.userName}</span>{" "}
                {post.caption}
              </p>
              
              <p className="text-xs text-gray-500">
                {formatPostDate(post.timestamp)}
              </p>
            </div>
          </CardContent>
          
          {post.outfitDetails && post.outfitDetails.length > 0 && (
            <>
              <Separator />
              
              <CardFooter className="p-4">
                <div className="w-full">
                  <h3 className="font-semibold mb-3">Outfit Details</h3>
                  <div className="space-y-2">
                    {post.outfitDetails.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <p>{item.name}</p>
                        <p className="text-gray-500">{item.brand}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      Shop This Look
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Comments</h3>
          {post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="font-medium text-sm">{comment.userName}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No comments yet</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default OutfitPost;

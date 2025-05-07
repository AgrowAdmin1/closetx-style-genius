
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ClothingCondition } from '@/components/Collection/ItemStatus';

type StoryItem = {
  id: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  createdAt: string;
  isViewed: boolean;
  zone?: string;
  outfitCondition?: {
    needsWashing: boolean;
    needsIroning: boolean;
  };
};

const mockStories: StoryItem[] = [
  {
    id: '1',
    userName: 'Priya',
    userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    createdAt: '2025-05-02T10:00:00.000Z',
    isViewed: false,
    zone: 'Mumbai',
    outfitCondition: {
      needsWashing: false,
      needsIroning: false
    }
  },
  {
    id: '2',
    userName: 'Meera',
    userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    imageUrl: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
    createdAt: '2025-05-02T09:30:00.000Z',
    isViewed: false,
    zone: 'Delhi',
    outfitCondition: {
      needsWashing: true,
      needsIroning: false
    }
  },
  {
    id: '3',
    userName: 'Ananya',
    userAvatar: 'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    createdAt: '2025-05-02T08:45:00.000Z',
    isViewed: false,
    zone: 'Bangalore',
    outfitCondition: {
      needsWashing: false,
      needsIroning: true
    }
  },
  {
    id: '4',
    userName: 'Riya',
    userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    createdAt: '2025-05-01T22:15:00.000Z',
    isViewed: false,
    zone: 'Chennai',
    outfitCondition: {
      needsWashing: true,
      needsIroning: true
    }
  },
  {
    id: '5',
    userName: 'Sara',
    userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    imageUrl: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
    createdAt: '2025-05-01T20:30:00.000Z',
    isViewed: false,
    zone: 'Hyderabad'
  },
];

interface StoriesProps {
  className?: string;
  onCreateStory?: () => void;
}

const Stories: React.FC<StoriesProps> = ({ className, onCreateStory }) => {
  const [stories, setStories] = useState<StoryItem[]>(mockStories);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const storyContainerRef = useRef<HTMLDivElement>(null);
  
  const handleStoryView = (story: StoryItem) => {
    setActiveStory(story);
    
    // Mark story as viewed
    setStories(prevStories => 
      prevStories.map(s => 
        s.id === story.id ? { ...s, isViewed: true } : s
      )
    );
    
    toast(`Viewing ${story.userName}'s outfit story`);
  };
  
  const handleScrollLeft = () => {
    if (storyContainerRef.current) {
      storyContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const handleScrollRight = () => {
    if (storyContainerRef.current) {
      storyContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  const handleCreateStory = () => {
    if (onCreateStory) {
      onCreateStory();
    } else {
      toast.info("Create story feature coming soon!");
    }
  };
  
  const closeActiveStory = () => {
    setActiveStory(null);
  };

  // Format time for stories (e.g., "2h ago")
  const formatStoryTime = (dateString: string) => {
    const storyDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - storyDate.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      return 'Just now';
    } else if (diffHrs < 24) {
      return `${diffHrs}h ago`;
    } else {
      return `${Math.floor(diffHrs / 24)}d ago`;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Active Story Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={closeActiveStory}>
          <div className="relative w-full max-w-sm h-[80vh]" onClick={e => e.stopPropagation()}>
            <img 
              src={activeStory.imageUrl} 
              alt={`${activeStory.userName}'s story`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center">
              <Avatar className="h-10 w-10 border-2 border-closetx-teal">
                <AvatarImage src={activeStory.userAvatar} alt={activeStory.userName} />
                <AvatarFallback>{activeStory.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-2 text-white">
                <p className="font-medium">{activeStory.userName}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs opacity-80">{formatStoryTime(activeStory.createdAt)}</p>
                  {activeStory.zone && (
                    <Badge className="bg-closetx-teal/90 text-[10px] h-4">{activeStory.zone}</Badge>
                  )}
                </div>
              </div>
            </div>
            
            {activeStory.outfitCondition && (
              <div className="absolute top-4 right-4 flex gap-1">
                <TooltipProvider>
                  {activeStory.outfitCondition.needsWashing && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="destructive" className="bg-opacity-80">Needs Washing</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This outfit needs to be washed</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {activeStory.outfitCondition.needsIroning && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="bg-opacity-80">Needs Ironing</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This outfit needs to be ironed</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm">Tap to view next story</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Story Navigation Buttons */}
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none shadow-md rounded-full h-8 w-8" 
        onClick={handleScrollLeft}
      >
        <ChevronLeft size={18} />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none shadow-md rounded-full h-8 w-8" 
        onClick={handleScrollRight}
      >
        <ChevronRight size={18} />
      </Button>
      
      {/* Stories Container */}
      <div 
        ref={storyContainerRef} 
        className="flex space-x-3 overflow-x-auto scrollbar-hide py-2 px-1 -mx-1 mt-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Create Story Button */}
        <div className="flex-shrink-0">
          <Card className="w-20 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200" onClick={handleCreateStory}>
            <div className="aspect-[3/5] flex flex-col items-center justify-center bg-gray-100">
              <div className="mb-1 bg-closetx-teal rounded-full p-2">
                <Plus size={16} className="text-white" />
              </div>
              <p className="text-xs text-center px-1">Add Story</p>
            </div>
          </Card>
        </div>
        
        {/* Story Items */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <Card 
              className="w-20 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleStoryView(story)}
            >
              <div className="aspect-[3/5] relative">
                <img 
                  src={story.imageUrl}
                  alt={`${story.userName}'s story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                
                <div className={`absolute top-2 left-1/2 -translate-x-1/2 p-0.5 rounded-full ${story.isViewed ? 'bg-gray-400' : 'bg-gradient-to-tr from-closetx-teal to-blue-500'}`}>
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={story.userAvatar} alt={story.userName} />
                    <AvatarFallback>{story.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Status Indicators */}
                {story.outfitCondition && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {story.outfitCondition.needsWashing && (
                      <Badge variant="destructive" className="h-1.5 w-1.5 rounded-full p-0"></Badge>
                    )}
                    {story.outfitCondition.needsIroning && (
                      <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0"></Badge>
                    )}
                  </div>
                )}
                
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <p className="text-white text-xs font-medium">{story.userName}</p>
                  {story.zone && (
                    <p className="text-white/70 text-[10px]">{story.zone}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;

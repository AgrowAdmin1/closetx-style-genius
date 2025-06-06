
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedPost, { FeedPostType } from './FeedPost';
import { CommentType } from './SocialActions';
import { ClothingCondition } from '@/components/Collection/ItemStatus';

// Mock data for feed posts
const mockPosts: FeedPostType[] = [
  {
    id: '1',
    userName: 'Priya',
    userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    caption: 'Perfect outfit for today\'s meeting. Feeling confident! #workstyle #professionaloutfit',
    timestamp: '2025-05-02T11:30:00.000Z',
    location: 'Mumbai',
    likes: 24,
    zone: 'Trending',
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
        brand: 'Zara',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: true,
          lastWorn: 'Yesterday'
        }
      },
      {
        id: 'od2',
        name: 'White Button-up',
        brand: 'H&M',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: false
        }
      },
      {
        id: 'od3',
        name: 'Tailored Trousers',
        brand: 'Mango',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: true,
          lastWorn: '1 week ago'
        }
      }
    ]
  },
  {
    id: '2',
    userName: 'Ananya',
    userAvatar: 'https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    caption: 'Weekend brunch vibes ☕ #casualchic #weekendstyle',
    timestamp: '2025-05-02T09:15:00.000Z',
    location: 'Bangalore',
    likes: 31,
    comments: [
      {
        id: 'c3',
        userName: 'Sara',
        userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        text: 'This dress looks amazing on you!',
        timestamp: '2025-05-02T09:45:00.000Z'
      }
    ],
    outfitDetails: [
      {
        id: 'od4',
        name: 'Floral Midi Dress',
        brand: 'Forever 21',
        condition: {
          isClean: true,
          isIroned: false,
          isUsed: false
        }
      },
      {
        id: 'od5',
        name: 'Straw Hat',
        brand: 'Urban Outfitters',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: true,
          lastWorn: '3 days ago'
        }
      },
      {
        id: 'od6',
        name: 'Leather Sandals',
        brand: 'Aldo',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: true,
          lastWorn: 'Today'
        }
      }
    ]
  },
  {
    id: '3',
    userName: 'Riya',
    userAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    imageUrl: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
    caption: 'Date night ready! What do you think of this look? #datenight #ootd',
    timestamp: '2025-05-01T19:30:00.000Z',
    likes: 42,
    zone: 'Local',
    comments: [],
    outfitDetails: [
      {
        id: 'od7',
        name: 'Black Dress',
        brand: 'Zara',
        condition: {
          isClean: false,
          isIroned: false,
          isUsed: true,
          lastWorn: 'Yesterday'
        }
      },
      {
        id: 'od8',
        name: 'Statement Earrings',
        brand: 'H&M',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: true,
          lastWorn: '1 week ago'
        }
      },
      {
        id: 'od9',
        name: 'Leather Clutch',
        brand: 'Mango',
        condition: {
          isClean: true,
          isIroned: true,
          isUsed: false
        }
      }
    ]
  }
];

interface FeedProps {
  className?: string;
}

const Feed: React.FC<FeedProps> = ({ className }) => {
  const [posts] = useState<FeedPostType[]>(mockPosts);
  const navigate = useNavigate();
  
  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className={className}>
      <div className="space-y-6">
        {posts.map((post) => (
          <FeedPost 
            key={post.id}
            post={post}
            onPostClick={handlePostClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;

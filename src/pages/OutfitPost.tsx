
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import { ChevronLeft, ShoppingCart, Tag, Star, TrendingUp, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SocialActions from '@/components/Social/SocialActions';
import { ClothingItemDetail, FeedPostType } from '@/components/Social/FeedPost';
import { toast } from 'sonner';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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
      brand: 'Zara',
      price: '₹4,990',
      trend: 'rising',
      rating: 4.5,
      reviewCount: 128,
      coordinates: { x1: 25, y1: 15, x2: 75, y2: 50 }
    },
    {
      id: 'od2',
      name: 'White Button-up',
      brand: 'H&M',
      price: '₹1,299',
      rating: 4.2,
      reviewCount: 76,
      coordinates: { x1: 30, y1: 30, x2: 70, y2: 60 }
    },
    {
      id: 'od3',
      name: 'Tailored Trousers',
      brand: 'Mango',
      price: '₹2,999',
      trend: 'stable',
      rating: 4.0,
      reviewCount: 42,
      coordinates: { x1: 30, y1: 60, x2: 70, y2: 95 }
    }
  ]
};

const OutfitPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<ClothingItemDetail[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothingItemDetail | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
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
  
  const handleAddToCart = (item: ClothingItemDetail) => {
    setCart(prev => [...prev, item]);
    toast.success(`Added ${item.name} to cart`);
  };
  
  const handleViewItem = (item: ClothingItemDetail) => {
    setSelectedItem(item);
  };

  return (
    <AppLayout>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Outfit Post</h1>
        </div>
        
        {cart.length > 0 && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <ShoppingCart size={16} className="mr-2" /> {cart.length} items
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <p className="font-semibold">{item.price}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <p className="font-medium">Total</p>
                  <p className="font-semibold">
                    {cart.reduce((total, item) => {
                      const price = item.price ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 0;
                      return total + price;
                    }, 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </p>
                </div>
                <Button className="w-full mt-4 bg-closetx-teal">Checkout</Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setCart([])}
                >
                  Clear Cart
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        )}
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
        
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={`${post.userName}'s post`} 
            className="w-full h-full object-cover"
          />
          
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
                onClick={() => handleViewItem(item)}
              >
                {hoveredItem === item.id && (
                  <Badge className="absolute top-0 left-0 transform -translate-y-full bg-closetx-teal">
                    {item.name}
                  </Badge>
                )}
              </div>
            )
          ))}
        </div>
        
        <Card>
          <CardContent className="p-4">
            <SocialActions 
              postId={post.id}
              initialLikes={post.likes}
              initialComments={post.comments}
              className="mb-4"
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
                  <h3 className="font-semibold mb-3">AI-Detected Outfit Details</h3>
                  <div className="space-y-4">
                    {post.outfitDetails.map(item => (
                      <div key={item.id} className="p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Tag size={14} />
                              <span>{item.brand}</span>
                            </div>
                            {item.price && (
                              <p className="font-semibold mt-1">{item.price}</p>
                            )}
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-closetx-teal text-closetx-teal"
                            onClick={() => handleAddToCart(item)}
                          >
                            <ShoppingCart size={14} className="mr-1" /> Add to Cart
                          </Button>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {item.rating && (
                              <div className="flex items-center">
                                <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                                <span className="text-sm">{item.rating}</span>
                                {item.reviewCount && (
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({item.reviewCount} reviews)
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {item.trend && (
                              <div className="flex items-center gap-1">
                                <TrendingUp 
                                  size={14} 
                                  className={
                                    item.trend === 'rising' 
                                      ? 'text-green-500' 
                                      : item.trend === 'falling' 
                                        ? 'text-red-500' 
                                        : 'text-gray-500'
                                  } 
                                />
                                <span className="text-xs capitalize">{item.trend}</span>
                              </div>
                            )}
                          </div>
                          
                          <Button variant="ghost" size="sm" onClick={() => toast.info(`${item.reviewCount || 0} reviews for ${item.name}`)}>
                            <MessageSquare size={14} className="mr-1" /> 
                            Reviews
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <Button className="bg-closetx-teal">Shop All Items</Button>
                    <Button variant="outline" onClick={() => toast.success('Outfit shared!')}>
                      <Share2 size={16} className="mr-2" /> Share Look
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
        
        {selectedItem && (
          <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{selectedItem.name}</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-lg font-semibold">{selectedItem.name}</p>
                  <p className="text-gray-600">{selectedItem.brand}</p>
                  {selectedItem.price && <p className="text-xl font-bold">{selectedItem.price}</p>}
                </div>
                
                {selectedItem.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(selectedItem.rating) 
                          ? "text-amber-500 fill-amber-500" 
                          : "text-gray-300"} 
                      />
                    ))}
                    <span className="ml-2">{selectedItem.rating}</span>
                    {selectedItem.reviewCount && (
                      <span className="text-sm text-gray-500">
                        ({selectedItem.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-medium mb-2">AI Analysis</h4>
                  <p className="text-sm text-gray-600">
                    This {selectedItem.name.toLowerCase()} from {selectedItem.brand} is a versatile piece 
                    that can be styled for multiple occasions. 
                    {selectedItem.trend === 'rising' 
                      ? " Currently trending and gaining popularity." 
                      : selectedItem.trend === 'falling' 
                        ? " Classic style that remains relevant despite changing trends." 
                        : " A timeless addition to your wardrobe."}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-closetx-teal"
                    onClick={() => {
                      handleAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setSelectedItem(null)}
                  >
                    View Similar Items
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </AppLayout>
  );
};

export default OutfitPost;

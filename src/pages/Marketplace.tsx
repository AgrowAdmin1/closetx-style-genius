
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Heart, Search, Filter, Tag, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import OrderProcessing from '@/components/Marketplace/OrderProcessing';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import VirtualTryOnDialog from '@/components/Marketplace/VirtualTryOnDialog';
import SocialBadges from '@/components/Marketplace/SocialBadges';

const mockFriends = [
  { firstName: 'Ananya' },
  { firstName: 'Riya' }
];

const shopTeasers = [
  "Ananya has this in her wishlist!",
  "Riya is eyeing this!",
  "Trending in your circle!",
  "Only 2 left – don't let your friend get it first!"
];

type ProductType = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  sustainabilityScore: number;
  isNew: boolean;
  badges: string[];
  favorited: boolean;
};

// Sample data
const mockProducts: ProductType[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    brand: 'Everlane',
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 8.5,
    isNew: true,
    badges: ['Organic Cotton', 'Ethical Factory'],
    favorited: false,
  },
  {
    id: '2',
    name: 'Vintage Denim Jeans',
    brand: 'Levi\'s',
    price: '₹4,499',
    image: 'https://images.unsplash.com/photo-1602293589930-45a9ec996d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 9.2,
    isNew: false,
    badges: ['Recycled', 'Water<Less'],
    favorited: true,
  },
  {
    id: '3',
    name: 'Linen Blend Jumpsuit',
    brand: 'Reformation',
    price: '₹7,299',
    image: 'https://images.unsplash.com/photo-1594618776274-0498b952a8a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 7.8,
    isNew: true,
    badges: ['Linen', 'Sustainable'],
    favorited: false,
  },
  {
    id: '4',
    name: 'Cozy Cashmere Sweater',
    brand: 'Patagonia',
    price: '₹9,399',
    image: 'https://images.unsplash.com/photo-1588188267364-9b16503c81d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 8.9,
    isNew: false,
    badges: ['Recycled Cashmere', 'Fair Trade'],
    favorited: false,
  },
  {
    id: '5',
    name: 'Floral Maxi Dress',
    brand: 'Faithfull the Brand',
    price: '₹6,299',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 9.5,
    isNew: true,
    badges: ['Handmade', 'Eco-friendly'],
    favorited: false,
  },
  {
    id: '6',
    name: 'Leather Ankle Boots',
    brand: 'Dr. Martens',
    price: '₹12,599',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635928848?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 8.2,
    isNew: false,
    badges: ['Durable', 'Ethically Sourced'],
    favorited: true,
  },
];

const categoryFilters = [
  'All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Sustainable'
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Array<{id: string, name: string, price: string, quantity: number, image?: string}>>([]);
  const [showOrderProcessing, setShowOrderProcessing] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<ProductType | null>(null);

  const toggleFavorite = (id: string) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, favorited: !product.favorited } 
        : product
    ));
  };

  const addToCart = (product: ProductType) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Item already in cart, increase quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1,
        image: product.image
      }]);
    }
    
    toast.success(`Added ${product.name} to cart`);
    setLastAddedItem(product); // For Share dialog
    setShowShareDialog(true);
  };

  // UI only: randomly mock social signals for now
  const getSocialBadges = (productId: string) => {
    // Tease on items 1, 3, 5; friend bought on 2, 4, 6 for demo
    const idx = Number(productId) % 3;
    return {
      trending: idx === 0,
      friendBought: idx === 1,
      teasingText: idx === 2 ? shopTeasers[Number(productId) % shopTeasers.length] : undefined,
    };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesCategory = activeFilter === 'All' || 
                            (activeFilter === 'Sustainable' && product.sustainabilityScore > 8) ||
                            product.badges.includes(activeFilter);
                            
    return matchesSearch && matchesCategory;
  });

  const handleOrderComplete = () => {
    setCartItems([]);
    setShowOrderProcessing(false);
    toast.success("Thank you for your purchase!");
  };

  return (
    <AppLayout>
      <div className="space-y-7 md:space-y-10 px-2 sm:px-4 max-w-7xl mx-auto">
        {/* Header & Cart */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 mb-0">
            Sustainable Marketplace
          </h1>
          {cartItems.length > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <ShoppingBag size={16} className="mr-2" /> 
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {!showOrderProcessing ? (
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex gap-3">
                          {item.image && (
                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <div className="flex justify-between">
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              <p className="font-semibold">{item.price}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              setCartItems(cartItems.filter((_, i) => i !== index));
                              toast.success("Item removed from cart");
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span>Subtotal</span>
                          <span className="font-semibold">
                            {cartItems.reduce((total, item) => {
                              // Extract numeric value from price string
                              const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                              return total + (price * item.quantity);
                            }, 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                          </span>
                        </div>
                        <Button 
                          className="w-full bg-closetx-teal mt-2"
                          onClick={() => setShowOrderProcessing(true)}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <OrderProcessing 
                      cartItems={cartItems}
                      onClose={() => setShowOrderProcessing(false)}
                      onOrderComplete={handleOrderComplete}
                    />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        
        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2 py-1 md:py-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="border-gray-300 shadow-sm focus-visible:ring-closetx-teal pl-10 text-base md:text-sm"
              placeholder="Search for clothes, brands and more" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Filter size={18} />
          </Button>
        </div>
        
        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2 hide-scrollbar">
          {categoryFilters.map(category => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "default" : "outline"}
              className={`flex-shrink-0 transition-all text-sm px-4 py-1 rounded-lg ${
                activeFilter === category ? 'bg-closetx-teal text-white shadow-sm' : 'bg-white text-closetx-charcoal'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-9">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-visible border border-gray-200 shadow-subtle bg-white group rounded-xl transition-shadow duration-200 hover:shadow-xl relative">
              <div className="relative pb-2">
                <div 
                  className="aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => navigate(`/item/${product.id}`)}
                  tabIndex={0}
                  aria-label={`Open details for ${product.name}`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* BADGES */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {product.isNew && (
                    <span className="bg-white text-closetx-charcoal text-xs px-2 py-1 rounded-full font-semibold shadow">
                      New
                    </span>
                  )}
                  <SocialBadges {...getSocialBadges(product.id)} />
                </div>
                {/* Favorite */}
                <button 
                  className={`absolute top-2 right-2 rounded-full p-1.5 shadow transition-colors ${product.favorited ? 'bg-closetx-terracotta text-white' : 'bg-white/90 text-gray-700 hover:bg-white'}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  aria-label={product.favorited ? "Unfavorite" : "Favorite"}
                >
                  <Heart size={17} fill={product.favorited ? 'currentColor' : 'none'} />
                </button>

                {/* Key Action: Add to Cart (always visible); others on hover */}
                <div className="absolute bottom-3 right-3 z-20 opacity-95">
                  <Button
                    size="sm"
                    variant="default"
                    className="rounded-full bg-black/80 text-white shadow hover:bg-black px-3 py-1"
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  >
                    <ShoppingBag size={15} className="mr-1" /> Add
                  </Button>
                </div>
                
                {/* Actions on hover only (desktop) */}
                <div className="hidden group-hover:flex absolute inset-0 z-30 bg-black/20 rounded-xl transition-opacity duration-200 items-end justify-center pb-5 gap-2 flex-col">
                  <VirtualTryOnDialog 
                    itemImage={product.image}
                    itemName={product.name}
                    trigger={
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-28 bg-white/95 backdrop-blur"
                        onClick={e => e.stopPropagation()}
                      >
                        Try On
                      </Button>
                    }
                  />
                  <div className="flex gap-2 w-full justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-28"
                      onClick={e => { e.stopPropagation(); toast.info('Shop similar looks coming soon!'); }}
                    >
                      Buy Similar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-28"
                      onClick={e => { e.stopPropagation(); toast.info('Shop this look coming soon!'); }}
                    >
                      Shop This Look
                    </Button>
                  </div>
                </div>
              </div>
              {/* Card Content */}
              <div className="px-3 pt-0 pb-2 cursor-pointer" onClick={() => navigate(`/item/${product.id}`)}>
                <div className="flex items-center justify-between mb-1">
                  <div className="truncate font-semibold text-lg md:text-base text-gray-900">{product.name}</div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded flex items-center ml-2">
                    <Tag size={10} className="mr-0.5" />
                    {product.sustainabilityScore.toFixed(1)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{product.brand}</div>
                {/* Social Badges inline (one liner only for teaser) */}
                <div className="mt-1">
                  <SocialBadges {...getSocialBadges(product.id)} />
                </div>
                {/* Product Badges - only max 2 */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.badges.slice(0, 2).map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xxs py-0 px-2 font-normal truncate">
                      {badge}
                    </Badge>
                  ))}
                  {product.badges.length > 2 && (
                    <span className="text-xxs text-gray-400 ml-1">+{product.badges.length - 2} more</span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-base text-closetx-teal">{product.price}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base md:text-lg">No products found matching your criteria</p>
            <Button 
              onClick={() => {setSearchTerm(''); setActiveFilter('All');}} 
              variant="link" 
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Share Flex Dialog */}
        {showShareDialog && lastAddedItem && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setShowShareDialog(false)}>
            <div className="bg-white rounded-lg p-6 flex flex-col gap-4 items-center shadow-xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-center mb-2">Flaunt your pick!</h3>
              <img src={lastAddedItem.image} alt={lastAddedItem.name} className="w-32 h-40 object-cover rounded-lg mb-1" />
              <div className="text-center text-sm">Let your friends see what you just added to cart!</div>
              <Button className="w-full bg-closetx-teal" onClick={() => { setShowShareDialog(false); toast.success("Shared to your story!"); }}>
                Share with Friends
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowShareDialog(false)}>
                Skip
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Marketplace;

// NOTE: File is now very large! For maintainability, consider refactoring into smaller, focused components (product card, filter bar etc).

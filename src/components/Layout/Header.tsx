
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, MessageCircle, ShoppingCart } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

interface HeaderProps {
  weather?: {
    temp: number;
    condition: string;
  }
}

const Header: React.FC<HeaderProps> = ({ weather }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<{image: string, name: string, price: number}[]>([
    {
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop',
      name: 'Summer Dress',
      price: 79.99
    }
  ]);
  
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  const removeCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast.success("Item removed from cart");
  };
  
  const checkout = () => {
    toast.success("Proceeding to checkout");
    navigate('/checkout');
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <Link to="/">
          <span className="font-bold text-xl text-closetx-teal">ClosetX</span>
        </Link>
        
        {weather && (
          <div className="hidden md:flex items-center text-sm bg-gray-50 px-2 py-1 rounded-full ml-2">
            <span className="font-medium">{weather.temp}°</span>
            <span className="ml-1 text-gray-500">{weather.condition}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => navigate('/search')}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full relative"
          onClick={() => navigate('/chat-overview')}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="sr-only">Messages</span>
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-closetx-teal">
            3
          </Badge>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full relative"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>
        
        {/* Shopping Cart */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Shopping Cart</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-closetx-teal">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: 1</p>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeCartItem(index)}>
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
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full bg-closetx-teal" onClick={checkout}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 flex flex-col items-center">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate('/marketplace')}
                  >
                    Browse Marketplace
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/wardrobe')}>
              My Wardrobe
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/outfit-generator')}>
              Outfit Generator
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/login')}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;


import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, MessageCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  weather?: {
    temp: number;
    condition: string;
  }
}

const Header: React.FC<HeaderProps> = ({ weather }) => {
  const navigate = useNavigate();
  
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

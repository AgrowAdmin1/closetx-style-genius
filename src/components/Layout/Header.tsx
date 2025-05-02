
import React from 'react';
import { useLocation } from 'react-router-dom';

type HeaderProps = {
  weather?: {
    temp: number;
    condition: string;
  };
};

const Header: React.FC<HeaderProps> = ({ weather }) => {
  const location = useLocation();
  
  const getTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Home';
      case '/wardrobe':
        return 'My Wardrobe';
      case '/discover':
        return 'Discover';
      case '/profile':
        return 'Profile';
      case '/add-item':
        return 'Add New Item';
      default:
        return 'ClosetX';
    }
  };

  return (
    <header className="bg-white sticky top-0 z-10 pt-safe">
      <div className="container px-4 py-4 mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-closetx-charcoal">{getTitle()}</h1>
        {weather && location.pathname === '/' && (
          <div className="flex items-center">
            <span className="text-sm mr-1 text-gray-600">{weather.condition}</span>
            <span className="text-sm font-medium">{weather.temp}°C</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

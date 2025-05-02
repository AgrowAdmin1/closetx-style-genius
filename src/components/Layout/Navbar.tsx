
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 pb-safe">
      <div className="flex justify-around items-center h-16">
        <NavItem to="/" icon={<Home size={24} />} label="Home" />
        <NavItem to="/wardrobe" icon={<ShoppingBag size={24} />} label="Wardrobe" />
        <NavItem to="/discover" icon={<Search size={24} />} label="Discover" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </div>
    </nav>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex flex-col items-center justify-center w-1/4 transition-colors",
          isActive 
            ? "text-closetx-teal" 
            : "text-gray-500 hover:text-closetx-teal"
        )
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export default Navbar;

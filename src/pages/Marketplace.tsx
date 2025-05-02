
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Heart, Search, Filter, Tag, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    name: 'Organic Cotton T-shirt',
    brand: 'EcoWear',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainabilityScore: 8.5,
    isNew: true,
    badges: ['Organic', 'Fair Trade'],
    favorited: false,
  },
  {
    id: '2',
    name: 'Recycled Denim Jeans',
    brand: 'GreenThread',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    sustainabilityScore: 9.2,
    isNew: false,
    badges: ['Recycled', 'Water Saving'],
    favorited: true,
  },
  {
    id: '3',
    name: 'Hemp Canvas Sneakers',
    brand: 'Loam',
    price: '₹2,299',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainabilityScore: 7.8,
    isNew: true,
    badges: ['Vegan', 'Biodegradable'],
    favorited: false,
  },
  {
    id: '4',
    name: 'Bamboo Fiber Socks',
    brand: 'EarthSoles',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainabilityScore: 8.9,
    isNew: false,
    badges: ['Antimicrobial', 'Eco-friendly'],
    favorited: false,
  },
  {
    id: '5',
    name: 'Tencel Blouse',
    brand: 'Sage Apparel',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    sustainabilityScore: 9.5,
    isNew: true,
    badges: ['Biodegradable', 'Low Impact'],
    favorited: false,
  },
  {
    id: '6',
    name: 'Recycled Polyester Jacket',
    brand: 'ReWear',
    price: '₹2,599',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    sustainabilityScore: 8.2,
    isNew: false,
    badges: ['Ocean Plastic', 'Water-resistant'],
    favorited: true,
  },
];

const categoryFilters = [
  'All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Sustainable'
];

const Marketplace = () => {
  const [products, setProducts] = useState(mockProducts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (id: string) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, favorited: !product.favorited } 
        : product
    ));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesCategory = activeFilter === 'All' || 
                            (activeFilter === 'Sustainable' && product.sustainabilityScore > 8) ||
                            product.badges.includes(activeFilter);
                            
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Sustainable Marketplace</h1>
        
        <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
          <Search className="text-gray-400 ml-2 mr-1" size={18} />
          <Input 
            className="border-none shadow-none focus-visible:ring-0"
            placeholder="Search brands, products, or styles" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="ghost" size="sm">
            <Filter size={18} />
          </Button>
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
          {categoryFilters.map(category => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "default" : "outline"}
              className={`flex-shrink-0 ${activeFilter === category ? 'bg-closetx-teal text-white' : 'bg-white text-closetx-charcoal'}`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <div className="aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-closetx-teal text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                )}
                <button 
                  className={`absolute top-2 left-2 rounded-full p-1.5 shadow-sm ${product.favorited ? 'bg-closetx-terracotta text-white' : 'bg-white'}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart size={16} />
                </button>
              </div>
              
              <div className="p-3">
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-sm flex items-center mr-1">
                    <Tag size={10} className="mr-0.5" />
                    {product.sustainabilityScore.toFixed(1)}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{product.brand}</p>
                </div>
                
                <h3 className="font-medium text-sm mt-1 truncate">{product.name}</h3>
                
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xxs py-0 px-1">
                      {badge}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-sm">{product.price}</p>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-closetx-teal text-closetx-teal">
                    <ShoppingBag size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found matching your criteria</p>
            <Button 
              onClick={() => {setSearchTerm(''); setActiveFilter('All');}} 
              variant="link" 
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Marketplace;

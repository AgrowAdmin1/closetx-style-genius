
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Heart, ShoppingBag } from 'lucide-react';

type ProductType = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  sustainabilityScore: number;
  isNew: boolean;
};

const mockProducts: ProductType[] = [
  {
    id: '1',
    name: 'Organic Cotton T-shirt',
    brand: 'EcoWear',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainabilityScore: 8.5,
    isNew: true,
  },
  {
    id: '2',
    name: 'Recycled Denim Jeans',
    brand: 'GreenThread',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    sustainabilityScore: 9.2,
    isNew: false,
  },
  {
    id: '3',
    name: 'Hemp Canvas Sneakers',
    brand: 'Loam',
    price: '₹2,299',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainabilityScore: 7.8,
    isNew: true,
  },
];

const MarketplacePreview = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sustainable Picks For You</h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockProducts.map((product) => (
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
              <button className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-sm">
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
              <div className="flex justify-between items-center mt-1">
                <p className="font-bold text-sm">{product.price}</p>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ShoppingBag size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Button variant="outline" className="w-full">
        Browse All Sustainable Brands
      </Button>
    </div>
  );
};

export default MarketplacePreview;

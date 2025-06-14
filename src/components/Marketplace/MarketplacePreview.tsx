import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 8.5,
    isNew: true,
  },
  {
    id: '2',
    name: 'Recycled Denim Jeans',
    brand: 'GreenThread',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1602293589930-45a9ec996d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 9.2,
    isNew: false,
  },
  {
    id: '3',
    name: 'Linen Blend Jumpsuit',
    brand: 'Reformation',
    price: '₹2,299',
    image: 'https://images.unsplash.com/photo-1594618776274-0498b952a8a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    sustainabilityScore: 7.8,
    isNew: true,
  },
];

const MarketplacePreview = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sustainable Picks For You</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/marketplace')}>
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {mockProducts.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden border-none shadow-none bg-transparent group cursor-pointer"
            onClick={() => navigate(`/item/${product.id}`)}
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {product.isNew && (
                <div className="absolute top-2 left-2 bg-white text-closetx-charcoal text-xs px-2 py-1 rounded-full font-semibold shadow">
                  New
                </div>
              )}
              <button 
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white"
                onClick={(e) => { e.stopPropagation(); /* Add to favorites logic here if needed */ }}
              >
                <Heart size={16} />
              </button>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-gray-500 truncate">{product.brand}</p>
              <h3 className="font-medium text-sm mt-0.5 truncate">{product.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="font-semibold text-sm">{product.price}</p>
                <div className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-sm flex items-center">
                  <Tag size={10} className="mr-0.5" />
                  {product.sustainabilityScore.toFixed(1)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Button variant="outline" className="w-full" onClick={() => navigate('/marketplace')}>
        Browse Marketplace
      </Button>
    </div>
  );
};

export default MarketplacePreview;

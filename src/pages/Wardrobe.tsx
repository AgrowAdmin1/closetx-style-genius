
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import ClothingItem, { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data
const mockItems: ClothingItemType[] = [
  {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'Tops',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    season: ['Spring', 'Summer', 'Fall'],
    brand: 'Zara'
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['All Season'],
    brand: 'Levi\'s'
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'Outerwear',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['Fall', 'Winter'],
    brand: 'H&M'
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'Footwear',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    season: ['All Season'],
    brand: 'Nike'
  },
  {
    id: '5',
    name: 'Red Summer Dress',
    category: 'Dresses',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    season: ['Summer'],
    brand: 'Mango'
  },
];

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories'];

const Wardrobe = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [items] = useState(mockItems);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <AppLayout>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">{items.length} items in your wardrobe</p>
        <Button 
          className="bg-closetx-teal hover:bg-closetx-teal/90"
          onClick={() => navigate('/add-item')}
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </Button>
      </div>

      <Tabs defaultValue="categories" className="mb-6">
        <TabsList className="w-full bg-gray-100">
          <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
          <TabsTrigger value="colors" className="flex-1">Colors</TabsTrigger>
          <TabsTrigger value="seasons" className="flex-1">Seasons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="mt-4">
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`flex-shrink-0 ${activeCategory === category ? 'bg-closetx-teal text-white' : 'bg-white text-closetx-charcoal'}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="colors">
          <p className="text-center py-4 text-gray-500">Color filter coming soon</p>
        </TabsContent>
        
        <TabsContent value="seasons">
          <p className="text-center py-4 text-gray-500">Season filter coming soon</p>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <ClothingItem 
            key={item.id} 
            item={item} 
            onClick={() => navigate(`/item/${item.id}`)}
          />
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 mb-4">No items found in this category</p>
            <Button 
              className="bg-closetx-teal hover:bg-closetx-teal/90"
              onClick={() => navigate('/add-item')}
            >
              <Plus size={18} className="mr-1" />
              Add Item
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Wardrobe;

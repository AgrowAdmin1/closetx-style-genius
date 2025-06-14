
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import ItemStatus from '@/components/Collection/ItemStatus';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit2, Trash2, Droplets, Wind, CheckCircle, Share2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

// Mock item data - in a real app, this would be fetched from API
const mockItems: Record<string, ClothingItemType> = {
  '1': {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'Tops',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1620799140408-7c6a0a0d2596?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    season: ['Spring', 'Summer', 'Fall'],
    brand: 'Zara',
    condition: { isClean: true, isIroned: true, isUsed: false },
    isTrending: true
  },
  '2': {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1604176354204-926873782855?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    season: ['All Season'],
    brand: 'Levi\'s',
    condition: { isClean: true, isIroned: false, isUsed: true, lastWorn: '2 days ago' }
  },
  '3': {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'Outerwear',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    season: ['Fall', 'Winter'],
    brand: 'H&M',
    condition: { isClean: false, isIroned: false, isUsed: true, lastWorn: 'Yesterday' }
  },
  '4': {
    id: '4',
    name: 'White Sneakers',
    category: 'Footwear',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    season: ['All Season'],
    brand: 'Nike',
    condition: { isClean: false, isIroned: false, isUsed: true, lastWorn: '3 days ago' }
  },
  '5': {
    id: '5',
    name: 'Red Summer Dress',
    category: 'Dresses',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    season: ['Summer'],
    brand: 'Mango',
    condition: { isClean: true, isIroned: true, isUsed: false },
    isTrending: true
  },
};

const ItemDetail = () => {
  const { itemId } = useParams<{itemId: string}>();
  const navigate = useNavigate();
  const item = itemId ? mockItems[itemId] : null;
  
  const [itemCondition, setItemCondition] = useState<'clean' | 'dirty'>('clean');
  const [itemIroned, setItemIroned] = useState<'ironed' | 'not-ironed'>('ironed');

  if (!item) {
    return (
      <AppLayout>
        <div className="text-center py-10">
          <p>Item not found</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/wardrobe')}
          >
            Back to Wardrobe
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleShare = () => {
    toast.success('Sharing options opened');
    // In a real app, this would open a sharing modal or create a link
  };

  const handleUpdateCondition = () => {
    toast.success('Item condition updated!');
    // In a real app, this would update the item in the database
  };

  const handleDelete = () => {
    toast.success(`${item.name} has been removed from your wardrobe`);
    navigate('/wardrobe');
    // In a real app, this would delete the item from the database
  };

  return (
    <AppLayout>
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/wardrobe')}
          className="pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Wardrobe
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[4/5] overflow-hidden rounded-xl relative bg-closetx-gray-soft">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.isTrending && (
            <Badge className="absolute top-4 right-4 bg-closetx-teal">
              Trending
            </Badge>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold">{item.name}</h1>
              <p className="text-gray-500">{item.category}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleShare}>
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Edit2 size={16} />
              </Button>
              <Button size="sm" variant="outline" className="text-red-500" onClick={handleDelete}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <p className="w-24 font-medium">Brand:</p>
              <span>{item.brand || 'Not specified'}</span>
            </div>
            
            <div className="flex items-center">
              <p className="w-24 font-medium">Color:</p>
              <div className="flex items-center">
                <div 
                  className="w-5 h-5 rounded-full mr-2 border border-gray-300" 
                  style={{ backgroundColor: item.color.toLowerCase() }}
                ></div>
                <span>{item.color}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <p className="w-24 font-medium">Season:</p>
              <div className="flex flex-wrap gap-1">
                {item.season.map(s => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-start">
              <p className="w-24 font-medium">Condition:</p>
              <ItemStatus condition={item.condition || {
                isClean: true,
                isIroned: true,
                isUsed: false
              }} />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Update Item Status</h3>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Cleanliness</p>
                <RadioGroup 
                  value={itemCondition} 
                  onValueChange={(value) => setItemCondition(value as 'clean' | 'dirty')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clean" id="clean" />
                    <Label htmlFor="clean" className="flex items-center">
                      <Droplets size={16} className="mr-1 text-green-500" />
                      Clean
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dirty" id="dirty" />
                    <Label htmlFor="dirty">Needs washing</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Ironing</p>
                <RadioGroup 
                  value={itemIroned}
                  onValueChange={(value) => setItemIroned(value as 'ironed' | 'not-ironed')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ironed" id="ironed" />
                    <Label htmlFor="ironed" className="flex items-center">
                      <Wind size={16} className="mr-1 text-green-500" />
                      Ironed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-ironed" id="not-ironed" />
                    <Label htmlFor="not-ironed">Needs ironing</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Usage</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Mark as worn today</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-closetx-teal hover:bg-closetx-teal/90"
                onClick={handleUpdateCondition}
              >
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Outfit Suggestions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="closetx-card overflow-hidden">
              <div className="aspect-square bg-closetx-gray-soft"></div>
              <div className="p-3">
                <p className="font-medium text-sm">Outfit Suggestion {i}</p>
                <p className="text-xs text-gray-500">3 items</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ItemDetail;

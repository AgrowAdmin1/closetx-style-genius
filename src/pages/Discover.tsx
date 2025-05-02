
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

type BrandType = {
  id: string;
  name: string;
  description: string;
  image: string;
  sustainable: boolean;
  tags: string[];
};

const mockBrands: BrandType[] = [
  {
    id: '1',
    name: 'Eco Threads',
    description: 'Sustainable fashion made from recycled materials.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainable: true,
    tags: ['Sustainable', 'Casual', 'Basics']
  },
  {
    id: '2',
    name: 'Urban Minimalist',
    description: 'Clean lines and timeless designs for the modern wardrobe.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    sustainable: true,
    tags: ['Minimalist', 'Formal', 'Business']
  },
  {
    id: '3',
    name: 'Style Revival',
    description: 'Vintage-inspired pieces with a contemporary twist.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    sustainable: false,
    tags: ['Vintage', 'Trendy', 'Colorful']
  },
];

const mockArticles = [
  {
    id: '1',
    title: '7 Ways to Build a Sustainable Wardrobe',
    excerpt: 'Simple tips for reducing fashion waste and building a more conscious closet.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  },
  {
    id: '2',
    title: 'Capsule Wardrobe Guide for 2023',
    excerpt: 'Create a versatile wardrobe with just 30 essential pieces.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
  },
];

const Discover = () => {
  return (
    <AppLayout>
      <Tabs defaultValue="brands" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="articles">Tips & Articles</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brands">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Recommended for You</h2>
            <div className="space-y-4">
              {mockBrands.map(brand => (
                <Card key={brand.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 h-32 sm:h-auto">
                      <img 
                        src={brand.image} 
                        alt={brand.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:w-2/3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{brand.name}</h3>
                        {brand.sustainable && (
                          <Badge className="bg-green-500">Sustainable</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{brand.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {brand.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-closetx-teal hover:bg-closetx-teal/90 flex items-center justify-center">
                        <span>Visit Store</span>
                        <ExternalLink size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="articles">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Style Tips & Articles</h2>
            <div className="space-y-4">
              {mockArticles.map(article => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="aspect-[16/9]">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{article.excerpt}</p>
                    <Button className="w-full bg-closetx-teal hover:bg-closetx-teal/90">Read More</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trending">
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-center mb-4">
              Trending styles and items coming soon!
            </p>
            <Button variant="outline">Get Notified</Button>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Discover;

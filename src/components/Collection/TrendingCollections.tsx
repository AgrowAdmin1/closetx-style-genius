import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type CollectionZone = 'Local' | 'Global' | 'Friends';

export type TrendingItem = {
  id: string;
  name: string;
  image: string;
  brandName: string;
  trend: number; // 1-100 trend score
  zone: CollectionZone;
  owner?: {
    name: string;
    avatar: string;
  };
};

const mockTrendingItems: TrendingItem[] = [
  {
    id: 't1',
    name: 'Linen Shirt',
    image: 'https://images.unsplash.com/photo-1622470953794-3450535db769?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    brandName: 'H&M',
    trend: 95,
    zone: 'Global'
  },
  {
    id: 't2',
    name: 'Denim Jacket',
    image: 'https://images.unsplash.com/photo-1543072214-722e1b1b162a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    brandName: 'Levi\'s',
    trend: 88,
    zone: 'Global'
  },
  {
    id: 't3',
    name: 'Summer Dress',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    brandName: 'Zara',
    trend: 92,
    zone: 'Local'
  },
  {
    id: 't4',
    name: 'Silk Scarf',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    brandName: 'Gucci',
    trend: 85,
    zone: 'Local'
  },
  {
    id: 't5',
    name: 'Leather Boots',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635928848?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    brandName: 'Dr. Martens',
    trend: 90,
    zone: 'Friends',
    owner: { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }
  },
  {
    id: 't6',
    name: 'Cotton Tee',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    brandName: 'Uniqlo',
    trend: 82,
    zone: 'Friends',
    owner: { name: 'Ananya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' }
  }
];

interface TrendingCollectionsProps {
  className?: string;
}

const TrendingCollections: React.FC<TrendingCollectionsProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const renderTrendBar = (trendScore: number) => {
    return (
      <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
        <div 
          className="bg-gradient-to-r from-closetx-teal to-blue-400 h-1.5 rounded-full"
          style={{ width: `${trendScore}%` }} 
        />
      </div>
    );
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center text-lg">
          Trending Collections
          <Badge variant="outline" className="text-xs font-normal">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          {(['global', 'local', 'friends'] as const).map((zone) => (
            <TabsContent key={zone} value={zone} className="mt-0">
              <div className="grid grid-cols-2 gap-3">
                {mockTrendingItems
                  .filter(item => item.zone.toLowerCase() === zone)
                  .map(item => (
                    <div 
                      key={item.id} 
                      className="group hover-scale cursor-pointer"
                      onClick={() => navigate(`/item/${item.id}`)}
                    >
                      <div className="aspect-square overflow-hidden rounded-md mb-2">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.brandName}</p>
                        </div>
                        
                        {item.owner && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.owner.avatar} />
                            <AvatarFallback>{item.owner.name[0]}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      
                      {renderTrendBar(item.trend)}
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendingCollections;

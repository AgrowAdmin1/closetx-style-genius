
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Music, Ticket, PartyPopper, Restaurant, Book } from 'lucide-react';
import AppLayout from '@/components/Layout/AppLayout';

type Event = {
  id: string;
  title: string;
  type: 'concert' | 'party' | 'restaurant' | 'fashion' | 'book';
  date: string;
  time?: string;
  location: string;
  image: string;
  description: string;
  price?: string;
  tags: string[];
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Fashion Week',
    type: 'fashion',
    date: '2025-06-15',
    time: '10:00 AM - 8:00 PM',
    location: 'Downtown Fashion Center',
    image: 'https://images.unsplash.com/photo-1584493189045-c357a8732776',
    description: 'Discover the latest summer trends and designs from top fashion brands and emerging designers.',
    price: '$60',
    tags: ['Fashion', 'Summer', 'Runway']
  },
  {
    id: '2',
    title: 'Indie Rock Night',
    type: 'concert',
    date: '2025-05-22',
    time: '8:00 PM',
    location: 'The Sound Garden',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    description: 'An evening of amazing indie rock performances featuring local and international bands.',
    price: '$45',
    tags: ['Music', 'Indie', 'Live']
  },
  {
    id: '3',
    title: 'Sustainable Fashion Gala',
    type: 'fashion',
    date: '2025-05-30',
    time: '7:00 PM',
    location: 'Eco Arts Center',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    description: 'A celebration of sustainable and eco-friendly fashion with special guest designers.',
    price: '$75',
    tags: ['Sustainable', 'Fashion', 'Eco-friendly']
  },
  {
    id: '4',
    title: 'Downtown Rooftop Party',
    type: 'party',
    date: '2025-06-05',
    time: '9:00 PM - 2:00 AM',
    location: 'SkyView Lounge',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    description: 'Celebrate the start of summer with cocktails, dancing and amazing city views.',
    price: '$35',
    tags: ['Party', 'Rooftop', 'DJ']
  },
  {
    id: '5',
    title: 'Farm to Table Dinner',
    type: 'restaurant',
    date: '2025-05-25',
    time: '6:30 PM',
    location: 'Green Garden Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    description: 'A special dining experience featuring locally sourced ingredients and seasonal cuisine.',
    price: '$85',
    tags: ['Dining', 'Local', 'Gourmet']
  },
  {
    id: '6',
    title: 'Fashion & Literature Evening',
    type: 'book',
    date: '2025-06-10',
    time: '7:00 PM',
    location: 'City Library',
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6',
    description: 'Join authors and designers discussing the intersection of fashion and literary inspiration.',
    price: '$15',
    tags: ['Books', 'Fashion', 'Discussion']
  },
];

const Entertainment = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <AppLayout weather={{ temp: 26, condition: 'Clear' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Entertainment & Fashion</h1>
        <p className="text-gray-500">Discover events, concerts, restaurants, and more to complement your style</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="concerts" className="flex items-center gap-1">
            <Music size={16} />
            <span className="hidden sm:inline">Concerts</span>
          </TabsTrigger>
          <TabsTrigger value="fashion" className="flex items-center gap-1">
            <Ticket size={16} />
            <span className="hidden sm:inline">Fashion</span>
          </TabsTrigger>
          <TabsTrigger value="parties" className="flex items-center gap-1">
            <PartyPopper size={16} />
            <span className="hidden sm:inline">Parties</span>
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-1">
            <Restaurant size={16} />
            <span className="hidden sm:inline">Dining</span>
          </TabsTrigger>
          <TabsTrigger value="books" className="flex items-center gap-1">
            <Book size={16} />
            <span className="hidden sm:inline">Books</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-lg flex items-center gap-3">
          <Calendar className="text-closetx-teal" size={20} />
          <div>
            <span className="font-medium">Upcoming events near you</span>
            <p className="text-sm text-gray-500">Personalized recommendations based on your style and interests</p>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <EventGrid 
            events={mockEvents} 
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </TabsContent>
        
        <TabsContent value="concerts" className="mt-0">
          <EventGrid 
            events={mockEvents.filter(e => e.type === 'concert')} 
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </TabsContent>
        
        <TabsContent value="fashion" className="mt-0">
          <EventGrid 
            events={mockEvents.filter(e => e.type === 'fashion')} 
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </TabsContent>
        
        <TabsContent value="parties" className="mt-0">
          <EventGrid 
            events={mockEvents.filter(e => e.type === 'party')} 
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </TabsContent>
        
        <TabsContent value="restaurants" className="mt-0">
          <EventGrid 
            events={mockEvents.filter(e => e.type === 'restaurant')} 
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </TabsContent>
        
        <TabsContent value="books" className="mt-0">
          <EventGrid 
            events={mockEvents.filter(e => e.type === 'book')} 
            onEventSelect={(event) => setSelectedEvent(event)}
          />
        </TabsContent>
      </Tabs>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative h-60">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                className="w-full h-full object-cover"
              />
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full"
                onClick={() => setSelectedEvent(null)}
              >
                &times;
              </Button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">{selectedEvent.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedEvent.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center text-sm">
                    <span className="w-4 mr-2">⏰</span>
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <span className="w-4 mr-2">📍</span>
                  <span>{selectedEvent.location}</span>
                </div>
                {selectedEvent.price && (
                  <div className="flex items-center text-sm">
                    <span className="w-4 mr-2">💰</span>
                    <span>{selectedEvent.price}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
              <div className="flex gap-3">
                <Button className="flex-1 bg-closetx-teal hover:bg-closetx-teal/90">
                  Book Tickets
                </Button>
                <Button variant="outline" className="flex-1">
                  Save Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

type EventGridProps = {
  events: Event[];
  onEventSelect: (event: Event) => void;
};

const EventGrid = ({ events, onEventSelect }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No events found in this category.</p>
        <Button variant="outline" className="mt-4">Explore other categories</Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} onClick={() => onEventSelect(event)} />
      ))}
    </div>
  );
};

type EventCardProps = {
  event: Event;
  onClick: () => void;
};

const EventCard = ({ event, onClick }: EventCardProps) => {
  const getEventIcon = (type: Event['type']) => {
    switch(type) {
      case 'concert': return <Music size={16} />;
      case 'party': return <PartyPopper size={16} />;
      case 'restaurant': return <Restaurant size={16} />;
      case 'fashion': return <Ticket size={16} />;
      case 'book': return <Book size={16} />;
      default: return null;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="aspect-[16/9]">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <Badge className="ml-2 flex items-center gap-1">
            {getEventIcon(event.type)}
            <span className="capitalize">{event.type}</span>
          </Badge>
        </div>
        <CardDescription className="flex items-center">
          <Calendar size={14} className="mr-1" />
          {new Date(event.date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between">
        <span className="text-sm font-medium">{event.location}</span>
        {event.price && <span className="text-sm font-bold">{event.price}</span>}
      </CardFooter>
    </Card>
  );
};

export default Entertainment;

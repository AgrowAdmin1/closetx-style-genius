
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, RefreshCw, Save, Star, ThumbsUp, ThumbsDown, Activity, Shirt, Eye, Gem, Watch, Brush } from 'lucide-react';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import { OutfitType, StyleItemType } from '@/components/Wardrobe/OutfitSuggestion';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Realistic clothing images by category
const realClothingImages = {
  tops: [
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  bottoms: [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  footwear: [
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  dresses: [
    "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596783074918-c84cb1bd5d44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  outerwear: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ]
};

// Realistic styling elements images
const stylingElements = {
  hairstyles: [
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  makeup: [
    "https://images.unsplash.com/photo-1597225244660-1cd128c64284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  jewelry: [
    "https://images.unsplash.com/photo-1599643477877-530eb83a5801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576022162028-726d7141a56f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  eyewear: [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ],
  nails: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
  ]
};

// Helper function to get a realistic image for a clothing category
const getRealisticImage = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('top')) return realClothingImages.tops[Math.floor(Math.random() * realClothingImages.tops.length)];
  if (lowerCategory.includes('bottom') || lowerCategory.includes('pant') || lowerCategory.includes('jean')) 
    return realClothingImages.bottoms[Math.floor(Math.random() * realClothingImages.bottoms.length)];
  if (lowerCategory.includes('shoe') || lowerCategory.includes('footwear') || lowerCategory.includes('boot')) 
    return realClothingImages.footwear[Math.floor(Math.random() * realClothingImages.footwear.length)];
  if (lowerCategory.includes('dress')) 
    return realClothingImages.dresses[Math.floor(Math.random() * realClothingImages.dresses.length)];
  if (lowerCategory.includes('coat') || lowerCategory.includes('jacket') || lowerCategory.includes('outerwear')) 
    return realClothingImages.outerwear[Math.floor(Math.random() * realClothingImages.outerwear.length)];
  
  // Fallback to tops if category doesn't match
  return realClothingImages.tops[Math.floor(Math.random() * realClothingImages.tops.length)];
};

// Helper function to get a styling element image
const getStylingImage = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('hair')) 
    return stylingElements.hairstyles[Math.floor(Math.random() * stylingElements.hairstyles.length)];
  if (lowerCategory.includes('makeup') || lowerCategory.includes('lipstick')) 
    return stylingElements.makeup[Math.floor(Math.random() * stylingElements.makeup.length)];
  if (lowerCategory.includes('jewelry') || lowerCategory.includes('ring') || lowerCategory.includes('necklace')) 
    return stylingElements.jewelry[Math.floor(Math.random() * stylingElements.jewelry.length)];
  if (lowerCategory.includes('eyewear') || lowerCategory.includes('glasses')) 
    return stylingElements.eyewear[Math.floor(Math.random() * stylingElements.eyewear.length)];
  if (lowerCategory.includes('nail')) 
    return stylingElements.nails[Math.floor(Math.random() * stylingElements.nails.length)];
  
  // Fallback to jewelry if category doesn't match
  return stylingElements.jewelry[Math.floor(Math.random() * stylingElements.jewelry.length)];
};

// Enhanced sample data with realistic images
const mockWardrobe: ClothingItemType[] = [
  {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'Tops',
    color: 'White',
    image: getRealisticImage('Tops'),
    season: ['Spring', 'Summer', 'Fall'],
    brand: 'Zara'
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    color: 'Blue',
    image: getRealisticImage('Bottoms'),
    season: ['All Season'],
    brand: 'Levi\'s'
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'Outerwear',
    color: 'Black',
    image: getRealisticImage('Outerwear'),
    season: ['Fall', 'Winter'],
    brand: 'H&M'
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'Footwear',
    color: 'White',
    image: getRealisticImage('Footwear'),
    season: ['All Season'],
    brand: 'Nike'
  },
  {
    id: '5',
    name: 'Red Summer Dress',
    category: 'Dresses',
    color: 'Red',
    image: getRealisticImage('Dresses'),
    season: ['Summer'],
    brand: 'Mango'
  },
];

// Celebrity inspirations for different occasions
const celebrityInspirations = {
  casual: ['Jennifer Aniston', 'Zendaya', 'Ryan Reynolds', 'Timothée Chalamet'],
  formal: ['Blake Lively', 'Cate Blanchett', 'Michael B. Jordan', 'Tom Ford'],
  work: ['Amal Clooney', 'Victoria Beckham', 'David Beckham', 'Ryan Gosling'],
  date: ['Emily Ratajkowski', 'Margot Robbie', 'Harry Styles', 'Chris Hemsworth'],
  party: ['Rihanna', 'Dua Lipa', 'A$AP Rocky', 'Bad Bunny'],
  workout: ['Dua Lipa', 'Kendall Jenner', 'Chris Hemsworth', 'The Rock']
};

// Designer notes for different occasions
const designerNotes = {
  casual: [
    'Effortless comfort meets style with this laid-back yet put-together look.',
    'A versatile ensemble that transitions seamlessly from day to evening.',
    'Clean lines and relaxed silhouettes create an approachable yet polished appearance.'
  ],
  formal: [
    'Sophisticated elegance with attention to tailoring and luxurious fabrics.',
    'This refined look combines classic elements with modern details for a timeless appeal.',
    'Bold structure with subtle accents creates a commanding yet graceful presence.'
  ],
  work: [
    'Professional polish with strategic color pops to convey confidence and creativity.',
    'Structured silhouettes balanced with comfortable fabrics for all-day wear.',
    'A contemporary take on workwear that maintains professionalism while expressing personal style.'
  ],
  date: [
    'Subtle sensuality through thoughtful fabric choices and strategic silhouettes.',
    'Balance of playful elements with sophisticated pieces creates intrigue.',
    'This look commands attention while maintaining an air of effortless allure.'
  ],
  party: [
    'Statement-making elements combined with confidence-boosting silhouettes.',
    'Strategic shimmer and texture create dimension that captures light beautifully.',
    'Bold choices that express personality while ensuring comfort for all-night enjoyment.'
  ],
  workout: [
    'Performance-driven pieces with style elements that motivate and inspire.',
    'Strategic layering for versatility through various workout intensities.',
    'Technical fabrics in contemporary silhouettes combine function with fashion-forward design.'
  ]
};

const OutfitGenerator = () => {
  const [occasion, setOccasion] = useState('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [outfitName, setOutfitName] = useState('');
  const [currentOutfit, setCurrentOutfit] = useState<OutfitType | null>(null);
  const [generatedOutfits, setGeneratedOutfits] = useState<OutfitType[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<OutfitType[]>([]);
  const [designerMode, setDesignerMode] = useState(false);
  const [currentTab, setCurrentTab] = useState('clothing');
  const [celebrityInspiration, setCelebrityInspiration] = useState<string | null>(null);

  const occasions = ['casual', 'formal', 'work', 'date', 'party', 'workout'];
  
  // Styling categories for the designer mode
  const stylingCategories = [
    { id: 'clothing', name: 'Clothing', icon: <Shirt className="h-4 w-4" /> },
    { id: 'hair', name: 'Hairstyle', icon: <Brush className="h-4 w-4" /> },
    { id: 'makeup', name: 'Makeup', icon: <Brush className="h-4 w-4" /> },
    { id: 'jewelry', name: 'Jewelry', icon: <Gem className="h-4 w-4" /> },
    { id: 'eyewear', name: 'Eyewear', icon: <Eye className="h-4 w-4" /> },
    { id: 'footwear', name: 'Footwear', icon: <Shirt className="h-4 w-4" /> }
  ];

  const generateOutfit = () => {
    setIsGenerating(true);
    
    // Simulate AI outfit generation with a delay
    setTimeout(() => {
      // Enhanced algorithm to create more realistic outfits
      const tops = mockWardrobe.filter(item => item.category === 'Tops' || item.category === 'Outerwear');
      const bottoms = mockWardrobe.filter(item => item.category === 'Bottoms');
      const footwear = mockWardrobe.filter(item => item.category === 'Footwear');
      const dresses = mockWardrobe.filter(item => item.category === 'Dresses');
      const outerwear = mockWardrobe.filter(item => item.category === 'Outerwear');
      
      let outfit: ClothingItemType[] = [];
      
      // For occasion-specific logic
      if (occasion === 'formal') {
        // Prefer formal items
        const formalTop = tops.find(item => item.name.includes('Shirt')) || 
          {
            id: 'formal-top',
            name: 'Formal Shirt',
            category: 'Tops',
            color: 'White',
            image: getRealisticImage('Tops'),
            season: ['All Season'],
            brand: 'Designer Brand'
          };
          
        const formalBottom = {
          id: 'formal-bottom',
          name: 'Formal Slacks',
          category: 'Bottoms',
          color: 'Black',
          image: getRealisticImage('Bottoms'),
          season: ['All Season'],
          brand: 'Designer Brand'
        };
        
        const formalShoes = {
          id: 'formal-shoes',
          name: 'Leather Oxfords',
          category: 'Footwear',
          color: 'Black',
          image: getRealisticImage('Footwear'),
          season: ['All Season'],
          brand: 'Designer Brand'
        };
        
        outfit = [formalTop, formalBottom, formalShoes];
      } else if (occasion === 'workout') {
        // For workout, select athletic wear
        const athleticTop = {
          id: 'athletic-top',
          name: 'Performance Tee',
          category: 'Tops',
          color: 'Gray',
          image: getRealisticImage('Tops'),
          season: ['All Season'],
          brand: 'Athletic Brand'
        };
        
        const athleticBottom = {
          id: 'athletic-bottom',
          name: 'Athletic Shorts',
          category: 'Bottoms',
          color: 'Black',
          image: getRealisticImage('Bottoms'),
          season: ['All Season'],
          brand: 'Athletic Brand'
        };
        
        const athleticShoes = {
          id: 'athletic-shoes',
          name: 'Running Shoes',
          category: 'Footwear',
          color: 'Multi',
          image: getRealisticImage('Footwear'),
          season: ['All Season'],
          brand: 'Athletic Brand'
        };
        
        outfit = [athleticTop, athleticBottom, athleticShoes];
      } else {
        // For casual and other occasions
        if (Math.random() > 0.3 && dresses.length > 0 && ['date', 'party'].includes(occasion)) {
          // Sometimes choose a dress for date or party
          const dress = dresses[0] || {
            id: 'casual-dress',
            name: 'Casual Dress',
            category: 'Dresses',
            color: 'Blue',
            image: getRealisticImage('Dresses'),
            season: ['Spring', 'Summer'],
            brand: 'Fashion Brand'
          };
          
          const shoes = {
            id: 'casual-shoes',
            name: 'Casual Shoes',
            category: 'Footwear',
            color: 'Brown',
            image: getRealisticImage('Footwear'),
            season: ['All Season'],
            brand: 'Fashion Brand'
          };
          
          outfit = [dress, shoes];
        } else {
          // Otherwise choose top and bottom
          const casual = occasion === 'casual';
          const top = tops[0] || {
            id: 'top',
            name: casual ? 'Casual Tee' : 'Stylish Top',
            category: 'Tops',
            color: casual ? 'Gray' : 'Blue',
            image: getRealisticImage('Tops'),
            season: ['Spring', 'Summer', 'Fall'],
            brand: casual ? 'Everyday Brand' : 'Fashion Brand'
          };
          
          const bottom = bottoms[0] || {
            id: 'bottom',
            name: casual ? 'Jeans' : 'Stylish Pants',
            category: 'Bottoms',
            color: casual ? 'Blue' : 'Black',
            image: getRealisticImage('Bottoms'),
            season: ['All Season'],
            brand: casual ? 'Everyday Brand' : 'Fashion Brand'
          };
          
          const shoe = footwear[0] || {
            id: 'shoe',
            name: casual ? 'Sneakers' : 'Stylish Shoes',
            category: 'Footwear',
            color: casual ? 'White' : 'Brown',
            image: getRealisticImage('Footwear'),
            season: ['All Season'],
            brand: casual ? 'Everyday Brand' : 'Fashion Brand'
          };
          
          outfit = [top, bottom, shoe];
          
          // Sometimes add outerwear for certain seasons or occasions
          if (!casual || Math.random() > 0.7) {
            const jacket = outerwear[0] || {
              id: 'jacket',
              name: casual ? 'Casual Jacket' : 'Stylish Jacket',
              category: 'Outerwear',
              color: casual ? 'Blue' : 'Black',
              image: getRealisticImage('Outerwear'),
              season: ['Fall', 'Winter'],
              brand: casual ? 'Everyday Brand' : 'Fashion Brand'
            };
            
            outfit.push(jacket);
          }
        }
      }

      // Generate additional styling elements if designer mode is enabled
      let styleElements = undefined;
      let selectedCelebrity = null;
      let designerNote = null;

      if (designerMode) {
        // Generate a hairstyle recommendation
        const hairstyle: StyleItemType = {
          id: 'hairstyle-' + Date.now(),
          name: occasion === 'formal' ? 'Elegant Updo' : occasion === 'casual' ? 'Textured Waves' : 'Sleek Blowout',
          category: 'Hairstyle',
          image: getStylingImage('hairstyle')
        };

        // Generate makeup recommendation
        const makeup: StyleItemType = {
          id: 'makeup-' + Date.now(),
          name: occasion === 'formal' ? 'Glam Evening Look' : occasion === 'casual' ? 'Natural No-Makeup Look' : 'Polished Daytime',
          category: 'Makeup',
          image: getStylingImage('makeup')
        };

        // Generate jewelry recommendation
        const jewelry: StyleItemType[] = [
          {
            id: 'jewelry-1-' + Date.now(),
            name: occasion === 'formal' ? 'Statement Earrings' : 'Delicate Necklace',
            category: 'Jewelry',
            image: getStylingImage('jewelry'),
            brand: occasion === 'formal' ? 'Luxury Brand' : 'Contemporary Brand',
            price: occasion === 'formal' ? '$250' : '$85'
          }
        ];

        // For formal occasions, add more jewelry
        if (['formal', 'party', 'date'].includes(occasion)) {
          jewelry.push({
            id: 'jewelry-2-' + Date.now(),
            name: 'Bracelet',
            category: 'Jewelry',
            image: getStylingImage('jewelry'),
            brand: 'Designer Brand',
            price: '$175'
          });
        }

        // Generate eyewear if not formal occasion
        const eyewear = ['formal', 'party'].includes(occasion) ? undefined : {
          id: 'eyewear-' + Date.now(),
          name: occasion === 'casual' ? 'Trendy Sunglasses' : 'Classic Frames',
          category: 'Eyewear',
          image: getStylingImage('eyewear')
        };

        // Generate nail art recommendation
        const nails = {
          id: 'nails-' + Date.now(),
          name: occasion === 'formal' ? 'Classic French Manicure' : occasion === 'party' ? 'Statement Nails' : 'Natural Polish',
          category: 'Nails',
          image: getStylingImage('nails')
        };

        // Footwear if not already in outfit
        const designerFootwear = outfit.some(item => item.category === 'Footwear') ? undefined : {
          id: 'footwear-' + Date.now(),
          name: occasion === 'formal' ? 'Designer Heels' : occasion === 'casual' ? 'Leather Boots' : 'Stylish Flats',
          category: 'Footwear',
          image: getRealisticImage('Footwear')
        };

        styleElements = {
          hairstyle,
          makeup,
          jewelry,
          eyewear,
          nails,
          footwear: designerFootwear
        };

        // Select a random celebrity inspiration based on the occasion
        const celebs = celebrityInspirations[occasion as keyof typeof celebrityInspirations] || [];
        if (celebs.length > 0) {
          selectedCelebrity = celebs[Math.floor(Math.random() * celebs.length)];
        }

        // Select a random designer note
        const notes = designerNotes[occasion as keyof typeof designerNotes] || [];
        if (notes.length > 0) {
          designerNote = notes[Math.floor(Math.random() * notes.length)];
        }
      }
      
      const newOutfit: OutfitType = {
        id: Date.now().toString(),
        title: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Outfit`,
        occasion: occasion,
        items: outfit,
        thumbnail: outfit[0].image,
        styleElements: designerMode ? styleElements : undefined,
        celebrityInspiration: selectedCelebrity,
        designerNotes: designerNote
      };
      
      setCurrentOutfit(newOutfit);
      setOutfitName(newOutfit.title);
      setCelebrityInspiration(selectedCelebrity);
      setGeneratedOutfits([newOutfit, ...generatedOutfits.slice(0, 4)]);
      setIsGenerating(false);
    }, 1500);
  };

  const saveOutfit = () => {
    if (currentOutfit) {
      const outfitToSave = {
        ...currentOutfit,
        title: outfitName || currentOutfit.title,
        celebrityInspiration: celebrityInspiration || currentOutfit.celebrityInspiration
      };
      
      setSavedOutfits([outfitToSave, ...savedOutfits]);
      toast.success('Outfit saved to your collection!');
    }
  };

  const handleFeedback = (positive: boolean) => {
    toast.success(
      positive 
        ? 'Thanks! This helps improve your recommendations' 
        : 'Got it! We\'ll suggest different styles next time'
    );
  };

  const toggleDesignerMode = () => {
    setDesignerMode(!designerMode);
    if (!designerMode) {
      toast.success('Celebrity Costume Designer Mode activated!');
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Outfit Generator</h1>
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-closetx-teal border-closetx-teal ${designerMode ? 'bg-closetx-teal/10' : ''}`}
            onClick={toggleDesignerMode}
          >
            <Star size={16} className="mr-1" fill={designerMode ? "currentColor" : "none"} />
            {designerMode ? 'Costume Designer Active' : 'Costume Designer Mode'}
          </Button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">What's the occasion?</label>
            <div className="flex flex-wrap gap-2">
              {occasions.map(o => (
                <Button 
                  key={o}
                  variant={occasion === o ? "default" : "outline"}
                  className={`text-xs ${occasion === o ? 'bg-closetx-teal' : ''}`}
                  onClick={() => setOccasion(o)}
                >
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {designerMode && (
            <div>
              <label className="text-sm font-medium mb-2 flex items-center">
                <Star size={16} className="mr-2" />
                Celebrity Inspiration (Optional)
              </label>
              <Input 
                placeholder="Enter celebrity name"
                value={celebrityInspiration || ''}
                onChange={(e) => setCelebrityInspiration(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium mb-2 flex items-center">
              <Calendar size={16} className="mr-2" />
              When will you wear it?
            </label>
            <Input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <Button
            onClick={generateOutfit}
            className="w-full bg-closetx-teal"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4 fill-yellow-400" />
                Generate Outfit
              </>
            )}
          </Button>
          
          {currentOutfit && (
            <div className="mt-6 space-y-6">
              <div className="border-t pt-6 flex items-center justify-between">
                <div className="flex-1">
                  <input
                    type="text"
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    className="text-xl font-bold bg-transparent border-b border-dashed border-gray-300 w-full focus:outline-none focus:border-closetx-teal"
                    placeholder="Name your outfit"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {currentOutfit.items.length} items • {currentOutfit.occasion}
                  </p>
                </div>
                
                <Button onClick={saveOutfit} className="bg-closetx-teal">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentOutfit.items.map(item => (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.category}
                        </Badge>
                        {item.brand && (
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {designerMode && currentOutfit.styleElements && (
                <div>
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Star size={16} className="mr-2 text-yellow-400 fill-yellow-400" />
                    Styling Elements
                  </h3>
                  
                  <Tabs defaultValue="hair" className="w-full">
                    <TabsList className="w-full flex overflow-x-auto">
                      {currentOutfit.styleElements.hairstyle && (
                        <TabsTrigger value="hair" className="flex-1">Hairstyle</TabsTrigger>
                      )}
                      {currentOutfit.styleElements.makeup && (
                        <TabsTrigger value="makeup" className="flex-1">Makeup</TabsTrigger>
                      )}
                      {currentOutfit.styleElements.jewelry && (
                        <TabsTrigger value="jewelry" className="flex-1">Jewelry</TabsTrigger>
                      )}
                      {currentOutfit.styleElements.eyewear && (
                        <TabsTrigger value="eyewear" className="flex-1">Eyewear</TabsTrigger>
                      )}
                      {currentOutfit.styleElements.nails && (
                        <TabsTrigger value="nails" className="flex-1">Nails</TabsTrigger>
                      )}
                    </TabsList>
                    
                    {currentOutfit.styleElements.hairstyle && (
                      <TabsContent value="hair" className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img 
                              src={currentOutfit.styleElements.hairstyle.image} 
                              alt={currentOutfit.styleElements.hairstyle.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-medium text-lg">{currentOutfit.styleElements.hairstyle.name}</h4>
                            <p className="text-sm text-gray-600 mt-2">
                              This hairstyle complements the outfit's {occasion} vibe while framing your face beautifully.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    )}
                    
                    {currentOutfit.styleElements.makeup && (
                      <TabsContent value="makeup" className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img 
                              src={currentOutfit.styleElements.makeup.image} 
                              alt={currentOutfit.styleElements.makeup.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-medium text-lg">{currentOutfit.styleElements.makeup.name}</h4>
                            <p className="text-sm text-gray-600 mt-2">
                              This makeup look enhances your natural features while perfectly complementing your outfit choice.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    )}
                    
                    {currentOutfit.styleElements.jewelry && (
                      <TabsContent value="jewelry" className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentOutfit.styleElements.jewelry.map((item) => (
                            <div key={item.id} className="border rounded-lg overflow-hidden">
                              <div className="aspect-square">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium">{item.name}</h4>
                                {item.brand && (
                                  <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                                )}
                                {item.price && (
                                  <p className="text-sm font-medium mt-1">{item.price}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    )}
                    
                    {currentOutfit.styleElements.eyewear && (
                      <TabsContent value="eyewear" className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img 
                              src={currentOutfit.styleElements.eyewear.image} 
                              alt={currentOutfit.styleElements.eyewear.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-medium text-lg">{currentOutfit.styleElements.eyewear.name}</h4>
                            <p className="text-sm text-gray-600 mt-2">
                              These frames add a touch of personality while complementing the overall aesthetic of your look.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    )}
                    
                    {currentOutfit.styleElements.nails && (
                      <TabsContent value="nails" className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img 
                              src={currentOutfit.styleElements.nails.image} 
                              alt={currentOutfit.styleElements.nails.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-medium text-lg">{currentOutfit.styleElements.nails.name}</h4>
                            <p className="text-sm text-gray-600 mt-2">
                              This nail design adds a refined finishing touch that ties your entire look together.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              )}
              
              {designerMode && currentOutfit.designerNotes && (
                <div className="bg-neutral-50 p-4 rounded-lg border border-dashed">
                  <h3 className="font-medium mb-2">Designer Notes</h3>
                  <p className="text-sm italic">{currentOutfit.designerNotes}</p>
                  {currentOutfit.celebrityInspiration && (
                    <div className="mt-2 flex items-center">
                      <Badge className="bg-closetx-teal/60">
                        Inspired by {currentOutfit.celebrityInspiration}
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleFeedback(true)}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Love it
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleFeedback(false)}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Not for me
                </Button>
              </div>
            </div>
          )}
          
          {generatedOutfits.length > 0 && !currentOutfit && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-3">Recent Outfits</h3>
              <div className="grid grid-cols-2 gap-3">
                {generatedOutfits.map((outfit) => (
                  <div 
                    key={outfit.id} 
                    className="border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setCurrentOutfit(outfit)}
                  >
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={outfit.thumbnail} 
                        alt={outfit.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-2 text-white">
                          <p className="font-medium text-sm">{outfit.title}</p>
                          <p className="text-xs opacity-90">{outfit.items.length} items</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {savedOutfits.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-3">Saved Outfits</h3>
              <div className="grid grid-cols-2 gap-3">
                {savedOutfits.map((outfit) => (
                  <div 
                    key={outfit.id} 
                    className="border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setCurrentOutfit(outfit)}
                  >
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={outfit.thumbnail} 
                        alt={outfit.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-2 text-white">
                          <p className="font-medium text-sm">{outfit.title}</p>
                          <p className="text-xs opacity-90">{outfit.occasion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default OutfitGenerator;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Calendar, Tag, Star, RefreshCw, ThumbsUp, ThumbsDown, Eye, Zap } from 'lucide-react';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import StarRating from '@/components/UI/StarRating';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { OutfitType, StyleItemType } from '../Wardrobe/OutfitSuggestion';
import SkinToneAnalyzer from '../Camera/SkinToneAnalyzer';

type OutfitGeneratorProps = {
  wardrobe: ClothingItemType[];
};

type SkinToneType = 'fair' | 'light' | 'medium' | 'olive' | 'tan' | 'deep';
type FaceShapeType = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangle';

// Realistic clothing images - using high-quality real product photography
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
  ],
  models: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
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
  if (lowerCategory === 'model' || lowerCategory === 'person')
    return realClothingImages.models[Math.floor(Math.random() * realClothingImages.models.length)];
  
  // Fallback to tops if category doesn't match
  return realClothingImages.tops[Math.floor(Math.random() * realClothingImages.tops.length)];
};

const OutfitGenerator: React.FC<OutfitGeneratorProps> = ({ wardrobe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [occasion, setOccasion] = useState('casual');
  const [formality, setFormality] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<ClothingItemType[] | null>(null);
  const [styleMatchScore, setStyleMatchScore] = useState(0);
  const [designerMode, setDesignerMode] = useState(false);
  const [celebrityInspiration, setCelebrityInspiration] = useState<string | null>(null);
  const [styleElements, setStyleElements] = useState<Record<string, any> | null>(null);
  const [skinToneData, setSkinToneData] = useState<{
    skinTone: SkinToneType;
    faceShape: FaceShapeType;
    imageUrl: string;
  } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewOutfit, setPreviewOutfit] = useState<ClothingItemType[] | null>(null);
  const [previewType, setPreviewType] = useState<'silhouette' | 'model'>('silhouette');

  const occasions = ['casual', 'formal', 'work', 'date', 'party', 'workout'];

  // Celebrity inspirations for different occasions
  const celebrityInspirations = {
    casual: ['Jennifer Aniston', 'Zendaya', 'Ryan Reynolds', 'Timothée Chalamet'],
    formal: ['Blake Lively', 'Cate Blanchett', 'Michael B. Jordan', 'Tom Ford'],
    work: ['Amal Clooney', 'Victoria Beckham', 'David Beckham', 'Ryan Gosling'],
    date: ['Emily Ratajkowski', 'Margot Robbie', 'Harry Styles', 'Chris Hemsworth'],
    party: ['Rihanna', 'Dua Lipa', 'A$AP Rocky', 'Bad Bunny'],
    workout: ['Dua Lipa', 'Kendall Jenner', 'Chris Hemsworth', 'The Rock']
  };

  // Helper function to get a model image
  const getModelImage = () => {
    const index = Math.floor(Math.random() * realClothingImages.models.length);
    return realClothingImages.models[index];
  };

  const generateOutfit = () => {
    setIsGenerating(true);
    
    // Simulate AI outfit generation with a delay
    setTimeout(() => {
      // Enhanced algorithm to create more realistic outfits
      const tops = wardrobe.filter(item => item.category === 'Tops');
      const bottoms = wardrobe.filter(item => item.category === 'Bottoms');
      const footwear = wardrobe.filter(item => item.category === 'Footwear');
      const dresses = wardrobe.filter(item => item.category === 'Dresses');
      const outerwear = wardrobe.filter(item => item.category === 'Outerwear');
      
      // Build a coherent outfit based on occasion
      let outfit: ClothingItemType[] = [];
      
      // Color recommendations based on skin tone if available
      const colorRecommendation = skinToneData ? getColorForSkinTone(skinToneData.skinTone) : null;
      
      if (occasion === 'formal') {
        // For formal occasions, prefer dress shirts, formal pants, etc.
        const formalTop = tops.length > 0 
          ? {...tops[Math.floor(Math.random() * tops.length)], image: getRealisticImage('Tops')} 
          : {
              id: 'generated-top',
              name: 'Formal Shirt',
              category: 'Tops',
              color: colorRecommendation?.tops || 'White',
              image: getRealisticImage('Tops'),
              season: ['All Season'],
              brand: 'Designer'
            };
            
        const formalBottom = bottoms.length > 0 
          ? {...bottoms[Math.floor(Math.random() * bottoms.length)], image: getRealisticImage('Bottoms')} 
          : {
              id: 'generated-bottom',
              name: 'Formal Pants',
              category: 'Bottoms',
              color: colorRecommendation?.bottoms || 'Black',
              image: getRealisticImage('Bottoms'),
              season: ['All Season'],
              brand: 'Designer'
            };
            
        const formalShoes = footwear.length > 0 
          ? {...footwear[Math.floor(Math.random() * footwear.length)], image: getRealisticImage('Footwear')} 
          : {
              id: 'generated-shoes',
              name: 'Formal Shoes',
              category: 'Footwear',
              color: colorRecommendation?.accessories || 'Black',
              image: getRealisticImage('Footwear'),
              season: ['All Season'],
              brand: 'Designer'
            };
            
        outfit = [formalTop, formalBottom, formalShoes];
      } else if (occasion === 'casual') {
        // For casual, maybe include T-shirts, jeans, sneakers
        const casualTop = tops.length > 0 
          ? {...tops[Math.floor(Math.random() * tops.length)], image: getRealisticImage('Tops')} 
          : {
              id: 'generated-top',
              name: 'Casual T-Shirt',
              category: 'Tops',
              color: colorRecommendation?.tops || 'Blue',
              image: getRealisticImage('Tops'),
              season: ['All Season'],
              brand: 'Casual Brand'
            };
            
        const casualBottom = bottoms.length > 0 
          ? {...bottoms[Math.floor(Math.random() * bottoms.length)], image: getRealisticImage('Bottoms')} 
          : {
              id: 'generated-bottom',
              name: 'Jeans',
              category: 'Bottoms',
              color: colorRecommendation?.bottoms || 'Blue',
              image: getRealisticImage('Bottoms'),
              season: ['All Season'],
              brand: 'Casual Brand'
            };
            
        const casualShoes = footwear.length > 0 
          ? {...footwear[Math.floor(Math.random() * footwear.length)], image: getRealisticImage('Footwear')} 
          : {
              id: 'generated-shoes',
              name: 'Sneakers',
              category: 'Footwear',
              color: colorRecommendation?.accessories || 'White',
              image: getRealisticImage('Footwear'),
              season: ['All Season'],
              brand: 'Casual Brand'
            };
            
        outfit = [casualTop, casualBottom, casualShoes];
      } else {
        // For other occasions, create appropriate outfits
        if (Math.random() > 0.6 && dresses.length > 0) {
          // Sometimes choose a dress for certain occasions
          const dress = dresses.length > 0 
            ? {...dresses[Math.floor(Math.random() * dresses.length)], image: getRealisticImage('Dresses')} 
            : {
                id: 'generated-dress',
                name: 'Stylish Dress',
                category: 'Dresses',
                color: 'Black',
                image: getRealisticImage('Dresses'),
                season: ['All Season'],
                brand: 'Fashion Brand'
              };
              
          const dressShoes = footwear.length > 0 
            ? {...footwear[Math.floor(Math.random() * footwear.length)], image: getRealisticImage('Footwear')} 
            : {
                id: 'generated-shoes',
                name: 'Elegant Shoes',
                category: 'Footwear',
                color: 'Black',
                image: getRealisticImage('Footwear'),
                season: ['All Season'],
                brand: 'Fashion Brand'
              };
              
          outfit = [dress, dressShoes];
        } else {
          // Otherwise choose top and bottom
          const top = tops.length > 0 
            ? {...tops[Math.floor(Math.random() * tops.length)], image: getRealisticImage('Tops')} 
            : {
                id: 'generated-top',
                name: 'Stylish Top',
                category: 'Tops',
                color: 'Various',
                image: getRealisticImage('Tops'),
                season: ['All Season'],
                brand: 'Fashion Brand'
              };
              
          const bottom = bottoms.length > 0 
            ? {...bottoms[Math.floor(Math.random() * bottoms.length)], image: getRealisticImage('Bottoms')} 
            : {
                id: 'generated-bottom',
                name: 'Stylish Bottoms',
                category: 'Bottoms',
                color: 'Various',
                image: getRealisticImage('Bottoms'),
                season: ['All Season'],
                brand: 'Fashion Brand'
              };
              
          const shoes = footwear.length > 0 
            ? {...footwear[Math.floor(Math.random() * footwear.length)], image: getRealisticImage('Footwear')} 
            : {
                id: 'generated-shoes',
                name: 'Stylish Shoes',
                category: 'Footwear',
                color: 'Various',
                image: getRealisticImage('Footwear'),
                season: ['All Season'],
                brand: 'Fashion Brand'
              };
              
          outfit = [top, bottom, shoes];
          
          // Sometimes add outerwear for certain seasons or formality
          if (formality[0] > 70 || Math.random() > 0.7) {
            const jacket = outerwear.length > 0 
              ? {...outerwear[Math.floor(Math.random() * outerwear.length)], image: getRealisticImage('Outerwear')} 
              : {
                  id: 'generated-outerwear',
                  name: 'Stylish Jacket',
                  category: 'Outerwear',
                  color: 'Various',
                  image: getRealisticImage('Outerwear'),
                  season: ['Fall', 'Winter'],
                  brand: 'Fashion Brand'
                };
                
            outfit.push(jacket);
          }
        }
      }
      
      // Add styling elements if designer mode is enabled
      if (designerMode) {
        // Generate random celebrity inspiration
        const occasionCelebs = celebrityInspirations[occasion as keyof typeof celebrityInspirations] || [];
        if (occasionCelebs.length > 0) {
          setCelebrityInspiration(occasionCelebs[Math.floor(Math.random() * occasionCelebs.length)]);
        }
        
        // Generate styling elements like hairstyle, makeup, etc.
        const hairstyleRec = skinToneData ? getHairstyleForFaceShape(skinToneData.faceShape) : 'Casual Waves';
        
        setStyleElements({
          hairstyle: {
            name: occasion === 'formal' ? 'Elegant Updo' : hairstyleRec,
            image: getRealisticImage('hairstyle')
          },
          makeup: {
            name: occasion === 'formal' ? 'Evening Glam' : 'Natural Look',
            image: getRealisticImage('makeup')
          },
          jewelry: [
            {
              name: 'Statement Necklace',
              image: getRealisticImage('jewelry')
            }
          ]
        });
      }
      
      setGeneratedOutfit(outfit);
      setStyleMatchScore(skinToneData ? 5 : 4 + Math.random()); // Higher score if we have skin tone analysis
      
      setIsGenerating(false);
    }, 1500);
  };

  const getColorForSkinTone = (skinTone: SkinToneType): {tops: string, bottoms: string, accessories: string} => {
    // Color recommendations based on skin tone
    switch(skinTone) {
      case 'fair':
        return {
          tops: ['Navy', 'Burgundy', 'Forest Green'][Math.floor(Math.random() * 3)],
          bottoms: ['Navy', 'Charcoal', 'Burgundy'][Math.floor(Math.random() * 3)],
          accessories: ['Silver', 'Blue', 'Purple'][Math.floor(Math.random() * 3)]
        };
      case 'light':
        return {
          tops: ['Teal', 'Lavender', 'Dusty Pink'][Math.floor(Math.random() * 3)],
          bottoms: ['Navy', 'Gray', 'Dark Teal'][Math.floor(Math.random() * 3)],
          accessories: ['Silver', 'Rose Gold', 'Blue'][Math.floor(Math.random() * 3)]
        };
      case 'medium':
        return {
          tops: ['Olive Green', 'Coral', 'Royal Blue'][Math.floor(Math.random() * 3)],
          bottoms: ['Dark Brown', 'Navy', 'Olive'][Math.floor(Math.random() * 3)],
          accessories: ['Gold', 'Bronze', 'Green'][Math.floor(Math.random() * 3)]
        };
      case 'olive':
        return {
          tops: ['Cream', 'Purple', 'Forest Green'][Math.floor(Math.random() * 3)],
          bottoms: ['Dark Brown', 'Navy', 'Charcoal'][Math.floor(Math.random() * 3)],
          accessories: ['Gold', 'Copper', 'Purple'][Math.floor(Math.random() * 3)]
        };
      case 'tan':
        return {
          tops: ['Turquoise', 'Coral', 'Royal Blue'][Math.floor(Math.random() * 3)],
          bottoms: ['White', 'Khaki', 'Navy'][Math.floor(Math.random() * 3)],
          accessories: ['Gold', 'Turquoise', 'Coral'][Math.floor(Math.random() * 3)]
        };
      case 'deep':
        return {
          tops: ['Bright Yellow', 'Fuchsia', 'Emerald'][Math.floor(Math.random() * 3)],
          bottoms: ['White', 'Navy', 'Dark Brown'][Math.floor(Math.random() * 3)],
          accessories: ['Gold', 'Bright Colors', 'Green'][Math.floor(Math.random() * 3)]
        };
      default:
        return {
          tops: 'White',
          bottoms: 'Black',
          accessories: 'Silver'
        };
    }
  };
  
  const getHairstyleForFaceShape = (faceShape: FaceShapeType): string => {
    // Hairstyle recommendations based on face shape
    switch(faceShape) {
      case 'oval':
        return 'Any style works well';
      case 'round':
        return 'Layered cuts with height';
      case 'square':
        return 'Soft layers around the face';
      case 'heart':
        return 'Side-swept bangs';
      case 'diamond':
        return 'Textured, mid-length cuts';
      case 'rectangle':
        return 'Styles with volume on the sides';
      default:
        return 'Casual Waves';
    }
  };
  
  const handleSkinToneAnalysis = (data: {
    skinTone: SkinToneType;
    faceShape: FaceShapeType;
    imageUrl: string;
  }) => {
    setSkinToneData(data);
    toast.success(`Analysis complete! ${data.skinTone} skin tone and ${data.faceShape} face shape detected.`);
  };

  const handleSave = () => {
    // In a real app, this would save the outfit to the user's saved outfits
    toast.success('Outfit saved to your collection!');
    setIsOpen(false);
    // Reset for next generation
    setGeneratedOutfit(null);
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
    toast.success(designerMode ? 'Designer mode disabled' : 'Celebrity stylist mode enabled!');
  };

  const togglePreviewMode = () => {
    if (!generatedOutfit) {
      toast.error('Generate an outfit first to preview');
      return;
    }
    
    setPreviewMode(!previewMode);
    if (!previewMode) {
      // When entering preview mode, set the outfit to preview
      setPreviewOutfit(generatedOutfit);
    }
  };

  const switchPreviewType = () => {
    setPreviewType(previewType === 'silhouette' ? 'model' : 'silhouette');
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-closetx-teal w-full hover:bg-closetx-teal/90 text-white"
      >
        <Star className="mr-2 h-5 w-5" />
        Generate Your Perfect Outfit
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              Generate Your Perfect Outfit
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!generatedOutfit ? (
              <>
                <div className="space-y-4">
                  <div className="mb-4">
                    <SkinToneAnalyzer onAnalysisComplete={handleSkinToneAnalysis} />
                    {skinToneData && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md text-xs text-green-700 flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ 
                            backgroundColor: skinToneData.skinTone === 'fair' ? '#f8d7da' : 
                                          skinToneData.skinTone === 'light' ? '#f5e0d2' : 
                                          skinToneData.skinTone === 'medium' ? '#e6c9a8' : 
                                          skinToneData.skinTone === 'olive' ? '#c9b38c' : 
                                          skinToneData.skinTone === 'tan' ? '#b59a7c' : 
                                          skinToneData.skinTone === 'deep' ? '#8d5a4a' : '#e6c9a8'
                          }} 
                        />
                        <span>
                          {skinToneData.skinTone.charAt(0).toUpperCase() + skinToneData.skinTone.slice(1)} skin tone, 
                          {skinToneData.faceShape.charAt(0).toUpperCase() + skinToneData.faceShape.slice(1)} face shape
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Occasion</label>
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
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Formality Level</label>
                    <Slider
                      defaultValue={formality}
                      max={100}
                      step={10}
                      onValueChange={setFormality}
                      className="my-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Casual</span>
                      <span>Formal</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Planned For
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleDesignerMode}
                      className={`flex-1 ${designerMode ? 'bg-closetx-teal/10 border-closetx-teal text-closetx-teal' : ''}`}
                    >
                      <Star className="mr-2 h-4 w-4" fill={designerMode ? "currentColor" : "none"} />
                      Celebrity Stylist Mode
                    </Button>
                  </div>
                  
                  {designerMode && (
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        Get complete styling suggestions inspired by celebrities!
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(celebrityInspirations).map(([key, celebrities]) => (
                          <div key={key} className="text-xs">
                            <span className="font-medium capitalize">{key}:</span>
                            <span className="text-gray-500"> {celebrities[0]}, {celebrities[1]}...</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                      Generate {designerMode ? "Celebrity Look" : "Outfit"}
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div>
                {/* Display celebrity inspiration if available */}
                {designerMode && celebrityInspiration && (
                  <div className="mb-4 bg-gradient-to-r from-closetx-teal/20 to-purple-100 p-3 rounded-lg">
                    <p className="text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-2 fill-yellow-400" />
                      Inspired by {celebrityInspiration}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium text-closetx-teal">
                    Your perfect outfit for {occasion}!
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Style Match:</span>
                    <StarRating rating={styleMatchScore} size={14} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {generatedOutfit.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="aspect-square">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <p className="text-xs text-gray-600">{item.brand}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center gap-3 my-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(true)}
                    className="flex-1"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Love it
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(false)}
                    className="flex-1"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Not for me
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedOutfit(null)}
                    className="flex-1"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-closetx-teal"
                  >
                    <Star className="mr-2 h-4 w-4 fill-yellow-400" />
                    Save Outfit
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={togglePreviewMode}
                    className="w-full bg-closetx-teal/10 hover:bg-closetx-teal/20 text-closetx-teal border-closetx-teal/30"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode ? "Hide Preview" : "Preview This Look"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {previewMode && previewOutfit && (
        <Dialog open={previewMode} onOpenChange={setPreviewMode}>
          <DialogContent className="sm:max-w-[800px] h-[80vh] p-0 overflow-hidden">
            <div className="relative h-full bg-gradient-to-b from-gray-50 to-gray-100">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={switchPreviewType}
                  className="bg-white/80 hover:bg-white shadow-sm"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Switch to {previewType === 'silhouette' ? 'Model' : 'Silhouette'} View
                </Button>
              </div>
              
              {previewType === 'silhouette' ? (
                /* Silhouette preview */
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full">
                    {/* Base silhouette */}
                    <div className="h-full flex items-center justify-center">
                      <div className="bg-gray-300 w-64 h-[70vh] rounded-t-full"></div>
                    </div>
                    
                    {/* Outfit pieces positioned on the silhouette */}
                    {previewOutfit.map((item, index) => {
                      // Position each item based on its category
                      let positionClass = "";
                      if (item.category === "Tops") {
                        positionClass = "absolute top-[20%] left-1/2 transform -translate-x-1/2 w-56";
                      } else if (item.category === "Bottoms") {
                        positionClass = "absolute top-[55%] left-1/2 transform -translate-x-1/2 w-56";
                      } else if (item.category === "Footwear") {
                        positionClass = "absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32";
                      } else if (item.category === "Outerwear") {
                        positionClass = "absolute top-[15%] left-1/2 transform -translate-x-1/2 w-64";
                      } else if (item.category === "Dresses") {
                        positionClass = "absolute top-[25%] left-1/2 transform -translate-x-1/2 w-56";
                      }
                      
                      return (
                        <div key={item.id} className={positionClass}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                    
                    {/* Face image if skin tone analysis was done */}
                    {skinToneData && (
                      <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                        <img 
                          src={skinToneData.imageUrl} 
                          alt="Face" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Model preview */
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full w-full">
                    {/* Model image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={getModelImage()} 
                        alt="Model" 
                        className="h-[80vh] object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Semi-transparent overlay of clothing items */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative flex flex-col items-center space-y-4">
                        {previewOutfit.map((item, index) => (
                          <div key={item.id} className="text-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="max-w-[200px] max-h-[150px] object-contain rounded shadow-lg"
                              style={{ opacity: 0.95 }}
                              loading="lazy"
                            />
                            <p className="mt-1 text-sm font-medium bg-white/80 rounded px-2 py-0.5">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Color palette based on skin tone */}
              {skinToneData && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-lg">
                  <p className="text-sm font-medium mb-2">Recommended colors for your skin tone:</p>
                  <div className="flex gap-2 justify-center">
                    {Object.entries(getColorForSkinTone(skinToneData.skinTone)).map(([type, color], i) => (
                      <div key={i} className="text-center">
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mb-1" 
                          style={{ backgroundColor: typeof color === 'string' ? color : '#ccc' }}
                        ></div>
                        <p className="text-xs">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OutfitGenerator;

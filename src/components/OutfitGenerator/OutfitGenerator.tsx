
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Calendar, Tag, Star, RefreshCw } from 'lucide-react';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';

type OutfitGeneratorProps = {
  wardrobe: ClothingItemType[];
};

const OutfitGenerator: React.FC<OutfitGeneratorProps> = ({ wardrobe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [occasion, setOccasion] = useState('casual');
  const [formality, setFormality] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<ClothingItemType[] | null>(null);

  const occasions = ['casual', 'formal', 'work', 'date', 'party', 'workout'];

  const generateOutfit = () => {
    setIsGenerating(true);
    
    // Simulate AI outfit generation with a delay
    setTimeout(() => {
      // Simple algorithm to select items based on category and occasion
      // In a real app, this would be replaced with an actual AI algorithm
      const tops = wardrobe.filter(item => item.category === 'Tops');
      const bottoms = wardrobe.filter(item => item.category === 'Bottoms');
      const footwear = wardrobe.filter(item => item.category === 'Footwear');
      
      // Simple selection logic - in a real app this would be more sophisticated
      const selectedTop = tops.length > 0 ? tops[Math.floor(Math.random() * tops.length)] : null;
      const selectedBottom = bottoms.length > 0 ? bottoms[Math.floor(Math.random() * bottoms.length)] : null;
      const selectedFootwear = footwear.length > 0 ? footwear[Math.floor(Math.random() * footwear.length)] : null;
      
      const outfit = [selectedTop, selectedBottom, selectedFootwear].filter(item => item !== null) as ClothingItemType[];
      
      setGeneratedOutfit(outfit);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSave = () => {
    // In a real app, this would save the outfit to the user's saved outfits
    setIsOpen(false);
    // Reset for next generation
    setGeneratedOutfit(null);
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-closetx-teal w-full hover:bg-closetx-teal/90 text-white"
      >
        <Star className="mr-2 h-5 w-5" />
        Generate Perfect Outfit
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Your Perfect Outfit</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {!generatedOutfit ? (
              <>
                <div className="space-y-4">
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
                    "Generate Outfit"
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-center font-medium text-closetx-teal">
                  Here's your perfect outfit for {occasion}!
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {generatedOutfit.map(item => (
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
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
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
                    <Star className="mr-2 h-4 w-4" />
                    Save Outfit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OutfitGenerator;

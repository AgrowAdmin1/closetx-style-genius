import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, RefreshCw, Save, Star, ThumbsUp, ThumbsDown, Eye, Camera } from 'lucide-react';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import { OutfitType } from '@/components/Wardrobe/OutfitSuggestion';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import OutfitSuggestion from '@/components/Wardrobe/OutfitSuggestion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SkinToneAnalyzer from '@/components/Camera/SkinToneAnalyzer';
import CameraCapture from '@/components/Camera/CameraCapture';
import VirtualTryOn from '@/components/OutfitGenerator/VirtualTryOn';

type SkinToneType = 'fair' | 'light' | 'medium' | 'olive' | 'tan' | 'deep';
type FaceShapeType = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangle';

const OutfitGenerator = () => {
  const [occasion, setOccasion] = useState('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [outfitName, setOutfitName] = useState('');
  const [currentOutfit, setCurrentOutfit] = useState<OutfitType | null>(null);
  const [generatedOutfits, setGeneratedOutfits] = useState<OutfitType[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<OutfitType[]>([]);
  const [designerMode, setDesignerMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [userTryOnImage, setUserTryOnImage] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<'silhouette' | 'virtual'>('silhouette');

  const occasions = ['casual', 'formal', 'work', 'date', 'party', 'workout'];

  const generateOutfit = () => {
    setIsGenerating(true);
    // Simulate outfit generation
    setTimeout(() => {
      // Logic to generate outfit
      setIsGenerating(false);
    }, 1500);
  };

  const saveOutfit = () => {
    if (currentOutfit) {
      setSavedOutfits([currentOutfit, ...savedOutfits]);
      toast.success('Outfit saved to your collection!');
    }
  };

  const viewOutfitDetails = (outfit: OutfitType) => {
    // Logic to view outfit details
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Outfit Generator</h1>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <SkinToneAnalyzer onAnalysisComplete={() => {}} />
          <Button onClick={generateOutfit} className="w-full bg-closetx-teal">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating your perfect outfit...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Generate Your Perfect Outfit
              </>
            )}
          </Button>
        </div>

        {currentOutfit && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4 mt-6">
            <h2 className="text-lg font-semibold">Your Perfect Outfit</h2>
            <OutfitSuggestion outfit={currentOutfit} onClick={() => viewOutfitDetails(currentOutfit)} />
            <div className="flex gap-2">
              <Button onClick={saveOutfit} className="flex-1 bg-closetx-teal">
                <Save className="mr-2 h-4 w-4" />
                Save This Look
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => {
                setPreviewContent('silhouette');
                setUserTryOnImage(null);
                setShowPreview(true);
              }}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>
        )}

        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="sm:max-w-[800px] h-[80vh] p-0 overflow-hidden">
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <Button onClick={() => {
                if (previewContent === 'silhouette') {
                  setShowCamera(true);
                } else {
                  setPreviewContent('silhouette');
                }
              }}>
                {previewContent === 'silhouette' ? 'Virtual Try-On' : 'Show Silhouette'}
              </Button>
            </div>
            {previewContent === 'virtual' && userTryOnImage ? (
              <VirtualTryOn userImageSrc={userTryOnImage} clothingItems={currentOutfit.items} />
            ) : (
              <div className="relative h-full bg-gray-100">
                {/* Silhouette with outfit overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full">
                    <div className="h-full flex items-center justify-center">
                      <div className="bg-gray-300 w-64 h-[70vh] rounded-t-full"></div>
                    </div>
                    {currentOutfit.items.map((item, index) => (
                      <div key={item.id} className={`absolute ${item.category === 'Tops' ? 'top-[20%]' : 'top-[55%]'} left-1/2 transform -translate-x-1/2 w-56`}>
                        <img src={item.image} alt={item.name} className="w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {showCamera && (
          <CameraCapture
            onCapture={(imageSrc) => {
              setUserTryOnImage(imageSrc);
              setPreviewContent('virtual');
              setShowCamera(false);
              setShowPreview(true);
            }}
            onClose={() => setShowCamera(false)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default OutfitGenerator;

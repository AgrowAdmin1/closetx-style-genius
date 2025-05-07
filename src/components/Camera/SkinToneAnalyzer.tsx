
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Camera, Check, Loader2 } from 'lucide-react';
import CameraCapture from './CameraCapture';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

type SkinToneType = 'fair' | 'light' | 'medium' | 'olive' | 'tan' | 'deep';
type FaceShapeType = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangle';

interface SkinToneAnalysisProps {
  onAnalysisComplete: (data: {
    skinTone: SkinToneType;
    faceShape: FaceShapeType;
    imageUrl: string;
  }) => void;
}

const SkinToneAnalyzer: React.FC<SkinToneAnalysisProps> = ({ onAnalysisComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCameraCapture = (imageSrc: string) => {
    setShowCamera(false);
    setPreviewImage(imageSrc);
    analyzeImage(imageSrc);
  };

  const analyzeImage = (imageSrc: string) => {
    setAnalyzingImage(true);
    
    // Simulate AI analysis of skin tone and face shape
    // In a real app, this would use a computer vision API or ML model
    setTimeout(() => {
      // Placeholder algorithm - would be replaced with actual ML/AI analysis
      const skinTones: SkinToneType[] = ['fair', 'light', 'medium', 'olive', 'tan', 'deep'];
      const faceShapes: FaceShapeType[] = ['oval', 'round', 'square', 'heart', 'diamond', 'rectangle'];
      
      const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
      const faceShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
      
      toast.success('Analysis complete!', {
        description: `Your skin tone is ${skinTone} and face shape is ${faceShape}`
      });
      
      onAnalysisComplete({
        skinTone,
        faceShape,
        imageUrl: imageSrc
      });
      
      setAnalyzingImage(false);
      setIsOpen(false);
    }, 2000); // Simulate processing time
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 bg-white/90 hover:bg-white shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <Camera size={16} />
        Analyze Face & Skin Tone
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setPreviewImage(null);
          setShowCamera(false);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">Analyze Your Features</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!showCamera && !previewImage && (
              <div className="text-center space-y-4">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
                  <p className="text-sm">
                    Take a clear photo of your face in natural lighting for the most accurate results.
                    This helps us recommend colors and styles that truly enhance your natural features.
                  </p>
                </div>
                
                <Button 
                  className="bg-closetx-teal hover:bg-closetx-teal/90 text-white w-full"
                  onClick={() => setShowCamera(true)}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Open Camera
                </Button>
              </div>
            )}
            
            {showCamera && (
              <CameraCapture 
                onCapture={handleCameraCapture} 
                onClose={() => setShowCamera(false)} 
              />
            )}
            
            {previewImage && !showCamera && (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={previewImage} 
                    alt="Your photo" 
                    className="w-full aspect-square object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  {analyzingImage ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin text-closetx-teal" />
                      <p className="text-sm text-center">
                        Analyzing your natural features...<br />
                        <span className="text-xs text-gray-500">This will just take a moment</span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2 w-full">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCamera(true)}
                        className="flex-1"
                      >
                        Retake Photo
                      </Button>
                      <Button
                        className="bg-closetx-teal hover:bg-closetx-teal/90 text-white flex-1"
                        onClick={() => analyzeImage(previewImage)}
                      >
                        <Check className="mr-2 h-4 w-4" /> Analyze Photo
                      </Button>
                    </div>
                  )}
                </div>
                
                {analyzingImage && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {['fair', 'light', 'medium', 'olive', 'tan', 'deep'].map((tone) => (
                      <Badge 
                        key={tone} 
                        variant="outline" 
                        className="justify-center py-1 capitalize"
                        style={{ 
                          backgroundColor: tone === 'fair' ? '#f8d7da' : 
                                          tone === 'light' ? '#f5e0d2' : 
                                          tone === 'medium' ? '#e6c9a8' : 
                                          tone === 'olive' ? '#c9b38c' : 
                                          tone === 'tan' ? '#b59a7c' : 
                                          tone === 'deep' ? '#8d5a4a' : 'inherit',
                          color: ['fair', 'light', 'medium'].includes(tone) ? '#333' : '#fff',
                          borderColor: 'transparent'
                        }}
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="ghost" 
              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
            >
              ✕
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkinToneAnalyzer;

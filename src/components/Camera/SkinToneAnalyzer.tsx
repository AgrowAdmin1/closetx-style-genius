
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';
import CameraCapture from './CameraCapture';
import { toast } from 'sonner';

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
      // Here we're just randomly selecting values for demo purposes
      const skinTones: SkinToneType[] = ['fair', 'light', 'medium', 'olive', 'tan', 'deep'];
      const faceShapes: FaceShapeType[] = ['oval', 'round', 'square', 'heart', 'diamond', 'rectangle'];
      
      const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
      const faceShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
      
      toast.success('Analysis complete!');
      
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
        className="flex items-center gap-2"
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Analyze Your Features</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!showCamera && !previewImage && (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-500">
                  Take a clear photo of your face in good lighting for best results.
                  This helps us recommend colors and styles that complement your features.
                </p>
                
                <Button 
                  className="bg-closetx-teal hover:bg-closetx-teal/90 text-white"
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
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full aspect-square object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  {analyzingImage ? (
                    <p className="text-sm flex items-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Analyzing features...
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCamera(true)}
                      >
                        Retake Photo
                      </Button>
                      <Button
                        className="bg-closetx-teal hover:bg-closetx-teal/90 text-white"
                        onClick={() => analyzeImage(previewImage)}
                      >
                        Analyze Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkinToneAnalyzer;

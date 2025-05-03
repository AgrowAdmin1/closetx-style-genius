
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, X, Check, Upload, FlipHorizontal, Zap, ZapOff } from 'lucide-react';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CameraCaptureProps = {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
};

type CameraFilter = 'normal' | 'grayscale' | 'sepia' | 'vintage';

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filter, setFilter] = useState<CameraFilter>('normal');
  const [currentTab, setCurrentTab] = useState('camera');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stream = useRef<MediaStream | null>(null);

  const applyFilterStyle = () => {
    switch(filter) {
      case 'grayscale': return 'grayscale(100%)';
      case 'sepia': return 'sepia(100%)';
      case 'vintage': return 'brightness(110%) contrast(85%) sepia(20%)';
      default: return 'none';
    }
  };

  const startCamera = async () => {
    try {
      if (stream.current) {
        // Stop any existing stream
        stream.current.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: facingMode,
          advanced: [{ zoom: zoomLevel }] 
        },
        audio: false
      });
      
      stream.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setIsCapturing(true);
      }
      
      // Try to enable flash if requested
      if (flashEnabled) {
        const track = mediaStream.getVideoTracks()[0];
        if (track && track.getCapabilities && track.getCapabilities().torch) {
          await track.applyConstraints({ advanced: [{ torch: true }] });
        } else {
          toast.info("Flash is not supported on this device");
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream.current) {
      stream.current.getTracks().forEach(track => track.stop());
      stream.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
    if (stream.current) {
      const track = stream.current.getVideoTracks()[0];
      if (track && track.getCapabilities && track.getCapabilities().torch) {
        track.applyConstraints({ advanced: [{ torch: !flashEnabled }] })
          .catch(() => toast.error("Unable to toggle flash"));
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.filter = applyFilterStyle();
        ctx.drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageSrc);
        stopCamera();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccept = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  useEffect(() => {
    if (isCapturing) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [facingMode, flashEnabled]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <Tabs defaultValue="camera" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="w-full bg-gray-900 py-3">
          <TabsTrigger value="camera" className="flex-1 text-white">Camera</TabsTrigger>
          <TabsTrigger value="upload" className="flex-1 text-white">Upload</TabsTrigger>
        </TabsList>
      
        <TabsContent value="camera" className="flex-1 flex flex-col">
          {!capturedImage ? (
            <>
              {isCapturing ? (
                <div className="relative flex-1">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                    style={{ filter: applyFilterStyle() }}
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-gray-800/50 text-white border-0"
                        onClick={toggleFacingMode}
                      >
                        <FlipHorizontal size={18} />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={`bg-gray-800/50 text-white border-0 ${flashEnabled ? 'text-yellow-400' : ''}`}
                        onClick={toggleFlash}
                      >
                        {flashEnabled ? <Zap size={18} /> : <ZapOff size={18} />}
                      </Button>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-gray-800/50 text-white border-0"
                        >
                          Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem onClick={() => setFilter('normal')}>Normal</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilter('grayscale')}>Grayscale</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilter('sepia')}>Sepia</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilter('vintage')}>Vintage</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="absolute bottom-24 left-8 right-8 flex items-center">
                    <p className="text-white text-xs w-16">Zoom</p>
                    <Slider 
                      className="flex-1"
                      onValueChange={(value) => setZoomLevel(value[0])}
                      defaultValue={[1]} 
                      min={1} 
                      max={3} 
                      step={0.1}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-closetx-charcoal">
                  <div className="text-center p-6">
                    <p className="text-white mb-8">Capture your clothing item to add it to your wardrobe</p>
                    <Button 
                      className="bg-closetx-teal hover:bg-closetx-teal/90 text-white"
                      onClick={() => {
                        setIsCapturing(true);
                        startCamera();
                      }}
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Open Camera
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 relative">
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-contain" 
                style={{ filter: applyFilterStyle() }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-white mb-8">Upload an image of your clothing item</p>
            <div className="flex justify-center">
              <Button 
                className="bg-closetx-beige hover:bg-closetx-beige/90 text-closetx-charcoal"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-5 w-5" />
                Choose File
              </Button>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileSelect} 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-black p-6 flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
        
        {isCapturing && currentTab === 'camera' && (
          <Button 
            className="bg-white text-black hover:bg-white/90 rounded-full h-16 w-16 flex items-center justify-center p-0"
            onClick={captureImage}
          >
            <div className="h-14 w-14 rounded-full border-2 border-black"></div>
          </Button>
        )}

        {capturedImage && (
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500"
              onClick={handleRetake}
            >
              <X className="mr-2 h-5 w-5" /> Retake
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={handleAccept}
            >
              <Check className="mr-2 h-5 w-5" /> Accept
            </Button>
          </div>
        )}

        {!isCapturing && !capturedImage && currentTab === 'camera' && <div></div>}
      </div>
    </div>
  );
};

export default CameraCapture;

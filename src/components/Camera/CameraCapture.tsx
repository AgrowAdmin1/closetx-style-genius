
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, X, Check, Upload } from 'lucide-react';
import { toast } from 'sonner';

type CameraCaptureProps = {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
};

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const imageSrc = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageSrc);
      stopCamera();
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

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {!capturedImage ? (
        <>
          {isCapturing ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="flex-1 object-cover"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-closetx-charcoal">
              <div className="text-center p-6">
                <p className="text-white mb-8">Capture your clothing item to add it to your wardrobe</p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    className="bg-closetx-teal hover:bg-closetx-teal/90 text-white"
                    onClick={startCamera}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Open Camera
                  </Button>
                  <Button 
                    className="bg-closetx-beige hover:bg-closetx-beige/90 text-closetx-charcoal"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload File
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
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 relative">
          <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
        </div>
      )}

      <div className="bg-black p-6 flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
        
        {isCapturing && (
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

        {!isCapturing && !capturedImage && <div></div>}
      </div>
    </div>
  );
};

export default CameraCapture;

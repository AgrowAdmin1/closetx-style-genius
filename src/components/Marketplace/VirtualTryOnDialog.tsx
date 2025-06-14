
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface VirtualTryOnDialogProps {
  itemImage: string;
  itemName: string;
  trigger?: React.ReactNode;
}

const VirtualTryOnDialog: React.FC<VirtualTryOnDialogProps> = ({ itemImage, itemName, trigger }) => {
  const [userImage, setUserImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
            <Camera size={16} />
            Try On Virtually
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Try On: {itemName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-44 h-56 bg-gray-100 rounded-lg relative flex flex-col items-center justify-center overflow-hidden">
            {userImage ? (
              <>
                <img
                  src={userImage}
                  alt="User"
                  className="absolute z-0 object-contain w-full h-full opacity-80"
                  style={{ maxHeight: '100%' }}
                />
                <img
                  src={itemImage}
                  alt={itemName}
                  className="absolute z-10 object-contain w-full h-full"
                  style={{ maxHeight: '100%', mixBlendMode: 'multiply' }}
                />
              </>
            ) : (
              <span className="text-xs text-gray-600">Upload your photo to try on!</span>
            )}
          </div>
          <div className="flex flex-col gap-2 items-center">
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              className="hidden"
              onChange={handleUpload}
            />
            <label htmlFor="photo-upload">
              <Button variant="secondary" size="sm">
                {userImage ? 'Change photo' : 'Upload photo'}
              </Button>
            </label>
            <p className="text-xs text-gray-500">Your photo stays private</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualTryOnDialog;

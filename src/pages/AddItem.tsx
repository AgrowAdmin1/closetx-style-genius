
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera } from 'lucide-react';
import CameraCapture from '@/components/Camera/CameraCapture';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Gray'];

const AddItem = () => {
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);
  const [itemImage, setItemImage] = useState<string | null>(null);

  const handleCapture = (imageSrc: string) => {
    setItemImage(imageSrc);
    setShowCamera(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Item added to your wardrobe!');
    navigate('/wardrobe');
  };

  return (
    <>
      {showCamera ? (
        <CameraCapture 
          onCapture={handleCapture} 
          onClose={() => setShowCamera(false)} 
        />
      ) : (
        <AppLayout>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="mb-6">
              <div 
                className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-closetx-teal transition-colors"
                onClick={() => setShowCamera(true)}
              >
                {itemImage ? (
                  <div className="w-full h-full relative">
                    <img 
                      src={itemImage} 
                      alt="Clothing item" 
                      className="w-full h-full object-contain"
                    />
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() => setShowCamera(true)}
                    >
                      <p className="text-white text-center p-4">Tap to change image</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Camera size={48} className="text-gray-400 mb-2" />
                    <p className="text-gray-500">Tap to capture or upload image</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="E.g., White Cotton Shirt" />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="color">Color</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="brand">Brand (optional)</Label>
                <Input id="brand" placeholder="E.g., Zara" />
              </div>
              
              <div>
                <Label className="mb-2 block">Season</Label>
                <div className="grid grid-cols-2 gap-2">
                  {seasons.map(season => (
                    <div key={season} className="flex items-center space-x-2">
                      <Checkbox id={`season-${season}`} />
                      <label 
                        htmlFor={`season-${season}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {season}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-closetx-teal hover:bg-closetx-teal/90"
              disabled={!itemImage}
            >
              Save Item
            </Button>
          </form>
        </AppLayout>
      )}
    </>
  );
};

export default AddItem;

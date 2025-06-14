
import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { ClothingItemType } from '@/components/Wardrobe/ClothingItem';
import 'react-resizable/css/styles.css';

interface VirtualTryOnProps {
  userImageSrc: string;
  clothingItems: ClothingItemType[];
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ userImageSrc, clothingItems }) => {
  return (
    <>
      <style>{`
        .box-try-on {
          display: inline-block;
          cursor: move;
        }
        .box-try-on:hover {
          border: 1px dashed #3b82f6;
        }
        .react-resizable-handle {
          background: #3b82f6;
          width: 12px;
          height: 12px;
          bottom: 2px;
          right: 2px;
          border-radius: 99px;
          border: 2px solid white;
        }
      `}</style>
      <div className="relative w-full h-full overflow-hidden bg-gray-900">
        <img src={userImageSrc} alt="Your photo" className="absolute top-0 left-0 w-full h-full object-contain" />
        <div className="absolute inset-0">
          {clothingItems.map((item, index) => (
            <Draggable key={item.id} bounds="parent" defaultPosition={{x: 50 + index * 30, y: 50 + index * 30}}>
              <div>
                <ResizableBox 
                  width={200} 
                  height={250} 
                  minConstraints={[50, 50]} 
                  maxConstraints={[600, 600]}
                  className="box-try-on"
                  lockAspectRatio={false}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" draggable="false" style={{mixBlendMode: 'multiply'}} />
                </ResizableBox>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </>
  );
};

export default VirtualTryOn;

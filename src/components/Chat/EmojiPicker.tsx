
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Smile, ShoppingBag, Heart, Coffee, Cake, Car } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const emojiCategories = {
  favorites: [
    '😊', '😂', '❤️', '👍', '🙌', '🎉', '😍', '🤔',
    '😢', '😎', '🥳', '😴', '🙄', '😘', '😮', '🤗'
  ],
  emotions: [
    '😀', '😃', '😄', '😆', '😅', '😂', '🤣', '🥲',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰'
  ],
  gestures: [
    '👋', '🤚', '✋', '🖖', '👌', '🤌', '🤏', '✌️',
    '🤞', '🫰', '🤟', '🤘', '🤙', '👈', '👉', '👆'
  ],
  objects: [
    '💼', '📱', '💻', '⌚', '📷', '🎮', '🛒', '🛍️',
    '👗', '👕', '👖', '👟', '👠', '👢', '👒', '🧢'
  ],
  fashion: [
    '👗', '👚', '👕', '👖', '👔', '👙', '👘', '👠',
    '👡', '👢', '👞', '👟', '🧣', '🧤', '🧥', '🧦'
  ]
};

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Smile className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="end">
        <Tabs defaultValue="favorites">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="favorites"><Smile className="h-4 w-4 mr-1" /> Favorites</TabsTrigger>
            <TabsTrigger value="emotions"><Heart className="h-4 w-4 mr-1" /> Emotions</TabsTrigger>
            <TabsTrigger value="fashion"><ShoppingBag className="h-4 w-4 mr-1" /> Fashion</TabsTrigger>
          </TabsList>
          
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <TabsContent key={category} value={category} className="mt-0 p-1">
              <div className="grid grid-cols-8 gap-1">
                {emojis.map((emoji, index) => (
                  <Button 
                    key={index}
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => onEmojiSelect(emoji)}
                  >
                    <span className="text-lg">{emoji}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;

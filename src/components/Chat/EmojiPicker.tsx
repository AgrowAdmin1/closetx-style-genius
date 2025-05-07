
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Smile } from 'lucide-react';

const commonEmojis = [
  '😊', '😂', '❤️', '👍', '🙌', '🎉', '😍', '🤔',
  '😢', '😎', '🥳', '😴', '🙄', '😘', '😮', '🤗',
  '👋', '🔥', '💯', '✨', '👏', '💪', '🙏', '👀'
];

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
      <PopoverContent className="w-64 p-2" align="end">
        <div className="grid grid-cols-6 gap-2">
          {commonEmojis.map((emoji, index) => (
            <Button 
              key={index}
              variant="ghost"
              className="h-9 w-9 p-0 hover:bg-gray-100"
              onClick={() => onEmojiSelect(emoji)}
            >
              <span className="text-lg">{emoji}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Flame, Heart, Star } from 'lucide-react';

interface SocialBadgesProps {
  trending?: boolean;
  friendBought?: boolean;
  teasingText?: string;
}

const SocialBadges: React.FC<SocialBadgesProps> = ({ trending, friendBought, teasingText }) => (
  <div className="flex gap-1 flex-wrap mt-1">
    {trending && (
      <Badge className="bg-pink-100 text-pink-700 text-xxs flex items-center gap-1 border-none">
        <Flame size={12} /> Trending in Friends
      </Badge>
    )}
    {friendBought && (
      <Badge className="bg-amber-100 text-amber-800 text-xxs flex items-center gap-1 border-none">
        <User size={12} />
        Friend just bought this!
      </Badge>
    )}
    {teasingText && (
      <Badge className="bg-purple-100 text-purple-700 text-xxs whitespace-nowrap border-none">{teasingText}</Badge>
    )}
  </div>
);

export default SocialBadges;

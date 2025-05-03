
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AlertTriangle, Check, Droplets, Wind } from 'lucide-react';

export type ClothingCondition = {
  isClean: boolean;
  isIroned: boolean;
  isUsed: boolean;
  lastWorn?: string;
};

interface ItemStatusProps {
  condition: ClothingCondition;
  className?: string;
}

const ItemStatus: React.FC<ItemStatusProps> = ({ condition, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={condition.isClean ? "outline" : "destructive"} className="h-6 px-1.5">
              <Droplets size={14} className={condition.isClean ? "text-green-500" : "text-white"} />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{condition.isClean ? "Clean" : "Needs washing"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={condition.isIroned ? "outline" : "secondary"} className="h-6 px-1.5">
              <Wind size={14} className={condition.isIroned ? "text-green-500" : "text-amber-500"} />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{condition.isIroned ? "Ironed" : "Needs ironing"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={!condition.isUsed ? "outline" : "default"} className="h-6 px-1.5">
              {condition.isUsed ? (
                <AlertTriangle size={14} className="text-white" />
              ) : (
                <Check size={14} className="text-green-500" />
              )}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{condition.isUsed ? `Last worn: ${condition.lastWorn || 'Recently'}` : "Unused"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ItemStatus;

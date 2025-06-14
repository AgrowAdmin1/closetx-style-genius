
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Droplets, Wind, Check } from 'lucide-react';

// Color options with visual representation
const colorOptions = [
  { value: 'Black', hex: '#000000' },
  { value: 'White', hex: '#FFFFFF', border: true },
  { value: 'Red', hex: '#FF0000' },
  { value: 'Blue', hex: '#0000FF' },
  { value: 'Green', hex: '#008000' },
  { value: 'Yellow', hex: '#FFFF00' },
  { value: 'Pink', hex: '#FFC0CB' },
  { value: 'Purple', hex: '#800080' },
  { value: 'Orange', hex: '#FFA500' },
  { value: 'Brown', hex: '#A52A2A' },
  { value: 'Gray', hex: '#808080' },
];

// Season options
const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];

type FilterOptionsProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeColor: string | null;
  setActiveColor: (color: string | null) => void;
  activeSeasons: string[];
  setActiveSeasons: (seasons: string[]) => void;
  showOnlyClean: boolean;
  setShowOnlyClean: (value: boolean) => void;
  showOnlyIroned: boolean;
  setShowOnlyIroned: (value: boolean) => void;
  categories: string[];
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
  activeCategory,
  setActiveCategory,
  activeColor,
  setActiveColor,
  activeSeasons,
  setActiveSeasons,
  showOnlyClean,
  setShowOnlyClean,
  showOnlyIroned,
  setShowOnlyIroned,
  categories
}) => {
  
  const toggleSeason = (season: string) => {
    if (activeSeasons.includes(season)) {
      setActiveSeasons(activeSeasons.filter(s => s !== season));
    } else {
      setActiveSeasons([...activeSeasons, season]);
    }
  };

  return (
    <Tabs defaultValue="categories" className="mb-6">
      <TabsList className="w-full bg-gray-100">
        <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
        <TabsTrigger value="colors" className="flex-1">Colors</TabsTrigger>
        <TabsTrigger value="seasons" className="flex-1">Seasons</TabsTrigger>
        <TabsTrigger value="condition" className="flex-1">Condition</TabsTrigger>
      </TabsList>
      
      <TabsContent value="categories" className="mt-4">
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`flex-shrink-0 ${activeCategory === category ? 'bg-closetx-teal text-white' : 'bg-white text-closetx-charcoal'}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="colors" className="mt-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            variant={activeColor === null ? 'default' : 'outline'}
            className={`${activeColor === null ? 'bg-closetx-teal text-white' : ''} rounded-full`}
            onClick={() => setActiveColor(null)}
            size="sm"
          >
            All
          </Button>
          {colorOptions.map((color) => {
            const isLight = ['#FFFFFF', '#FFFF00', '#FFC0CB'].includes(color.hex.toUpperCase());
            return (
              <button
                key={color.value}
                type="button"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${color.border ? "border border-gray-300" : ""} ${activeColor === color.value ? 'ring-2 ring-offset-2 ring-closetx-teal' : 'hover:scale-110'}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setActiveColor(color.value)}
                aria-label={color.value}
              >
                {activeColor === color.value && <Check size={16} className={isLight ? 'text-black' : 'text-white'} />}
              </button>
            )
          })}
        </div>
      </TabsContent>
      
      <TabsContent value="seasons" className="mt-4">
        <div className="flex flex-wrap gap-2">
          {seasonOptions.map(season => (
            <Button
              key={season}
              onClick={() => toggleSeason(season)}
              variant={activeSeasons.includes(season) ? "default" : "outline"}
              className={`${activeSeasons.includes(season) ? 'bg-closetx-teal text-white' : 'bg-white text-closetx-charcoal'}`}
            >
              {season}
            </Button>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="condition" className="mt-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="clean-only" 
              checked={showOnlyClean} 
              onCheckedChange={(checked) => setShowOnlyClean(checked as boolean)}
            />
            <Label htmlFor="clean-only" className="flex items-center">
              <Droplets size={16} className="mr-2 text-green-500" />
              Show only clean items
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ironed-only" 
              checked={showOnlyIroned} 
              onCheckedChange={(checked) => setShowOnlyIroned(checked as boolean)}
            />
            <Label htmlFor="ironed-only" className="flex items-center">
              <Wind size={16} className="mr-2 text-green-500" />
              Show only ironed items
            </Label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FilterOptions;

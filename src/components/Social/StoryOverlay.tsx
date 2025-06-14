
import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Copy, Camera, ChevronLeft, ChevronRight, Users, Flame } from "lucide-react";
import VirtualTryOnDialog from "@/components/Marketplace/VirtualTryOnDialog";
import { ClothingItemDetail, FeedPostType } from "./FeedPost";
import { toast } from "sonner";

interface StoryOverlayProps {
  open: boolean;
  onClose: () => void;
  post: FeedPostType;
  onPrev?: () => void;
  onNext?: () => void;
  showPrev: boolean;
  showNext: boolean;
}

const STORY_DURATION = 10000; // 10 seconds per story

const pulseHighlight =
  "absolute border-4 border-closetx-teal/80 rounded-lg animate-pulse shadow-lg z-20 pointer-events-auto hover:scale-105 transition-transform duration-200";

const StoryOverlay: React.FC<StoryOverlayProps> = ({
  open,
  onClose,
  post,
  onPrev,
  onNext,
  showPrev,
  showNext,
}) => {
  const [progress, setProgress] = React.useState(0);
  const timer = useRef<number>();
  // Progress bar logic
  useEffect(() => {
    if (!open) return;
    setProgress(0);
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer.current);
          onNext?.();
          return 0;
        }
        return p + 1;
      });
    }, STORY_DURATION / 100);
    return () => clearInterval(timer.current);
    // eslint-disable-next-line
  }, [open, post.id]);
  if (!open) return null;

  // Dummy engagement counts for psychological impact
  const reactions = [
    { icon: <Flame size={18} className="text-pink-500" />, label: "Trending" },
    { icon: <Users size={16} className="text-sky-500" />, label: "18 friends viewed" },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 animate-fade-in grid place-items-center">
      {/* Progress bar */}
      <div className="absolute top-4 left-0 w-full px-8 z-30">
        <div className="h-1 rounded bg-gray-700 overflow-hidden">
          <div
            className="h-1 bg-closetx-teal transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation + Close */}
      <Button
        variant="ghost"
        className="absolute left-4 top-4 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-sm"
        size="icon"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </Button>
      {showPrev && (
        <Button
          variant="ghost"
          className="absolute left-2 top-1/2 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-sm"
          size="icon"
          onClick={onPrev}
        >
          <ChevronLeft size={28} />
        </Button>
      )}
      {showNext && (
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-sm"
          size="icon"
          onClick={onNext}
        >
          <ChevronRight size={28} />
        </Button>
      )}

      {/* Main content */}
      <div className="relative w-full max-w-lg aspect-[4/5] overflow-visible flex flex-col items-center">
        <img
          src={post.imageUrl}
          alt={"Look"}
          className="object-cover w-full h-full rounded-3xl border-4 border-white shadow-2xl"
        />
        {/* Product pulse highlights */}
        {post.outfitDetails?.map(
          (item) =>
            item.coordinates && (
              <div
                key={item.id}
                className={`${pulseHighlight} group`}
                style={{
                  top: `${item.coordinates.y1}%`,
                  left: `${item.coordinates.x1}%`,
                  width: `${item.coordinates.x2 - item.coordinates.x1}%`,
                  height: `${item.coordinates.y2 - item.coordinates.y1}%`,
                }}
                onClick={() => toast.info(item.name + " selected!")}
              >
                <div className="absolute -top-9 left-0 whitespace-nowrap bg-black/80 text-white px-2 rounded-md py-1 text-xs pointer-events-none select-none">
                  {item.name} {item.brand && <span className="text-gray-300 ml-1">({item.brand})</span>}
                  {item.price && (
                    <Badge variant="outline" className="ml-2 text-xs border-blue-400">
                      {item.price}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-1 right-1 flex flex-col gap-1 z-30">
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Copy product"
                    className="rounded-full shadow border border-white bg-white/70 text-black/90 hover:text-blue-600 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Product link copied!");
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                  <VirtualTryOnDialog
                    itemImage={post.imageUrl}
                    itemName={item.name}
                    trigger={
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Try on"
                        className="rounded-full shadow border border-white bg-white/70 text-black/90 hover:text-blue-600 hover:bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Camera size={14} />
                      </Button>
                    }
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Add to cart"
                    className="rounded-full shadow border border-white bg-white/70 text-black/90 hover:text-teal-700 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Added to cart!");
                    }}
                  >
                    <ShoppingCart size={14} />
                  </Button>
                </div>
              </div>
            )
        )}

        {/* Reactions/story feeling */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {reactions.map((r, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-xl text-white/90 bg-black/50 text-xs flex items-center gap-1 shadow backdrop-blur-sm"
              >
                {r.icon}
                {r.label}
              </span>
            ))}
          </div>
          <Badge className="text-sm px-3 mt-2 bg-purple-600/90 text-white">{post.zone ? `${post.zone} Zone` : "Discover"}</Badge>
        </div>
      </div>
    </div>
  );
};

export default StoryOverlay;

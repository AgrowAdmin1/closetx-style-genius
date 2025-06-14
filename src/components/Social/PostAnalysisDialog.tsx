
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Copy, Camera } from "lucide-react";
import { toast } from "sonner";
import VirtualTryOnDialog from "@/components/Marketplace/VirtualTryOnDialog";
import { ClothingItemDetail } from "./FeedPost";

interface PostAnalysisDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  imageUrl: string;
  items: ClothingItemDetail[];
}

const PostAnalysisDialog: React.FC<PostAnalysisDialogProps> = ({
  open,
  onOpenChange,
  imageUrl,
  items,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Analyze This Look</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <img src={imageUrl} alt="Post Look" className="w-full h-56 object-cover rounded-md" />
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 py-4">
              <div className="flex items-center gap-2 justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.brand && (
                    <span className="text-xs text-gray-500">{item.brand}</span>
                  )}
                  {item.price && (
                    <Badge variant="outline" className="ml-2">{item.price}</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Copy product link"
                    onClick={() => {
                      // Placeholder for copy
                      toast.success(`Copied link for ${item.name}`);
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                  <VirtualTryOnDialog
                    itemImage={imageUrl}
                    itemName={item.name}
                    trigger={
                      <Button size="icon" variant="ghost" title="Try on virtually">
                        <Camera size={16} />
                      </Button>
                    }
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Add to cart"
                    onClick={() => toast.success(`Added ${item.name} to cart`)}
                  >
                    <ShoppingCart size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default PostAnalysisDialog;

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, Calendar, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FoundItemCardProps {
  id: string;
  name: string;
  locationFound: string;
  returnedTo: string;
  imageUrl: string | null;
  createdAt: string;
  found: boolean;
  onFoundUpdate: () => void;
}

export const FoundItemCard = ({ id, name, locationFound, returnedTo, imageUrl, createdAt, found, onFoundUpdate }: FoundItemCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleMarkAsFound = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('found_items')
        .update({ found: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item marked as found!",
      });
      
      onFoundUpdate();
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to mark item as found",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="w-full max-w-sm bg-card hover:shadow-lg transition-shadow">
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="p-0">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-card-foreground">{name}</CardTitle>
              <div className="flex items-center gap-2">
                {found && <CheckCircle className="h-5 w-5 text-green-600" />}
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>Found at: {locationFound}</span>
            </div>
            <Badge variant={returnedTo === 'GO' ? 'default' : 'secondary'} className="mb-3">
              Returned to: {returnedTo}
            </Badge>
            {!found && (
              <Button 
                onClick={handleMarkAsFound}
                disabled={isUpdating}
                className="w-full"
                variant="default"
              >
                {isUpdating ? "Marking as Found..." : "Mark as Found"}
              </Button>
            )}
            {found && (
              <div className="flex items-center gap-2 text-green-600 justify-center">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Item Found!</span>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface FoundItemCardProps {
  id: string;
  name: string;
  locationFound: string;
  returnedTo: string;
  imageUrl: string | null;
  createdAt: string;
}

export const FoundItemCard = ({ name, locationFound, returnedTo, imageUrl, createdAt }: FoundItemCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-sm bg-card hover:shadow-lg transition-shadow">
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
        <CardTitle className="text-lg font-semibold text-card-foreground mb-2">{name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span>Found at: {locationFound}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(createdAt)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={returnedTo === 'GO' ? 'default' : 'secondary'} className="w-full justify-center">
          Returned to: {returnedTo}
        </Badge>
      </CardFooter>
    </Card>
  );
};
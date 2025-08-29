import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoundItemCard } from "@/components/FoundItemCard";
import { UploadItemForm } from "@/components/UploadItemForm";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Filter } from "lucide-react";

interface FoundItem {
  id: string;
  name: string;
  location_found: string;
  returned_to: string;
  image_url: string | null;
  created_at: string;
  found: boolean;
}

const Index = () => {
  const [items, setItems] = useState<FoundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<"unfound" | "found" | "all">("unfound");

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('found_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === "found") return item.found;
    if (filter === "unfound") return !item.found;
    return true; // "all"
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = () => {
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">FoundIt</h1>
              <p className="text-muted-foreground">Lost & Found Community</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Found Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <UploadItemForm 
                  onItemAdded={handleItemAdded} 
                  onClose={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading items...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {items.length === 0 ? "No items found yet" : `No ${filter} items`}
            </h2>
            <p className="text-muted-foreground mb-6">
              {items.length === 0 
                ? "Be the first to add a found item to help reunite it with its owner!" 
                : `No items match the current filter (${filter}). Try changing the filter or add a new item.`
              }
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <UploadItemForm 
                  onItemAdded={handleItemAdded} 
                  onClose={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Found Items ({filteredItems.length})
              </h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={(value: "unfound" | "found" | "all") => setFilter(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unfound">Unfound</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <FoundItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  locationFound={item.location_found}
                  returnedTo={item.returned_to}
                  imageUrl={item.image_url}
                  createdAt={item.created_at}
                  found={item.found}
                  onFoundUpdate={fetchItems}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

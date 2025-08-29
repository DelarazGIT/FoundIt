-- Create storage bucket for item images
INSERT INTO storage.buckets (id, name, public) VALUES ('item-images', 'item-images', true);

-- Create found_items table
CREATE TABLE public.found_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location_found TEXT NOT NULL,
  returned_to TEXT NOT NULL CHECK (returned_to IN ('GO', 'Lost & Found')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.found_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a community lost & found)
CREATE POLICY "Anyone can view found items" 
ON public.found_items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create found items" 
ON public.found_items 
FOR INSERT 
WITH CHECK (true);

-- Create storage policies for item images
CREATE POLICY "Anyone can view item images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'item-images');

CREATE POLICY "Anyone can upload item images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'item-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_found_items_updated_at
BEFORE UPDATE ON public.found_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
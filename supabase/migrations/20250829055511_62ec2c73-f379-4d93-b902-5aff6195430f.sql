-- Add found status column to found_items table
ALTER TABLE public.found_items 
ADD COLUMN found BOOLEAN NOT NULL DEFAULT false;

-- Create index for better performance when filtering by found status
CREATE INDEX idx_found_items_found ON public.found_items(found);

-- Add RLS policy for updating found status
CREATE POLICY "Anyone can update found status" 
ON public.found_items 
FOR UPDATE 
USING (true)
WITH CHECK (true);
-- Create accessories_products table for compatibility management
CREATE TABLE public.accessories_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  accessory_id UUID NOT NULL,
  product_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Foreign key constraints
  CONSTRAINT fk_accessory FOREIGN KEY (accessory_id) REFERENCES public.products(id) ON DELETE CASCADE,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
  
  -- Unique constraint to prevent duplicate compatibility entries
  CONSTRAINT unique_accessory_product UNIQUE (accessory_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE public.accessories_products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to accessories_products" 
ON public.accessories_products 
FOR SELECT 
USING (true);

-- Create policy for public insert access (for admin management)
CREATE POLICY "Allow public insert access to accessories_products" 
ON public.accessories_products 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_accessories_products_accessory_id ON public.accessories_products(accessory_id);
CREATE INDEX idx_accessories_products_product_id ON public.accessories_products(product_id);

-- Enable realtime for this table
ALTER TABLE public.accessories_products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.accessories_products;
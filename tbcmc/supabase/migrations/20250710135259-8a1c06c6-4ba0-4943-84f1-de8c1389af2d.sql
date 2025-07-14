-- Enable RLS on products and categories tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to categories" 
ON public.categories 
FOR SELECT 
USING (true);
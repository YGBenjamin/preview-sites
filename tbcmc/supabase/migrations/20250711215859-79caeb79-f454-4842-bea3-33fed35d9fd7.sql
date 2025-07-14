-- Add permissions for products table to allow CRUD operations
CREATE POLICY "Allow public insert access to products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete access to products" 
ON public.products 
FOR DELETE 
USING (true);
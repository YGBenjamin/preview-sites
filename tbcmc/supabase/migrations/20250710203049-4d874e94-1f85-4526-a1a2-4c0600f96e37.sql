-- Add foreign key constraints to accessories_products table
ALTER TABLE public.accessories_products
ADD CONSTRAINT fk_accessory 
FOREIGN KEY (accessory_id) 
REFERENCES public.products(id);

ALTER TABLE public.accessories_products
ADD CONSTRAINT fk_product 
FOREIGN KEY (product_id) 
REFERENCES public.products(id);

-- Ensure proper naming for PostgREST relationships
ALTER TABLE public.accessories_products
ADD CONSTRAINT accessories_products_accessory_id_fkey 
FOREIGN KEY (accessory_id) 
REFERENCES public.products(id);

ALTER TABLE public.accessories_products
ADD CONSTRAINT accessories_products_product_id_fkey 
FOREIGN KEY (product_id) 
REFERENCES public.products(id);
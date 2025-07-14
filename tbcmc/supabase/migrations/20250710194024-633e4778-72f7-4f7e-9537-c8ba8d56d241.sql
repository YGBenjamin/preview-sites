-- Add accessories column to products table
ALTER TABLE public.products 
ADD COLUMN accessories boolean NOT NULL DEFAULT false;

-- Add comment to clarify the column purpose
COMMENT ON COLUMN public.products.accessories IS 'True if the product is an accessory, false if it is a machine';
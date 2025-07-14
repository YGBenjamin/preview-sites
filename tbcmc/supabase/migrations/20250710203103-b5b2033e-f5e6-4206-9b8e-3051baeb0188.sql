-- Drop existing constraints if they exist and recreate with proper PostgREST naming
DO $$ 
BEGIN 
    -- Drop existing foreign key constraints if they exist
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'fk_accessory' AND table_name = 'accessories_products') THEN
        ALTER TABLE public.accessories_products DROP CONSTRAINT fk_accessory;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'fk_product' AND table_name = 'accessories_products') THEN
        ALTER TABLE public.accessories_products DROP CONSTRAINT fk_product;
    END IF;
    
    -- Add proper PostgREST named constraints
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'accessories_products_accessory_id_fkey' AND table_name = 'accessories_products') THEN
        ALTER TABLE public.accessories_products
        ADD CONSTRAINT accessories_products_accessory_id_fkey 
        FOREIGN KEY (accessory_id) 
        REFERENCES public.products(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'accessories_products_product_id_fkey' AND table_name = 'accessories_products') THEN
        ALTER TABLE public.accessories_products
        ADD CONSTRAINT accessories_products_product_id_fkey 
        FOREIGN KEY (product_id) 
        REFERENCES public.products(id);
    END IF;
END $$;
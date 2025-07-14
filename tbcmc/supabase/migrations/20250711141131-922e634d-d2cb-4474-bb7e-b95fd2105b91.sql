-- Add sent column to track email delivery status
ALTER TABLE public.leads 
ADD COLUMN sent BOOLEAN DEFAULT FALSE;
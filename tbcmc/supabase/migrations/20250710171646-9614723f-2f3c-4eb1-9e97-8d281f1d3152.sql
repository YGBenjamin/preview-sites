-- Add missing columns to leads table for quote requests
ALTER TABLE public.leads 
ADD COLUMN company_name TEXT,
ADD COLUMN phone TEXT;
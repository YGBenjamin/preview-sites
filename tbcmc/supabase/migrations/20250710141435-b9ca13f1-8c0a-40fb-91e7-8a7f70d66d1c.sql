-- Create leads table for capturing lead information
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  product_id UUID,
  type TEXT NOT NULL DEFAULT 'fiche',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (for lead capture)
CREATE POLICY "Allow public insert access to leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow public read access to leads (optional, for future admin features)
CREATE POLICY "Allow public read access to leads" 
ON public.leads 
FOR SELECT 
USING (true);
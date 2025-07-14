-- Enable realtime for leads table to trigger edge function
ALTER TABLE public.leads REPLICA IDENTITY FULL;

-- Add the leads table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
-- Create function to trigger webhook on new lead
CREATE OR REPLACE FUNCTION public.trigger_send_tech_sheet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id bigint;
BEGIN
  -- Only trigger for 'fiche' type leads
  IF NEW.type = 'fiche' THEN
    SELECT
      net.http_post(
        url := 'https://paitpjwdqmeccqsuukfp.supabase.co/functions/v1/send-tech-sheet',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaXRwandkcW1lY2Nxc3V1a2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNDgyMjIsImV4cCI6MjA2NzcyNDIyMn0.nPiiitG18CeXgZDut1NcoeOKCWc4IdMOZ6XGGAmKMlo"}'::jsonb,
        body := json_build_object('record', row_to_json(NEW))::jsonb
      ) INTO request_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to call the function on new leads
DROP TRIGGER IF EXISTS on_lead_created ON public.leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_send_tech_sheet();
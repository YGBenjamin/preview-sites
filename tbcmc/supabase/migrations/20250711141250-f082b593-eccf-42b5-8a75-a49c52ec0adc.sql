-- Drop and recreate the trigger function to ensure it works with pg_net
DROP TRIGGER IF EXISTS on_lead_created ON public.leads;
DROP FUNCTION IF EXISTS public.trigger_send_tech_sheet();

-- Recreate the function with better error handling
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
    BEGIN
      SELECT
        net.http_post(
          url := 'https://paitpjwdqmeccqsuukfp.supabase.co/functions/v1/send-tech-sheet',
          headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaXRwandkcW1lY2Nxc3V1a2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNDgyMjIsImV4cCI6MjA2NzcyNDIyMn0.nPiiitG18CeXgZDut1NcoeOKCWc4IdMOZ6XGGAmKMlo"}'::jsonb,
          body := json_build_object('record', row_to_json(NEW))::jsonb
        ) INTO request_id;
        
      -- Log the HTTP request
      RAISE NOTICE 'HTTP request sent with ID: %', request_id;
      
    EXCEPTION WHEN OTHERS THEN
      -- Log any errors but don't fail the insert
      RAISE NOTICE 'Error sending HTTP request: %', SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_lead_created
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_send_tech_sheet();
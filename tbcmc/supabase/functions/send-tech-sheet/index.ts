import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Security: Verify JWT token is present
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing authorization header" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Extract user info from JWT (automatically validated by Supabase)
    const jwt = authHeader.replace("Bearer ", "");
    const user = await supabase.auth.getUser(jwt);
    
    if (user.error || !user.data.user) {
      console.error("Invalid JWT token:", user.error);
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { record } = await req.json();
    console.log("New lead received:", record);

    // Security: Log the access attempt
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    
    try {
      await supabase.rpc("log_security_event", {
        p_user_id: user.data.user.id,
        p_action: "send_tech_sheet_request",
        p_table_name: "leads",
        p_record_id: record.id,
        p_ip_address: clientIP,
        p_user_agent: userAgent
      });
    } catch (logError) {
      console.error("Failed to log security event:", logError);
      // Don't fail the request due to logging error
    }

    // Check if this is a tech sheet request
    if (record.type !== "fiche") {
      console.log("Not a tech sheet request, skipping email");
      return new Response(JSON.stringify({ message: "Not a tech sheet request" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get the product information
    if (!record.product_id) {
      console.log("No product_id found, skipping email");
      return new Response(JSON.stringify({ message: "No product specified" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("name, datasheet_url")
      .eq("id", record.product_id)
      .single();

    if (productError || !product) {
      console.error("Error fetching product:", productError);
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send the email based on datasheet availability
    let emailResponse;
    
    if (product.datasheet_url) {
      // Send email with datasheet link
      emailResponse = await resend.emails.send({
        from: "TBC.MC <noreply@tubocom.com>",
        to: [record.email],
        subject: `Fiche technique - ${product.name}`,
        html: `
          <h2>Bonjour ${record.name || ""},</h2>
          <p>Voici la fiche technique du produit <strong>${product.name}</strong>, que vous retrouverez sous le lien suivant :</p>
          <p><a href="${product.datasheet_url}" style="color: #2563eb; text-decoration: underline;">Télécharger la fiche technique</a></p>
          <br>
          <p>Cordialement,<br>L'équipe TBC.MC</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            TBC.MC - Spécialiste en matériel de travaux publics<br>
            Téléphone: <a href="tel:+33620351337" style="color: #2563eb;">+33 6 20 35 13 37</a><br>
            Email: <a href="mailto:laurent.tubocom@gmail.com" style="color: #2563eb;">laurent.tubocom@gmail.com</a>
          </p>
        `,
      });
    } else {
      // Send email indicating datasheet is not available
      console.log("Product has no datasheet, sending unavailability notice");
      emailResponse = await resend.emails.send({
        from: "TBC.MC <noreply@tubocom.com>",
        to: [record.email],
        subject: `Fiche technique - ${product.name}`,
        html: `
          <h2>Bonjour ${record.name || ""},</h2>
          <p>La fiche technique du produit <strong>${product.name}</strong> demandée n'est pas disponible pour le moment, nous vous recontacterons dans les plus brefs délais pour vous donner un retour.</p>
          <br>
          <p>Cordialement,<br>L'équipe TBC.MC</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            TBC.MC - Spécialiste en matériel de travaux publics<br>
            Téléphone: <a href="tel:+33620351337" style="color: #2563eb;">+33 6 20 35 13 37</a><br>
            Email: <a href="mailto:laurent.tubocom@gmail.com" style="color: #2563eb;">laurent.tubocom@gmail.com</a>
          </p>
        `,
      });
    }

    console.log("Email sent successfully:", emailResponse);

    // Update the lead to mark email as sent
    const { error: updateError } = await supabase
      .from("leads")
      .update({ sent: true })
      .eq("id", record.id);

    if (updateError) {
      console.error("Error updating lead sent status:", updateError);
    }

    return new Response(JSON.stringify({ 
      message: "Email sent successfully",
      email_id: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-tech-sheet function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
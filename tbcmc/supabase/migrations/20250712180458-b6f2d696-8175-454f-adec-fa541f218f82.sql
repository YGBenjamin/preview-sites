-- Sécurisation complète de la base de données TBC.MC

-- 1. Suppression des anciennes politiques trop permissives
DROP POLICY IF EXISTS "Allow public insert access to products" ON public.products;
DROP POLICY IF EXISTS "Allow public update access to products" ON public.products;
DROP POLICY IF EXISTS "Allow public delete access to products" ON public.products;
DROP POLICY IF EXISTS "Allow public insert access to leads" ON public.leads;

-- 2. Création d'une table pour les administrateurs
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS sur admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Fonction pour vérifier si un utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = $1
  );
$$;

-- 4. Nouvelles politiques sécurisées pour les produits
-- Les produits restent en lecture publique mais modification admin uniquement
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert products" 
ON public.products 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update products" 
ON public.products 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete products" 
ON public.products 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 5. Sécurisation des leads - accès admin uniquement
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can update leads" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 6. Sécurisation des quote_requests si pas déjà fait
DROP POLICY IF EXISTS "Allow public read access to quote_requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow public insert access to quote_requests" ON public.quote_requests;

CREATE POLICY "Only admins can view quote requests" 
ON public.quote_requests 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can create quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can update quote requests" 
ON public.quote_requests 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete quote requests" 
ON public.quote_requests 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 7. Politiques pour admin_users
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can manage admin users" 
ON public.admin_users 
FOR ALL 
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));
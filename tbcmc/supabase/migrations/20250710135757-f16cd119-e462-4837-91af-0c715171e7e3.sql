-- Add technical specifications columns to products table
ALTER TABLE public.products 
ADD COLUMN engine_power TEXT,           -- Puissance moteur (ex: "25 kW", "35 HP")
ADD COLUMN bucket_capacity TEXT,        -- Capacité godet (ex: "0.08 m³", "200 L")
ADD COLUMN max_digging_depth TEXT,      -- Profondeur de creusement max (ex: "2.8 m")
ADD COLUMN max_dumping_height TEXT,     -- Hauteur de déversement max (ex: "2.1 m")
ADD COLUMN transport_width TEXT,        -- Largeur transport (ex: "1.5 m")
ADD COLUMN operating_weight TEXT,       -- Poids opérationnel (ex: "1900 kg")
ADD COLUMN fuel_tank_capacity TEXT,     -- Capacité réservoir (ex: "45 L")
ADD COLUMN hydraulic_flow TEXT;         -- Débit hydraulique (ex: "35 L/min")
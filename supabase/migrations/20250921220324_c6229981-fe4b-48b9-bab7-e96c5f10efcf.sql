-- Create enhanced user spiritual profile table
CREATE TABLE public.user_spiritual_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  birth_time time,
  birth_location text,
  birth_coordinates jsonb, -- {lat: float, lng: float}
  soul_contract text,
  life_path_number integer,
  astrological_houses jsonb,
  planetary_aspects jsonb,
  starseed_origins text[],
  akashic_records_access_level text DEFAULT 'basic',
  personal_spirit_guides text[],
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_spiritual_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own spiritual profile" 
ON public.user_spiritual_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own spiritual profile" 
ON public.user_spiritual_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spiritual profile" 
ON public.user_spiritual_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create daily cosmic events table for current astrological data
CREATE TABLE public.daily_cosmic_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_date date NOT NULL,
  moon_phase text NOT NULL,
  moon_sign text,
  planetary_transits jsonb,
  cosmic_events text[],
  collective_energy_theme text,
  manifestation_power_rating integer CHECK (manifestation_power_rating >= 1 AND manifestation_power_rating <= 10),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(event_date)
);

-- Enable RLS for cosmic events (publicly readable)
ALTER TABLE public.daily_cosmic_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cosmic events" 
ON public.daily_cosmic_events 
FOR SELECT 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_user_spiritual_profiles_updated_at
BEFORE UPDATE ON public.user_spiritual_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_cosmic_events_updated_at
BEFORE UPDATE ON public.daily_cosmic_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert current cosmic data for September 2025
INSERT INTO public.daily_cosmic_events (
  event_date,
  moon_phase,
  moon_sign,
  planetary_transits,
  cosmic_events,
  collective_energy_theme,
  manifestation_power_rating
) VALUES (
  '2025-09-17',
  'Waning Crescent',
  'Cancer',
  '{"venus_in_libra": true, "mercury_direct": true, "jupiter_trine_saturn": true, "pluto_sextile_neptune": true}'::jsonb,
  ARRAY['Venus enters Libra bringing relationship harmony', 'Jupiter trine Saturn creates stability', 'Mercury direct clears communication'],
  'Divine Love and Sacred Partnerships',
  9
) ON CONFLICT (event_date) DO UPDATE SET
  moon_phase = EXCLUDED.moon_phase,
  moon_sign = EXCLUDED.moon_sign,
  planetary_transits = EXCLUDED.planetary_transits,
  cosmic_events = EXCLUDED.cosmic_events,
  collective_energy_theme = EXCLUDED.collective_energy_theme,
  manifestation_power_rating = EXCLUDED.manifestation_power_rating;
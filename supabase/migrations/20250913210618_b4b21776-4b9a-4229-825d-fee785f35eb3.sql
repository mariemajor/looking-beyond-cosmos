-- Create user profiles table for spiritual preferences
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  birth_date DATE,
  spiritual_path TEXT[] DEFAULT '{}', -- e.g., ['crystal_healing', 'water_therapy', 'nature_connection']
  preferred_elements TEXT[] DEFAULT '{}', -- e.g., ['water', 'earth', 'fire', 'air']
  experience_level TEXT DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  intentions TEXT[] DEFAULT '{}', -- user's spiritual goals
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily rituals table
CREATE TABLE public.daily_rituals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('nature', 'water', 'crystals', 'meditation', 'breathwork')),
  difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes INTEGER NOT NULL,
  elements TEXT[] DEFAULT '{}', -- which elements this ritual involves
  spiritual_paths TEXT[] DEFAULT '{}', -- which paths this supports
  season TEXT[] DEFAULT '{}', -- optimal seasons
  moon_phase TEXT[] DEFAULT '{}', -- optimal moon phases
  instructions JSONB NOT NULL, -- step-by-step instructions
  benefits TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spiritual tips table
CREATE TABLE public.spiritual_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('nature', 'water', 'crystals', 'energy', 'manifestation')),
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  spiritual_paths TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user daily content table (tracks what content users have received)
CREATE TABLE public.user_daily_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ritual_id UUID REFERENCES public.daily_rituals(id),
  tip_id UUID REFERENCES public.spiritual_tips(id),
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_date)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_rituals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_content ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for rituals (public read)
CREATE POLICY "Anyone can view rituals" 
ON public.daily_rituals 
FOR SELECT 
USING (true);

-- Create policies for tips (public read)
CREATE POLICY "Anyone can view tips" 
ON public.spiritual_tips 
FOR SELECT 
USING (true);

-- Create policies for user daily content
CREATE POLICY "Users can view their own daily content" 
ON public.user_daily_content 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own daily content" 
ON public.user_daily_content 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily content" 
ON public.user_daily_content 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample spiritual content
INSERT INTO public.daily_rituals (title, description, category, difficulty, duration_minutes, elements, spiritual_paths, instructions, benefits) VALUES
('Morning Water Blessing', 'Connect with water energy to start your day with clarity and flow', 'water', 'beginner', 15, ARRAY['water'], ARRAY['energy_healing', 'chakra_work'], 
 '{"steps": ["Fill a clear glass with fresh water", "Hold the glass in both hands", "Set intention for clarity and flow", "Visualize blue light entering the water", "Drink mindfully while expressing gratitude"]}',
 ARRAY['Increased clarity', 'Emotional balance', 'Hydration awareness']),

('Crystal Grid Meditation', 'Create a sacred space using crystal energy for manifestation', 'crystals', 'intermediate', 30, ARRAY['earth'], ARRAY['crystal_healing', 'manifestation'],
 '{"steps": ["Choose 4 crystals that resonate with your intention", "Cleanse crystals with sage or moonlight", "Arrange in a square around your meditation space", "Sit in center and focus on your intention", "Visualize energy flowing between crystals"]}',
 ARRAY['Enhanced manifestation', 'Grounding', 'Energy amplification']),

('Forest Bathing Ritual', 'Immerse yourself in nature for healing and grounding', 'nature', 'beginner', 45, ARRAY['earth', 'air'], ARRAY['nature_connection', 'grounding'],
 '{"steps": ["Find a quiet natural space", "Remove shoes to connect with earth", "Place hands on a tree trunk", "Breathe deeply for 5 minutes", "Walk slowly, observing all senses"]}',
 ARRAY['Stress reduction', 'Grounding', 'Nature connection']);

INSERT INTO public.spiritual_tips (title, content, category, tags, difficulty, spiritual_paths) VALUES
('Cleansing Crystals with Moonlight', 'Place your crystals outside or on a windowsill during the full moon to cleanse and recharge their energy. The lunar energy removes negative vibrations and restores their natural power.', 'crystals', ARRAY['cleansing', 'moon', 'energy'], 'beginner', ARRAY['crystal_healing']),

('Sacred Water Ceremony', 'Create blessed water by setting intentions while holding a bowl of spring water under moonlight. Use this water to bless your space, plants, or for spiritual cleansing baths.', 'water', ARRAY['blessing', 'ceremony', 'cleansing'], 'intermediate', ARRAY['water_therapy', 'energy_healing']),

('Grounding Through Earth Connection', 'Walk barefoot on natural ground for at least 10 minutes daily. This practice, called earthing, helps discharge excess energy and connects you with the Earth''s healing frequency.', 'nature', ARRAY['grounding', 'barefoot', 'earth'], 'beginner', ARRAY['nature_connection', 'grounding']);
-- Fix RLS policies for profiles table to allow trigger to work
-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create new policies that allow the trigger to work
CREATE POLICY "Enable insert for authenticated users only" ON public.profiles
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id);

-- Ensure the trigger function has proper permissions
-- Recreate the trigger function with proper security settings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
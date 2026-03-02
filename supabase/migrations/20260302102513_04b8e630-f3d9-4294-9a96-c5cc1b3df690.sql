
-- Drop ALL existing policies on registrations
DROP POLICY IF EXISTS "Allow public registration inserts" ON public.registrations;
DROP POLICY IF EXISTS "Service role can read registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow public inserts" ON public.registrations;
DROP POLICY IF EXISTS "allow_public_insert" ON public.registrations;

-- Disable RLS entirely for registrations (public form, no auth needed)
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;

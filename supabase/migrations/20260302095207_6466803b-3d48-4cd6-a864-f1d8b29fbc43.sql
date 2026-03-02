
-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.registrations;

-- Create a PERMISSIVE INSERT policy for anon and authenticated users
CREATE POLICY "Allow public registration inserts"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);


-- Re-enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create PERMISSIVE insert policy (default is permissive when not specified as restrictive)
CREATE POLICY "public_insert_registrations"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

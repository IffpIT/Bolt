/*
  # Database Schema Update
  
  1. Tables
    - candidates: Store candidate information
    - companies: Store company information
  
  2. Indexes
    - Optimized queries for commonly accessed fields
  
  3. Security
    - Enable RLS for both tables
    - Policies for authenticated users
*/

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  civility text,
  origin text,
  contact_type text,
  contact_referent text,
  pedagogy_referent text,
  formation text,
  last_name text NOT NULL,
  first_name text NOT NULL,
  mobile_phone text,
  landline_phone text,
  email text,
  contact_status text,
  call_status text,
  refusal_reason text,
  learner_status text,
  financing text,
  appointment_status text,
  appointment_date date,
  appointment_time time,
  status_comment text,
  appointment_comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  siret text,
  address text,
  postal_code text,
  city text,
  phone text,
  email text,
  website text,
  sector text,
  contact_civility text,
  contact_last_name text,
  contact_first_name text,
  contact_role text,
  contact_phone text,
  contact_email text,
  referent text,
  apprentice_count integer DEFAULT 0,
  relationship_status text,
  comments text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_candidates_last_name ON candidates(last_name);
CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_contact_status ON candidates(contact_status);

CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_siret ON companies(siret);
CREATE INDEX IF NOT EXISTS idx_companies_relationship_status ON companies(relationship_status);

-- Drop existing triggers if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_candidates_updated_at') THEN
    DROP TRIGGER handle_candidates_updated_at ON candidates;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'handle_companies_updated_at') THEN
    DROP TRIGGER handle_companies_updated_at ON companies;
  END IF;
END $$;

-- Create triggers for updated_at
CREATE TRIGGER handle_candidates_updated_at
  BEFORE UPDATE ON candidates
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Enable Row Level Security
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'candidates' 
    AND policyname = 'Enable all access for authenticated users'
  ) THEN
    CREATE POLICY "Enable all access for authenticated users"
      ON candidates
      FOR ALL
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'companies' 
    AND policyname = 'Enable all access for authenticated users'
  ) THEN
    CREATE POLICY "Enable all access for authenticated users"
      ON companies
      FOR ALL
      TO authenticated
      USING (true);
  END IF;
END $$;
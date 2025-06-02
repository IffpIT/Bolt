/*
  # Create candidates and companies tables

  1. New Tables
    - `candidates`
      - Basic information (id, name, contact details)
      - Status tracking (contact, call, learner status)
      - Appointment management
      - Comments and notes
    - `companies`
      - Company information (id, name, contact details)
      - Contact person details
      - Relationship tracking
    
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
    
  3. Features
    - Automatic timestamps
    - Indexes for performance
    - Data validation
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
CREATE POLICY "Enable all access for authenticated users"
  ON candidates
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Enable all access for authenticated users"
  ON companies
  FOR ALL
  TO authenticated
  USING (true);
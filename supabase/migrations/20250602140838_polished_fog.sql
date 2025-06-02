-- Create candidates table
create table public.candidates (
  id uuid default gen_random_uuid() primary key,
  civility text,
  origin text,
  contact_type text,
  contact_referent text,
  pedagogy_referent text,
  formation text,
  last_name text not null,
  first_name text not null,
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
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create companies table
create table public.companies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
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
  apprentice_count integer default 0,
  relationship_status text,
  comments text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for better performance
create index idx_candidates_email on public.candidates(email);
create index idx_candidates_last_name on public.candidates(last_name);
create index idx_candidates_contact_status on public.candidates(contact_status);

create index idx_companies_name on public.companies(name);
create index idx_companies_siret on public.companies(siret);
create index idx_companies_relationship_status on public.companies(relationship_status);

-- Add RLS (Row Level Security) policies
alter table public.candidates enable row level security;
alter table public.companies enable row level security;

-- Create policies for authenticated users
create policy "Enable all access for authenticated users" on public.candidates
  for all using (auth.role() = 'authenticated');

create policy "Enable all access for authenticated users" on public.companies
  for all using (auth.role() = 'authenticated');

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger handle_candidates_updated_at
  before update on public.candidates
  for each row
  execute function public.handle_updated_at();

create trigger handle_companies_updated_at
  before update on public.companies
  for each row
  execute function public.handle_updated_at();
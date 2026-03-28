-- Enums
CREATE TYPE tier AS ENUM ('orbite', 'ariane', 'interstellar', 'multivers');
CREATE TYPE project_status AS ENUM ('building', 'review', 'live', 'paused');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'review', 'done', 'rejected');
CREATE TYPE ticket_type AS ENUM ('content', 'feature', 'bug', 'scope_exceeded');
CREATE TYPE contact_status AS ENUM ('lead', 'prospect', 'client', 'perdu');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled');
CREATE TYPE ticket_creator AS ENUM ('client', 'agent_ia', 'system');
CREATE TYPE scope_check AS ENUM ('in_scope', 'out_of_scope');

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  tier tier NOT NULL DEFAULT 'orbite',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status subscription_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('site', 'crm')),
  status project_status NOT NULL DEFAULT 'building',
  config JSONB NOT NULL DEFAULT '{}',
  deployed_url TEXT,
  preview_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);

-- Tickets
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type ticket_type NOT NULL DEFAULT 'content',
  status ticket_status NOT NULL DEFAULT 'open',
  created_by ticket_creator NOT NULL DEFAULT 'client',
  scope_check scope_check NOT NULL DEFAULT 'in_scope',
  brief JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_tickets_status ON tickets(status);

-- Contacts (CRM)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status contact_status NOT NULL DEFAULT 'lead',
  pipeline_stage TEXT,
  score_ia INTEGER,
  notes JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contacts_project_id ON contacts(project_id);

-- AI Usage
CREATE TABLE ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  tokens_cap INTEGER NOT NULL,
  cost_eur NUMERIC(10,4) NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

CREATE INDEX idx_ai_usage_user_date ON ai_usage(user_id, date);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies: projects
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies: tickets
CREATE POLICY "Users can view own tickets" ON tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tickets" ON tickets FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies: contacts
CREATE POLICY "Users can view own contacts" ON contacts FOR SELECT
  USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own contacts" ON contacts FOR INSERT
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own contacts" ON contacts FOR UPDATE
  USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

-- RLS Policies: ai_usage
CREATE POLICY "Users can view own usage" ON ai_usage FOR SELECT USING (auth.uid() = user_id);

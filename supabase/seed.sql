-- Seed data for development

-- Test users (one per tier)
INSERT INTO users (id, email, tier, subscription_status) VALUES
  ('00000000-0000-0000-0000-000000000001', 'demo-orbite@9point0.fr', 'orbite', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'demo-ariane@9point0.fr', 'ariane', 'active'),
  ('00000000-0000-0000-0000-000000000003', 'demo-interstellar@9point0.fr', 'interstellar', 'active'),
  ('00000000-0000-0000-0000-000000000004', 'demo-multivers@9point0.fr', 'multivers', 'active');

-- Test projects
INSERT INTO projects (id, user_id, type, status, config) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'site', 'live', '{"pages": ["accueil", "services", "contact"]}'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'crm', 'live', '{"features": ["pipeline", "scoring"]}');

-- Test tickets
INSERT INTO tickets (project_id, user_id, type, status, created_by, scope_check, brief) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'content', 'open', 'client', 'in_scope', '{"request": "Modifier la page accueil"}'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'feature', 'in_progress', 'agent_ia', 'in_scope', '{"request": "Ajouter scoring IA contacts"}');

-- Test contacts
INSERT INTO contacts (project_id, name, email, phone, status, pipeline_stage) VALUES
  ('10000000-0000-0000-0000-000000000002', 'Jean Dupont', 'jean@exemple.fr', '0601020304', 'lead', 'nouveau'),
  ('10000000-0000-0000-0000-000000000002', 'Marie Martin', 'marie@exemple.fr', '0605060708', 'prospect', 'qualifie'),
  ('10000000-0000-0000-0000-000000000002', 'Pierre Durand', 'pierre@exemple.fr', NULL, 'client', 'signe');

-- ============================================================
-- À exécuter dans Supabase : Dashboard > SQL Editor > New query
-- ============================================================

-- Table 1 : messages du formulaire de contact
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Table 2 : demandes de l'assistant (questionnaire pas-à-pas)
create table if not exists assistant_requests (
  id uuid primary key default gen_random_uuid(),
  infrastructure text,
  problem text,
  urgency text,
  location text,
  details text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Sécurité (RLS = Row Level Security)
-- La clé "anon" utilisée dans le front-end est PUBLIQUE (visible
-- dans le code du navigateur). Sans ces règles, n'importe qui
-- pourrait lire, modifier ou supprimer toutes les données.
-- On autorise ICI uniquement l'INSERTION anonyme, rien d'autre.
-- ============================================================

alter table contact_messages enable row level security;
alter table assistant_requests enable row level security;

create policy "Autoriser insertion anonyme - contact"
  on contact_messages
  for insert
  to anon
  with check (true);

create policy "Autoriser insertion anonyme - assistant"
  on assistant_requests
  for insert
  to anon
  with check (true);

-- Note : aucune policy "select" n'est créée pour "anon", donc
-- personne ne peut lire les données depuis le front-end.
-- Toi, tu pourras les consulter dans Supabase > Table Editor,
-- ou dans l'onglet "Database" avec ton compte (accès admin).

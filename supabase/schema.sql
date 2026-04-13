-- ===========================================
-- ShopPilot - Supabase Schema
-- Run this in your Supabase SQL editor
-- ===========================================

-- Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Connected Shopify stores
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  shop_domain text not null,
  access_token text not null, -- encrypted at app level before storage
  scope text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, shop_domain)
);

-- AI provider configuration per user
create table if not exists public.ai_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  provider text not null check (provider in ('claude', 'openai', 'gemini')),
  api_key text not null, -- encrypted at app level before storage
  model text not null default 'claude-sonnet-4-6',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, provider)
);

-- Chat history
create table if not exists public.chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  store_id uuid references public.stores(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.users enable row level security;
alter table public.stores enable row level security;
alter table public.ai_configs enable row level security;
alter table public.chat_history enable row level security;

-- Users can only access their own data
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

create policy "Users can view own stores" on public.stores for select using (auth.uid() = user_id);
create policy "Users can manage own stores" on public.stores for all using (auth.uid() = user_id);

create policy "Users can view own ai configs" on public.ai_configs for select using (auth.uid() = user_id);
create policy "Users can manage own ai configs" on public.ai_configs for all using (auth.uid() = user_id);

create policy "Users can view own chat history" on public.chat_history for select using (auth.uid() = user_id);
create policy "Users can manage own chat history" on public.chat_history for all using (auth.uid() = user_id);

-- Indexes
create index if not exists idx_stores_user_id on public.stores(user_id);
create index if not exists idx_ai_configs_user_id on public.ai_configs(user_id);
create index if not exists idx_chat_history_user_id on public.chat_history(user_id);
create index if not exists idx_chat_history_store_id on public.chat_history(store_id);
create index if not exists idx_chat_history_created_at on public.chat_history(created_at);

-- Users table
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique,
  username text unique,
  avatar_url text,
  role text check (role in ('user','admin')) default 'user',
  created_at timestamp with time zone default now()
);

-- In case the table already exists without username, add it idempotently
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'users' and column_name = 'username'
  ) then
    alter table users add column username text unique;
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'users' and column_name = 'avatar_url'
  ) then
    alter table users add column avatar_url text;
  end if;
end $$;

-- Add username format check constraint if missing
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'users_username_format_ck'
  ) then
    alter table users add constraint users_username_format_ck
      check (username is null or username ~ '^[a-z0-9_]{3,20}$');
  end if;
end $$;

-- Enforce lowercase usernames (idempotent)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'users_username_lower_ck'
  ) then
    alter table users add constraint users_username_lower_ck
      check (username is null or username = lower(username));
  end if;
end $$;

-- Case-insensitive uniqueness on username via functional unique index (idempotent)
create unique index if not exists users_username_lower_uidx on users (lower(username));

-- Appreciations table
create table if not exists appreciations (
  id uuid primary key default uuid_generate_v4(),
  message text not null,
  username text not null,
  created_at timestamp with time zone default now()
);

-- Length constraint on messages (1..1000 chars) (idempotent)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'appreciations_message_len_ck'
  ) then
    alter table appreciations add constraint appreciations_message_len_ck
      check (char_length(message) between 1 and 1000);
  end if;
end $$;

-- FK: appreciations.username references users.username (idempotent)
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where table_name = 'appreciations' and constraint_type = 'FOREIGN KEY' and constraint_name = 'appreciations_username_fkey'
  ) then
    alter table appreciations add constraint appreciations_username_fkey
      foreign key (username) references users(username) on delete cascade;
  end if;
end $$;

-- Helpful indexes for lookups and analytics
create index if not exists idx_appreciations_username on appreciations(username);
create index if not exists idx_appreciations_created_at on appreciations(created_at);
create index if not exists idx_appreciations_username_created_at on appreciations(username, created_at);

-- Admin logs
create table if not exists admin_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references users(id) on delete set null,
  action text,
  created_at timestamp with time zone default now()
);

-- Analytics view: total users, total messages, messages per day
create or replace view analytics_overview as
select
  (select count(distinct users.id) from users) as total_users,
  (select count(distinct appreciations.id) from appreciations) as total_messages,
  date_trunc('day', appreciations.created_at) as day,
  count(appreciations.id) as messages_per_day
from appreciations
group by day
order by day asc;

-- KPIs: total users, total messages, active users (90d), average messages per user
create or replace function get_kpis()
returns table (
  total_users bigint,
  total_messages bigint,
  active_users_90d bigint,
  avg_messages_per_user numeric
) language sql stable as $$
  select
    (select count(*) from users) as total_users,
    (select count(*) from appreciations) as total_messages,
    (select count(distinct username) from appreciations where created_at >= now() - interval '90 days') as active_users_90d,
    coalesce((select count(*)::numeric / nullif(count(distinct username),0) from appreciations), 0) as avg_messages_per_user;
$$;

-- RLS policies
alter table users enable row level security;
alter table appreciations enable row level security;
alter table admin_logs enable row level security;

-- users policies
drop policy if exists users_self_select on users;
create policy users_self_select on users
for select
using (true);

-- Prevent changing username after 1 second of account creation
create or replace function prevent_username_change_after_1s()
returns trigger language plpgsql as $$
begin
  if (TG_OP = 'UPDATE' and NEW.username is distinct from OLD.username) then
    if OLD.username is not null and extract(epoch from now() - OLD.created_at) > 1 then
      raise exception 'username cannot be changed after 1 second of account creation';
    end if;
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_users_username_lock on users;
create trigger trg_users_username_lock
  before update on users
  for each row execute function prevent_username_change_after_1s();

drop policy if exists users_self_insert on users;
create policy users_self_insert on users
for insert
with check (auth.email() = email);

drop policy if exists users_self_update on users;
create policy users_self_update on users
for update
using (auth.email() = email);

-- appreciations policies (public can insert, anyone can read)
drop policy if exists appreciations_insert_public on appreciations;
create policy appreciations_insert_public on appreciations
for insert
with check (true);

drop policy if exists appreciations_select_all on appreciations;
create policy appreciations_select_all on appreciations
for select
using (true);

-- admin_logs policies (read-only public; tighten as needed)
drop policy if exists admin_logs_select_all on admin_logs;
create policy admin_logs_select_all on admin_logs
for select
using (true);

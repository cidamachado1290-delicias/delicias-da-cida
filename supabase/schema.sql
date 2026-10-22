-- Delicias da Cida - banco de receitas e buscas
create table if not exists receitas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text not null,
  dificuldade text not null,
  tempo text not null,
  rendimento text,
  ingredientes jsonb not null,
  preparo jsonb not null,
  status text default 'aprovada',
  fonte text default 'base_curada',
  observacao text,
  created_at timestamp with time zone default now()
);

create table if not exists buscas_receitas (
  id uuid primary key default gen_random_uuid(),
  categoria text,
  dificuldade text,
  tempo text,
  termo text,
  receita_gerada jsonb,
  aprovada boolean default false,
  created_at timestamp with time zone default now()
);

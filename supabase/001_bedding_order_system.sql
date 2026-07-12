-- FOR-e 寢具訂購系統 V4.5｜Supabase 公開共用免登入版
-- 請在 Supabase Dashboard > SQL Editor 一次完整執行。
-- 本版不使用 Supabase Auth、帳號或角色權限。
-- 注意：任何取得正式網址的人都可讀寫系統資料。

create extension if not exists pgcrypto;

-- 先確保共用資料表存在；若是從 V4.4 升級，現有 data 內容會保留。
create table if not exists public.app_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  revision bigint not null default 1,
  updated_by text,
  updated_at timestamptz not null default now()
);

-- 先移除依賴舊 Auth 函式的 app_state policy，避免刪除函式時發生依賴錯誤。
drop policy if exists app_state_select_active_users on public.app_state;
drop policy if exists app_state_public_select on public.app_state;

-- 若曾執行 V4.4 登入版 SQL，移除登入與角色相關物件。
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.current_user_role() cascade;
drop function if exists public.current_user_is_active() cascade;
drop table if exists public.profiles cascade;

-- 移除舊版兩參數 RPC，改用附帶瀏覽器識別碼的三參數 RPC。
drop function if exists public.save_bedding_state(jsonb, bigint);

-- 相容 V4.4：舊版 updated_by 為 auth.users UUID 外鍵，改為匿名瀏覽器識別文字。
alter table public.app_state drop constraint if exists app_state_updated_by_fkey;
alter table public.app_state alter column updated_by drop default;
alter table public.app_state alter column updated_by type text using updated_by::text;

insert into public.app_state (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.app_state enable row level security;
alter table public.app_state replica identity full;

-- 免登入公開讀取。實際寫入只透過下方 RPC，以保留 revision 版本衝突檢查。
create policy app_state_public_select
on public.app_state
for select
to anon, authenticated
using (true);

revoke all on table public.app_state from public;
revoke all on table public.app_state from anon;
revoke all on table public.app_state from authenticated;
grant select on table public.app_state to anon, authenticated;

create or replace function public.save_bedding_state(
  p_data jsonb,
  p_expected_revision bigint,
  p_client_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.app_state%rowtype;
begin
  update public.app_state
  set data = coalesce(p_data, '{}'::jsonb),
      revision = revision + 1,
      updated_by = nullif(left(coalesce(p_client_id, ''), 200), ''),
      updated_at = now()
  where id = 'main'
    and revision = p_expected_revision
  returning * into v_row;

  if found then
    return jsonb_build_object(
      'success', true,
      'revision', v_row.revision,
      'updated_at', v_row.updated_at
    );
  end if;

  select * into v_row
  from public.app_state
  where id = 'main';

  return jsonb_build_object(
    'success', false,
    'revision', v_row.revision,
    'data', v_row.data,
    'updated_at', v_row.updated_at
  );
end;
$$;

revoke all on function public.save_bedding_state(jsonb, bigint, text) from public;
grant execute on function public.save_bedding_state(jsonb, bigint, text) to anon, authenticated;

-- Realtime：讓其他開啟系統的人員收到最新資料通知。
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_state'
  ) then
    execute 'alter publication supabase_realtime add table public.app_state';
  end if;
end $$;

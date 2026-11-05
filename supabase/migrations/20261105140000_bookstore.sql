create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to postgres, service_role, anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated, service_role;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  blurb text not null default '',
  image_url text,
  sort_order int not null default 0
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id),
  slug text not null unique,
  title text not null,
  author text not null,
  blurb text not null,
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2),
  image_url text,
  pages int,
  published_year int,
  isbn text,
  publisher text,
  format text not null default 'Paperback',
  language text not null default 'English',
  level text,
  stock int not null default 0 check (stock >= 0),
  units_sold int not null default 0,
  rating_avg numeric(3,2) not null default 0,
  rating_count int not null default 0,
  badge text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index products_category_id_idx on public.products (category_id);
create index products_published_created_idx on public.products (is_published, created_at desc);
create index products_units_sold_idx on public.products (units_sold desc);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  created_at timestamptz not null default now()
);

create index reviews_product_id_idx on public.reviews (product_id);

create sequence public.order_number_seq start with 10428;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  full_name text not null,
  phone text not null,
  address_line text not null,
  city text not null,
  region text not null,
  payment_method text not null check (payment_method in ('mtn_momo', 'telecel_cash', 'at_money', 'card', 'cod')),
  momo_number text,
  notes text,
  status text not null default 'placed' check (status in ('placed', 'confirmed', 'packed', 'dispatched', 'delivered', 'cancelled')),
  subtotal numeric(10,2) not null,
  shipping numeric(10,2) not null,
  total numeric(10,2) not null,
  access_token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create index orders_user_id_idx on public.orders (user_id);
create index orders_status_created_idx on public.orders (status, created_at desc);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  title text not null,
  unit_price numeric(10,2) not null,
  quantity int not null check (quantity > 0)
);

create index order_items_order_id_idx on public.order_items (order_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null default 'General',
  body text not null,
  created_at timestamptz not null default now()
);

create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.reviews enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.messages enable row level security;
alter table public.subscribers enable row level security;

create policy profiles_select on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or private.is_admin());

create policy profiles_update on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or private.is_admin())
  with check (id = (select auth.uid()) or private.is_admin());

create policy categories_select on public.categories
  for select to anon, authenticated
  using (true);

create policy categories_admin on public.categories
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy products_select on public.products
  for select to anon, authenticated
  using (is_published or private.is_admin());

create policy products_admin on public.products
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy reviews_select on public.reviews
  for select to anon, authenticated
  using (true);

create policy reviews_insert on public.reviews
  for insert to authenticated
  with check (char_length(body) between 8 and 800);

create policy orders_select on public.orders
  for select to authenticated
  using (user_id = (select auth.uid()) or private.is_admin());

create policy orders_update on public.orders
  for update to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy order_items_select on public.order_items
  for select to authenticated
  using (
    private.is_admin()
    or exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = (select auth.uid())
    )
  );

create policy messages_select on public.messages
  for select to authenticated
  using (private.is_admin());

create policy subscribers_select on public.subscribers
  for select to authenticated
  using (private.is_admin());

grant select on public.categories, public.products, public.reviews to anon, authenticated;
grant insert on public.reviews to authenticated;
grant select, insert, update, delete on public.products, public.categories to authenticated;
grant select, update on public.orders, public.order_items to authenticated;
grant select on public.messages, public.subscribers, public.profiles to authenticated;
grant update on public.profiles to authenticated;
grant all on public.profiles, public.categories, public.products, public.reviews, public.orders, public.order_items, public.messages, public.subscribers to service_role;
grant usage, select on public.order_number_seq to anon, authenticated, service_role;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    case when new.raw_app_meta_data ->> 'role' = 'admin' then 'admin' else 'customer' end
  );
  return new;
end;
$$;

create or replace function private.confirm_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email_confirmed_at is null then
    new.email_confirmed_at := now();
  end if;
  return new;
end;
$$;

create or replace function private.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
     and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'admin' then
    new.role := old.role;
  end if;
  return new;
end;
$$;

create or replace function private.refresh_product_rating()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  pid uuid := coalesce(new.product_id, old.product_id);
begin
  update public.products p
  set
    rating_avg = coalesce((select round(avg(r.rating)::numeric, 2) from public.reviews r where r.product_id = pid), 0),
    rating_count = (select count(*) from public.reviews r where r.product_id = pid)
  where p.id = pid;
  return null;
end;
$$;

revoke all on function private.handle_new_user() from public;
revoke all on function private.confirm_new_user() from public;
revoke all on function private.protect_profile_role() from public;
revoke all on function private.refresh_product_rating() from public;

create trigger confirm_new_user_email
  before insert on auth.users
  for each row execute function private.confirm_new_user();

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create trigger profiles_lock_role
  before update on public.profiles
  for each row execute function private.protect_profile_role();

create trigger reviews_refresh_rating
  after insert or update or delete on public.reviews
  for each row execute function private.refresh_product_rating();

create or replace function public.place_order(
  p_full_name text,
  p_email text,
  p_phone text,
  p_address text,
  p_city text,
  p_region text,
  p_payment_method text,
  p_momo_number text,
  p_notes text,
  p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_product record;
  v_subtotal numeric(10,2) := 0;
  v_shipping numeric(10,2);
  v_order_id uuid;
  v_number text;
  v_token uuid := gen_random_uuid();
  v_seen int := 0;
  v_expected int;
  v_regions text[] := array[
    'Greater Accra','Ashanti','Western','Western North','Central','Eastern','Volta','Oti',
    'Northern','Savannah','North East','Upper East','Upper West','Bono','Bono East','Ahafo'
  ];
  v_methods text[] := array['mtn_momo','telecel_cash','at_money','card','cod'];
begin
  if p_full_name is null or length(trim(p_full_name)) < 2 then
    raise exception 'Please add the name for this delivery';
  end if;
  if p_email is null or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Please add a valid email';
  end if;
  if p_phone is null or length(regexp_replace(p_phone, '\D', '', 'g')) < 9 then
    raise exception 'Please add a Ghana phone number';
  end if;
  if p_address is null or length(trim(p_address)) < 4 then
    raise exception 'Please add a delivery address';
  end if;
  if p_city is null or length(trim(p_city)) < 2 then
    raise exception 'Please add a city';
  end if;
  if not (p_region = any (v_regions)) then
    raise exception 'Choose a region in Ghana';
  end if;
  if not (p_payment_method = any (v_methods)) then
    raise exception 'Choose a payment method';
  end if;
  if p_payment_method in ('mtn_momo','telecel_cash','at_money')
     and length(regexp_replace(coalesce(p_momo_number, ''), '\D', '', 'g')) < 9 then
    raise exception 'Add the mobile money number for this order';
  end if;
  if p_payment_method = 'cod' and p_region not in ('Greater Accra', 'Ashanti') then
    raise exception 'Pay on delivery is available in Greater Accra and Ashanti';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 20 then
    raise exception 'Your bag is empty';
  end if;

  select count(*) into v_expected
  from (
    select (value ->> 'product_id')::uuid
    from jsonb_array_elements(p_items)
    group by 1
  ) requested;

  for v_product in
    select p.id, p.title, p.price, p.stock, p.is_published, r.quantity
    from (
      select (value ->> 'product_id')::uuid as product_id,
             sum((value ->> 'quantity')::int)::int as quantity
      from jsonb_array_elements(p_items)
      group by 1
    ) r
    join public.products p on p.id = r.product_id
    for update of p
  loop
    v_seen := v_seen + 1;
    if v_product.quantity is null or v_product.quantity < 1 or v_product.quantity > 8 then
      raise exception 'Choose between 1 and 8 copies of each book';
    end if;
    if not v_product.is_published then
      raise exception '% is not available right now', v_product.title;
    end if;
    if v_product.stock < v_product.quantity then
      raise exception '% has only % left on the shelf', v_product.title, v_product.stock;
    end if;
    v_subtotal := v_subtotal + (v_product.price * v_product.quantity);
  end loop;

  if v_seen <> v_expected then
    raise exception 'A book in your bag is no longer on the shelf';
  end if;

  v_shipping := case
    when p_region = 'Greater Accra' then case when v_subtotal >= 250 then 0 else 25 end
    when p_region = 'Ashanti' then case when v_subtotal >= 400 then 0 else 40 end
    else case when v_subtotal >= 500 then 0 else 55 end
  end;

  v_number := 'TM-' || lpad(nextval('public.order_number_seq')::text, 5, '0');

  insert into public.orders (
    order_number, user_id, email, full_name, phone, address_line, city, region,
    payment_method, momo_number, notes, status, subtotal, shipping, total, access_token
  ) values (
    v_number,
    auth.uid(),
    lower(trim(p_email)),
    trim(p_full_name),
    trim(p_phone),
    trim(p_address),
    trim(p_city),
    p_region,
    p_payment_method,
    nullif(trim(coalesce(p_momo_number, '')), ''),
    nullif(trim(coalesce(p_notes, '')), ''),
    'placed',
    v_subtotal,
    v_shipping,
    v_subtotal + v_shipping,
    v_token
  )
  returning id into v_order_id;

  insert into public.order_items (order_id, product_id, title, unit_price, quantity)
  select v_order_id, p.id, p.title, p.price, r.quantity
  from (
    select (value ->> 'product_id')::uuid as product_id,
           sum((value ->> 'quantity')::int)::int as quantity
    from jsonb_array_elements(p_items)
    group by 1
  ) r
  join public.products p on p.id = r.product_id;

  update public.products p
  set stock = p.stock - r.quantity,
      units_sold = p.units_sold + r.quantity
  from (
    select (value ->> 'product_id')::uuid as product_id,
           sum((value ->> 'quantity')::int)::int as quantity
    from jsonb_array_elements(p_items)
    group by 1
  ) r
  where p.id = r.product_id;

  return jsonb_build_object(
    'order_number', v_number,
    'access_token', v_token,
    'subtotal', v_subtotal,
    'shipping', v_shipping,
    'total', v_subtotal + v_shipping
  );
exception
  when invalid_text_representation then
    raise exception 'A book in your bag could not be read';
end;
$$;

create or replace function public.get_order_by_token(p_token uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_order public.orders;
  v_items jsonb;
begin
  select * into v_order from public.orders where access_token = p_token;
  if not found then
    return null;
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
    'title', oi.title,
    'quantity', oi.quantity,
    'unit_price', oi.unit_price,
    'product_id', oi.product_id
  ) order by oi.title), '[]'::jsonb)
  into v_items
  from public.order_items oi
  where oi.order_id = v_order.id;

  return jsonb_build_object(
    'order_number', v_order.order_number,
    'full_name', v_order.full_name,
    'email', v_order.email,
    'phone', v_order.phone,
    'address_line', v_order.address_line,
    'city', v_order.city,
    'region', v_order.region,
    'payment_method', v_order.payment_method,
    'status', v_order.status,
    'subtotal', v_order.subtotal,
    'shipping', v_order.shipping,
    'total', v_order.total,
    'created_at', v_order.created_at,
    'items', v_items
  );
end;
$$;

create or replace function public.submit_message(
  p_name text,
  p_email text,
  p_topic text,
  p_body text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_name is null or length(trim(p_name)) < 2 then
    raise exception 'Please add your name';
  end if;
  if p_email is null or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Please add a valid email';
  end if;
  if p_body is null or length(trim(p_body)) < 12 then
    raise exception 'Tell us a little more so we can help';
  end if;
  insert into public.messages (name, email, topic, body)
  values (
    trim(p_name),
    lower(trim(p_email)),
    coalesce(nullif(trim(p_topic), ''), 'General'),
    trim(p_body)
  );
end;
$$;

create or replace function public.subscribe_newsletter(p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_email is null or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Please add a valid email';
  end if;
  insert into public.subscribers (email)
  values (lower(trim(p_email)))
  on conflict (email) do nothing;
end;
$$;

revoke all on function public.place_order(text, text, text, text, text, text, text, text, text, jsonb) from public;
revoke all on function public.get_order_by_token(uuid) from public;
revoke all on function public.submit_message(text, text, text, text) from public;
revoke all on function public.subscribe_newsletter(text) from public;
grant execute on function public.place_order(text, text, text, text, text, text, text, text, text, jsonb) to anon, authenticated;
grant execute on function public.get_order_by_token(uuid) to anon, authenticated;
grant execute on function public.submit_message(text, text, text, text) to anon, authenticated;
grant execute on function public.subscribe_newsletter(text) to anon, authenticated;

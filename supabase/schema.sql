-- ============================================================
-- Sowan.id — Supabase Database Schema
-- Run this in the Supabase SQL Editor after creating your project
-- ============================================================

-- Profiles (extends Supabase Auth users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  role text not null default 'customer' check (role in ('customer', 'mentor')),
  avatar_url text,
  created_at timestamptz default now() not null
);

-- Mentors
create table public.mentors (
  id serial primary key,
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  title text not null,
  city text not null,
  language text not null,
  bio text,
  experience text[] default '{}',
  interests text[] default '{}',
  price integer not null,
  tier text not null default 'sahabat' check (tier in ('sahabat', 'pemandu', 'maestro')),
  avatar_url text,
  video_id text,
  rating decimal(3,2) default 5.00,
  total_sessions integer default 0,
  slots_available integer default 5,
  badge text,
  is_online boolean default false,
  created_at timestamptz default now() not null
);

-- Bookings
create table public.bookings (
  id serial primary key,
  customer_id uuid references public.profiles(id) on delete cascade,
  mentor_id integer references public.mentors(id) on delete cascade,
  session_time text not null,
  session_date text not null,
  amount integer not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  room_id integer,
  created_at timestamptz default now() not null
);

-- Reviews
create table public.reviews (
  id serial primary key,
  booking_id integer references public.bookings(id) on delete cascade,
  customer_id uuid references public.profiles(id) on delete cascade,
  mentor_id integer references public.mentors(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  message text,
  created_at timestamptz default now() not null
);

-- ── Row Level Security ──────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.mentors enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- Profiles
create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Mentors (public read, admin write)
create policy "Mentors are publicly viewable" on public.mentors for select using (true);
create policy "Mentors can update their own record" on public.mentors for update using (
  profile_id = auth.uid()
);

-- Bookings
create policy "Customers see own bookings" on public.bookings for select using (auth.uid() = customer_id);
create policy "Mentors see their bookings" on public.bookings for select using (
  mentor_id in (select id from public.mentors where profile_id = auth.uid())
);
create policy "Customers can create bookings" on public.bookings for insert with check (auth.uid() = customer_id);
create policy "Customers can update own bookings" on public.bookings for update using (auth.uid() = customer_id);

-- Reviews
create policy "Reviews are publicly viewable" on public.reviews for select using (true);
create policy "Customers can write reviews" on public.reviews for insert with check (auth.uid() = customer_id);

-- ── Trigger: auto-create profile on signup ──────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.email),
    coalesce(new.raw_user_meta_data ->> 'role', 'customer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Seed Data: Mentor list (migrate from hardcoded app data) ─

insert into public.mentors (name, title, city, language, bio, experience, interests, price, tier, avatar_url, video_id, rating, total_sessions, slots_available, badge, is_online) values
  ('Opa Adriel', 'Pakar Sejarah Jawa', 'Yogyakarta', 'Jawa', 'Mantan kepala museum budaya dengan 40 tahun pengalaman mengajar sejarah dan budaya Jawa kepada generasi muda dan wisatawan mancanegara.', ARRAY['Kurator Museum Budaya Jawa (35 thn)', 'Dosen Sejarah IAIN Yogyakarta (10 thn)', 'Penulis 3 buku sejarah Jawa'], ARRAY['Sejarah Keraton', 'Batik & Keris', 'Filosofi Jawa', 'Wayang Kulit'], 220000, 'maestro', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400', NULL, 4.98, 312, 3, 'Top Rated', true),
  ('Ibu Ratna', 'Mantan Diplomat', 'Jakarta', 'Indonesia', 'Mantan diplomat senior yang telah bertugas di 8 negara selama 30 tahun. Ahli dalam diplomasi budaya dan komunikasi lintas budaya.', ARRAY['Duta Besar RI untuk Belanda (5 thn)', 'Diplomat Kementerian Luar Negeri (25 thn)', 'Negosiator Perjanjian Bilateral'], ARRAY['Diplomasi & Protokol', 'Etika Bisnis Internasional', 'Bahasa & Komunikasi', 'Kebudayaan Nusantara'], 350000, 'maestro', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400', 'N90UIXMuMMU', 4.95, 256, 0, 'Cultural Expert', false),
  ('Bapak Dodi', 'Pebisnis Kuliner', 'Bandung', 'Sunda', 'Pendiri jaringan restoran Sunda terkemuka dengan 45 tahun pengalaman di industri kuliner. Ahli masakan tradisional Sunda dan bisnis F&B.', ARRAY['Pendiri Restoran Sunda Asri (40 thn)', 'Konsultan Kuliner 50+ restoran', 'Juri Festival Kuliner Nasional'], ARRAY['Masakan Sunda Tradisional', 'Bisnis Kuliner', 'Rempah Nusantara', 'Etika Dagang'], 180000, 'pemandu', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400', NULL, 4.87, 198, 2, NULL, true);

-- Add remaining mentors as needed via Supabase Dashboard or additional inserts

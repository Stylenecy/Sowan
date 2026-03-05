# DATABASE SCHEMA & ARCHITECTURE: SOWAN.ID (SUPABASE POSTGRESQL)

## 1. ENUMS (Tipe Data Kustom)
Untuk menjaga konsistensi data, gunakan Enum types berikut:
- `user_role`: 'mentor', 'customer', 'ambassador'
- `class_type`: '1-on-1', 'group'
- `booking_status`: 'pending', 'confirmed', 'completed', 'cancelled'
- `payment_status`: 'unpaid', 'paid', 'refunded'

## 2. TABEL UTAMA & RELASI (Schema Definition)

### A. Tabel `profiles`
Menyimpan data publik pengguna. Terhubung langsung dengan `auth.users` bawaan Supabase.
- `id` (UUID, Primary Key, References `auth.users.id`)
- `full_name` (Text, Not Null)
- `role` (Enum `user_role`, Default 'customer')
- `avatar_url` (Text, Nullable)
- `origin_city` (Text, Nullable) -> Limit to: 'Jogja', 'Bali', 'Jakarta', 'Bandung'.
- `teaching_languages` (Text[], Nullable) -> Limit to: 'English', 'Mandarin', 'Japanese', 'Korean', 'Indonesian'.
- `bio_storytelling` (Text, Nullable) -> Penjelasan singkat tentang budaya/pengalaman hidup lansia.
- `hourly_rate` (Integer, Nullable) -> Harga per sesi dalam Rupiah (IDR).
- `rating` (Numeric(3,2), Default 0.00) -> Skala 1.00 - 5.00.
- `created_at` (Timestamptz, Default `now()`)

### B. Tabel `classes`
Menyimpan paket kelas atau topik mentoring yang ditawarkan lansia.
- `id` (UUID, Primary Key, Default `uuid_generate_v4()`)
- `mentor_id` (UUID, Foreign Key References `profiles.id`)
- `topic_name` (Text, Not Null) -> Contoh: "Tata Krama Bisnis Jakarta", "Filosofi Subak Bali".
- `class_type` (Enum `class_type`, Default '1-on-1')
- `duration_minutes` (Integer, Default 60)
- `price` (Integer, Not Null)
- `created_at` (Timestamptz, Default `now()`)

### C. Tabel `bookings`
Menyimpan transaksi dan jadwal Sesi Sowan.
- `id` (UUID, Primary Key, Default `uuid_generate_v4()`)
- `customer_id` (UUID, Foreign Key References `profiles.id`)
- `class_id` (UUID, Foreign Key References `classes.id`)
- `schedule_time` (Timestamptz, Not Null) -> Jadwal yang sudah disinkronisasi zona waktunya.
- `status` (Enum `booking_status`, Default 'pending')
- `payment_status` (Enum `payment_status`, Default 'unpaid')
- `meeting_link` (Text, Nullable) -> URL Room Video Call dari Daily.co / Agora API.
- `created_at` (Timestamptz, Default `now()`)

## 3. ROW LEVEL SECURITY (RLS) POLICIES
Wajib aktifkan RLS di semua tabel untuk melindungi data privasi lansia sesuai UU PDP:
1. `profiles`: Semua orang bisa membaca (SELECT) data mentor, tapi hanya user yang bersangkutan yang bisa mengedit (UPDATE) profilnya sendiri.
2. `bookings`: Mentor hanya bisa melihat booking yang masuk ke ID mereka. Customer hanya bisa melihat riwayat booking mereka sendiri.

## 4. MOCK DATA (SEEDING) UNTUK DEMO MVP
Gunakan data berikut saat meng-generate UI agar tidak kosong:

### Mentor (Lansia):
1. **Oma Ratna**
   - Role: mentor | City: Jakarta | Rate: Rp150.000
   - Languages: ['Japanese', 'Indonesian']
   - Bio: "Mantan diplomat yang menghabiskan 20 tahun di Tokyo. Mari belajar tata krama bisnis Indonesia dan percakapan formal."
   - Topic (`classes`): "Indonesian Business Etiquette & Language".
2. **Mbah Harjo**
   - Role: mentor | City: Jogja | Rate: Rp100.000
   - Languages: ['English', 'Indonesian']
   - Bio: "Pembatik keraton generasi ketiga. Saya akan membagikan filosofi kesabaran di balik setiap motif batik Jawa."
   - Topic (`classes`): "Javanese Philosophy & Slow Living".
3. **Bli Wayan**
   - Role: mentor | City: Bali | Rate: Rp120.000
   - Languages: ['Mandarin', 'English', 'Indonesian']
   - Bio: "Tokoh adat desa. Mari berdiskusi tentang Tri Hita Karana dan keseimbangan alam (Subak)."
   - Topic (`classes`): "Balinese Spiritual Balance & Culture".

### Customer (Ekspatriat):
1. **Kenji** (Customer) - Ekspatriat asal Jepang yang bekerja di Sudirman, Jakarta.
2. **Sarah** (Customer) - Digital Nomad asal UK yang menetap di Canggu, Bali.
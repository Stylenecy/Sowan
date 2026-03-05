# FRONTEND DEVELOPMENT ROADMAP: SOWAN.ID
**PENTING UNTUK AI AGENT:** Kerjakan roadmap ini secara berurutan dari Phase 1 hingga Phase 5. Sebelum men-generate UI, pastikan Anda selalu merujuk pada `Protocol.md` untuk skema warna aksesibilitas lansia (Soft Cream, Deep Navy Blue, Warm Amber) dan ukuran *touch target* (Minimal 44x44px).

## PHASE 1: Initialization & Global UI
- [ ] **Task 1.1: Konfigurasi Tema.** Update `tailwind.config.ts` untuk memasukkan variabel warna Sowan.id:
  - `background-cream`: `#FAF9F6`
  - `primary-navy`: `#1A365D`
  - `accent-amber`: `#D97706`
  - `accent-terracotta`: `#C53030`
- [ ] **Task 1.2: Install Shadcn Components.** Generate komponen UI dasar berikut: `button`, `card`, `input`, `select`, `dialog`, `avatar`, dan `badge`.
- [ ] **Task 1.3: Global Layout.** Buat komponen `Navbar` (logo di kiri, link login di kanan) dan `Footer` sederhana. Pastikan Navbar menggunakan teks Navy Blue yang kontras.

## PHASE 2: Landing Page (Public Facing)
File target: `app/page.tsx`
- [ ] **Task 2.1: Hero Section.** Buat section utama dengan teks "Menyambung Bahasa, Mewariskan Makna." Tambahkan 2 tombol CTA:
  1. "Cari Mentor Budaya" (Warna Primary Navy, mengarah ke `/explore`).
  2. "Gabung sebagai Lansia" (Warna Accent Amber, desain tombol besar).
- [ ] **Task 2.2: Value Proposition Section.** Buat 3 kolom fitur yang menonjolkan: *Authentic Cultural Immersion*, *Elderly Empowerment* (SDG 8), dan *Low-Carbon Tourism*.

## PHASE 3: Expat / Learner Flow (Demand Side)
Flow ini ditujukan untuk anak muda/turis, desain boleh modern ala e-learning.
- [ ] **Task 3.1: Halaman Eksplorasi (`app/explore/page.tsx`).** - Buat form filter di bagian atas: Dropdown "Pilih Kota" (Jogja, Bali, Jakarta, Bandung) dan "Bahasa Pengantar" (EN, JP, KR, CN, ID).
  - Buat Grid Layout untuk menampilkan `MentorCard` dari data dummy.
- [ ] **Task 3.2: Mentor Detail Page (`app/mentor/[id]/page.tsx`).**
  - Tampilkan `Avatar` mentor, Bio (Storytelling), daftar keahlian, dan `hourly_rate`.
  - Buat tombol CTA "Booking Sesi" yang akan membuka Modal/Dialog untuk memilih jadwal.

## PHASE 4: Elderly / Mentor Dashboard (Supply Side - HIGH ACCESSIBILITY)
**PERHATIAN AI:** Area ini khusus LANSIA. DILARANG menggunakan font kecil. Hilangkan elemen dekoratif yang tidak perlu.
- [ ] **Task 4.1: Mentor Dashboard (`app/dashboard/mentor/page.tsx`).**
  - Buat tampilan satu kolom (Single Column Layout) dengan background Soft Cream.
  - Tampilkan teks sapaan besar: "Selamat Pagi, Oma Ratna."
- [ ] **Task 4.2: Card Jadwal Hari Ini.**
  - Buat Card raksasa yang berisi jadwal "Sowan" terdekat.
  - Cantumkan nama customer dan bahasa yang digunakan (contoh: "Kenji - Bahasa Jepang").
- [ ] **Task 4.3: Tombol Video Call Raksasa.**
  - Buat tombol "MULAI SOWAN" di dalam Card Jadwal. 
  - *Constraint Khusus:* Tombol ini harus berukuran sangat besar (minimal `h-16` atau 64px), berwarna Hijau Terang atau Warm Amber, dengan teks tebal (bold).

## PHASE 5: WebRTC Room Interface (Video Call UI)
File target: `app/room/[id]/page.tsx`
- [ ] **Task 5.1: Base Room UI.** Buat layout dasar untuk *video call* (placeholder grid untuk video lokal dan remote).
- [ ] **Task 5.2: Elderly-Specific Controls.**
  - Buat tombol Mute dan Matikan Kamera dengan ikon Lucide raksasa.
  - Tambahkan indikator teks "Koneksi Stabil" atau "Video Dimatikan (Koneksi Lemah)" untuk mengakomodasi logika Low-Bandwidth Mode.
  - Buat tombol "SOS / Akhiri Panggilan" berwarna Merah Terang (`#C53030`) yang mudah dijangkau.
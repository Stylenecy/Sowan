# BACKEND & INTEGRATION ROADMAP: SOWAN.ID
**PENTING UNTUK AI AGENT:** Kerjakan backend roadmap ini secara berurutan. Pastikan semua API Routes di dalam `app/api/` dilindungi oleh pengecekan sesi (server-side authentication) menggunakan Supabase Auth agar sistem aman dari eksploitasi.

## PHASE 1: Database Setup & Authentication
- [ ] **Task 1.1: Konfigurasi Supabase Auth.** Buat sistem Login/Register yang menangani pemisahan role: `mentor` (Lansia/Ambassador) dan `customer` (Ekspatriat/Turis).
- [ ] **Task 1.2: Implementasi Row Level Security (RLS).** Aktifkan RLS pada Supabase:
  - Tabel `profiles`: SELECT (Public), UPDATE (Hanya user pemilik profil).
  - Tabel `bookings`: SELECT/INSERT/UPDATE (Hanya bisa diakses oleh `customer_id` atau `mentor_id` yang terhubung dengan transaksi tersebut).
- [ ] **Task 1.3: Seeding Database.** Jalankan query dari `02_DB_Schema.md` untuk memasukkan Mock Data Oma Ratna, Mbah Harjo, Bli Wayan, dan customer dummy.

## PHASE 2: Core Booking Logic
Target direktori: `app/api/bookings/route.ts`
- [ ] **Task 2.1: API Create Booking.** Buat endpoint POST untuk menerima request jadwal dari customer. Validasi data, lalu insert ke tabel `bookings` dengan status awal `pending` dan payment_status `unpaid`.
- [ ] **Task 2.2: API Fetch Schedule.** Buat endpoint GET untuk menarik data jadwal yang akan ditampilkan di Kalender Raksasa pada Dashboard Lansia.

## PHASE 3: Payment Gateway (Stripe)
Target direktori: `app/api/checkout/route.ts` dan `app/api/webhooks/stripe/route.ts`
- [ ] **Task 3.1: Stripe Checkout Session.** Buat endpoint POST untuk meng-generate Stripe Checkout URL berdasarkan `price` dari kelas yang dipilih customer.
- [ ] **Task 3.2: Webhook Listener.** Buat endpoint untuk mendengarkan event `checkout.session.completed` dari Stripe. Jika event diterima, otomatis update kolom `payment_status` di tabel `bookings` menjadi `paid`.

## PHASE 4: Video Call Integration (Daily.co)
Target direktori: `app/api/video/room/route.ts`
- [ ] **Task 4.1: Generate Dynamic Room.** Buat endpoint POST yang menembak API Daily.co untuk membuat *private room* baru. Endpoint ini HANYA boleh dipicu setelah status pembayaran tervalidasi sebagai `paid`.
- [ ] **Task 4.2: Simpan Meeting Link.** Update kolom `meeting_link` di tabel `bookings` dengan URL room yang berhasil digenerate, agar tombol "MULAI SOWAN" di sisi lansia bisa langsung diklik.

## PHASE 5: Payout & Completion (Midtrans Escrow Simulation)
Target direktori: `app/api/payout/route.ts`
- [ ] **Task 5.1: Sesi Selesai.** Buat endpoint PUT untuk mengubah status sesi di tabel `bookings` menjadi `completed` ketika durasi habis atau tombol "Akhiri Sesi" ditekan.
- [ ] **Task 5.2: Simulasi Payout (Bagi Hasil).** Buat kerangka fungsi (placeholder API) integrasi Midtrans IRIS untuk memicu transfer dana (75% ke Lansia, 5% ke Ambassador, 20% ke Sowan) begitu status berubah menjadi `completed`.
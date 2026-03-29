# 📔 Walkthrough Sowan.id - Versi Polished Demo ✨
*Dokumen ini merupakan panduan komprehensif arsitektur dan fitur Sowan.id yang telah disempurnakan untuk tahap Semifinal. Berfokus pada kemudahan akses lansia (Geronteknologi) dan dukungan Multilingual.*

---

## 🏗️ 1. Arsitektur Halaman & Navigasi
Aplikasi telah menggunakan **Next.js App Router** dengan transisi yang halus dan UI yang responsif:

*   **🏠 Home (`/`)**: 
    *   **Greeting Dinamis**: Menyapa pengguna berdasarkan waktu (Pagi/Siang/Sore/Malam) menggunakan `LanguageContext`.
    *   **Statistik & Social Proof**: Menampilkan jumlah teman yang bergabung dan testimoni hangat dari lansia.
*   **🔍 Explore (`/explore`)**: 
    *   **Filter Aktif**: Pengguna bisa memfilter Maestro berdasarkan **Asal Kota** dan **Bahasa Pengantar**.
    *   **Payment Simulation**: Modal booking dengan rincian biaya transparan dan status keberhasilan ("Hore! Jadwal Sowan telah diatur").
*   **👤 Mentor Profile (`/mentor/[id]`)**: Halaman detail maestro yang menonjolkan pengalaman dan ulasan.
*   **📅 Dashboard (`/dashboard/mentor` & `/dashboard/customer`)**:
    *   **Mentor**: Fokus pada jadwal hari ini dengan tombol "Masuk Ruang Sowan" yang masif. Dilengkapi statistik pendapatan dan rating.
    *   **Customer**: Fokus pada riwayat dan sesi yang akan datang.
*   **📹 Virtual Room (`/room/[id]`)**: 
    *   **Dual Stream**: Kamera lokal pengguna (aktif via WebRTC) berdampingan dengan simulasi video lawan bicara (YouTube Loop).
    *   **HUD Premium**: Indikator stabilitas jaringan, timer sesi, dan atribusi sumber video (YouTube Credit).
*   **⭐ Feedback (`/feedback` & `/feedback-mentor`)**: Halaman penutup sesi untuk memberikan rating dan pesan apresiasi.

---

## 🌍 2. Fitur Unggulan Semifinal
Aplikasi ini telah melampaui standar MVP dengan fitur-fitur berikut:

*   **🌐 5-Language Multilingual Support**: 
    *   Dukungan penuh untuk **Indonesia, Inggris, Jepang, Korea, dan China**.
    *   Memungkinkan Maestro (seperti Ibu Ratna/Opa Adriel) untuk menjangkau cucu angkat dari mancanegara.
*   **🎞️ Integrated Video Simulation**: 
    *   Mengintegrasikan *stock footage* YouTube bertema lansia ke dalam video call untuk simulasi demo yang terasa "hidup" tanpa server WebRTC berat.
*   **🔑 Simplified Auth System**: 
    *   Modal masuk yang intuitif dengan "Pilih Akun Demo" untuk mempermudah juri saat mencoba aplikasi.
*   **👴 Gerontechnology First**: 
    *   **Contrast Mastery**: Background `#FAF9F6` (anti-glare) dengan teks `#1A365D` (high contrast).
    *   **Touch Optimised**: Target klik minimal `44px` di seluruh elemen interaktif.
    *   **Typography**: Perpaduan `Inter` (readable) dan `Playfair Display` (premium feel).

---

## 🧠 3. Tech Stack & State Management
*   **Frontend**: Next.js 15, Tailwind CSS, Lucide Icons.
*   **State Global**: 
    *   `AuthContext`: Mengelola sesi login secara persisten di `localStorage`.
    *   `LanguageContext`: Mengelola preferensi bahasa secara instan di seluruh komponen.
*   **Media API**: Pemanfaatan `navigator.mediaDevices` untuk akses kamera langsung dari browser.

---

## 🌟 4. Skenario Demo: "Opa Adriel & Imeldya"
Untuk keperluan presentasi, aplikasi telah dikonfigurasi dengan data persona yang kuat:
1.  **Opa Adriel (Mentor)**: Pakar Sejarah Jawa asal Yogyakarta. Menggunakan bahasa Jawa/Indonesia.
2.  **Imeldya (Customer)**: Mahasiswa yang rindu bercerita dengan kakek/nenek.
3.  **Flow Demo**: Mulai dari Landing Page ➔ Ganti Bahasa ke Jepang/Inggris ➔ Explore Maestro ➔ Booking Opa Adriel ➔ Masuk Dashboard ➔ Mulai Video Call ➔ Feedback.

---

## 🚀 5. Roadmap Pengembangan Selanjutnya
*   **Fitur "Sowan Bareng"**: Video call grup untuk 3-4 orang (Lansia + beberapa anak muda).
*   **AI Summary**: Rangkuman otomatis isi percakapan untuk dikirimkan ke keluarga lansia sebagai laporan kesejahteraan.
*   **Marketplace Karya**: Maestro bisa memajang hasil karya (seperti Batik Ibu Sri) untuk dibeli langsung oleh pengunjung.

---
*Update terakhir: 29 Maret 2026 oleh Antigravity.*
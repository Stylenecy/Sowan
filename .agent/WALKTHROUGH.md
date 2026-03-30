# 🏛️ Sowan.id - Master Walkthrough & Technical Specification
> **Versi Final: Semifinal Competition Demo ✨**
> *Platform Sowan.id adalah jembatan digital lintas generasi yang menghubungkan kearifan lokal para Maestro (Lansia) dengan rasa ingin tahu Cucu Angkat (Anak Muda), dikemas dalam desain premium yang inklusif (Gerontechnology).*

---

## 🏗️ 1. Arsitektur Inti & Desain Visual
Sowan.id dibangun dengan standar estetika modern namun tetap memprioritaskan keterbacaan tinggi bagi pengguna lansia.

*   **🎨 Desain "Premium & Trust"**:
    *   **Palet Warna**: Menggunakan `#primary` (Deep Navy) untuk otoritas dan `#accent` (Golden Amber) untuk kehangatan.
    *   **Aset Visual**: Hero section menggunakan `wanita_cover_tua.png` (lokal) untuk keandalan deploy.
    *   **Glassmorphism**: Komponen seperti Navbar dan Modal menggunakan efek *backdrop-blur* untuk kedalaman visual yang mewah.
*   **👴 Gerontechnology First**:
    *   Kontras tinggi (WCAG 2.1 compliant).
    *   Target klik minimal `44px` untuk memudahkan navigasi motorik.
    *   Tipografi `Inter` (UI) dan `Playfair Display` (Judul) untuk kesan eksklusif.

---

## 🏠 2. Beranda: Value Proposition (Update!)
Halaman utama kini secara eksplisit mengomunikasikan kepercayaan dan manfaat sosial melalui dua komponen baru:

*   **🛡️ Horizontal Trust Banner (HelloTalk Inspired)**:
    *   Terletak tepat di bawah Hero Section.
    *   Menampilkan 3 pilar kepercayaan: **Keahlian Global**, **Maestro Terkurasi**, dan **Transaksi Escrow Aman**.
    *   Ikon menggunakan warna `accent` untuk kontras mewah di atas latar `primary`.
*   **✨ Feature List & HEART Impact**:
    *   **1-on-1 Video Call**: Fokus pada kualitas interaksi manusia.
    *   **Jadwal Fleksibel**: Menghargai waktu para Maestro.
    *   **Social Impact (HEART)**: Setiap sesi Sowan membantu menyejahterakan lansia secara ekonomi dan mental.

---

## 🔍 3. Halaman Jelajahi: Stabilitas Grid
Kami melakukan refaktor total pada arsitektur daftar mentor untuk memastikan performa yang solid:

*   **📐 Responsive Vertical Grid**:
    *   Mengganti *horizontal scroll* yang rapuh menjadi **Vertical Grid 3 Kolom** yang stabil di Desktop dan 1 Kolom di Mobile.
    *   Mencegah kartu mentor bertumpuk atau hilang dari layar.
*   **🟢 Online-Status Priority**: Mentor yang sedang aktif akan otomatis berada di urutan teratas untuk mendorong interaksi instan.
*   **🎭 Beragam Maestro**: Koleksi mentor kini mencakup keahlian Batik (Ibu Sri), Tari Balinese (Ibu Dian), hingga Bisnis Kuliner (Bapak Dodi).

---

## 📹 4. Virtual Room Call: Dynamic Persona Engine
Fitur paling canggih untuk demo, di mana ruang virtual beradaptasi secara dinamis berdasarkan siapa yang Anda hubungi:

*   **👵 Maestro Nenek (New Persona!)**:
    *   Jika menghubungi Ibu Sri, Ibu Dian, atau Ibu Ningsih, sistem akan memuat video **Sandra Hart** (Life With Sandra Hart).
    *   Dilengkapi atribusi sumber YouTube yang transparan sebagai bentuk apresiasi konten.
*   **👴 Maestro Kakek (Default)**:
    *   Menggunakan persona **Opa Adriel** dengan video sejarah Jawa yang sudah ada.
*   **🎮 Kontrol Intuitive**:
    *   Tombol *Mute/Unmute* remote audio yang masif.
    *   Animasi *bounce* pada status koneksi untuk memberikan umpan balik visual yang jelas.

---

## 🔄 5. Alur Pengguna: End-to-End Dynamic
Seluruh alur dari awal hingga akhir kini sudah tersambung secara cerdas menggunakan `localStorage` PERSISTENCE:

1.  **Booking**: Memilih jadwal (Pagi/Siang/Sore) di profil mentor.
2.  **Dashboard**: Tombol "Masuk Ruang Sowan" secara dinamis mengarah ke ID mentor yang tepat (bukan lagi *hardcoded*).
3.  **Feedback**: Setelah sesi berakhir, halaman Kesan Pesan akan menampilkan nama Maestro yang baru saja dihubungi untuk memberikan sentuhan personal.

---

## 🛠️ 6. Spesifikasi Teknis
*   **Framework**: Next.js 15 (App Router).
*   **Styling**: Tailwind CSS (Custom Config).
*   **State Management**: `Context API` + `localStorage` (Demo-ready persistence).
*   **Languages**: Dukungan penuh 5 bahasa (**ID, EN, JP, KR, CN**).
*   **Deployment**: Teroptimasi untuk **Vercel Production Edge**.

---
> **"Menghormati masa lalu, Menginspirasi masa depan."**
> *Update terakhir: 29 Maret 2026 - Final Competition Polish.*
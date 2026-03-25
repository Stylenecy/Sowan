# Audit Total Aplikasi Sowan 🧓✨
*Dokumen ini merupakan hasil audit komprehensif dari frontend aplikasi Sowan per tahap pengembangan saat ini, disusun untuk persiapan Semifinal.*

---

## 🏗️ 1. Arsitektur Halaman (Routing)
Aplikasi Sowan saat ini menggunakan **Next.js App Router** dengan direktori `app/`. Struktur routingnya sangat rapi dan berfokus pada flow pengguna:

*   **`/` (Home/Landing Page)**: 
    *   **Fungsi Utama**: Menyambut pengguna dengan pesan hangat ("Mari Berbagi pengalaman"). Menampilkan ilustrasi dan statistik menarik.
    *   **Call-to-Action**: Terdapat tombol besar untuk "Cari Teman Sowan" (mengarah ke `/explore`) dan "Lihat Jadwal Saya" (mengarah ke `/dashboard/mentor`).
*   **`/explore` (Pencarian Teman Sowan)**: 
    *   **Fungsi Utama**: Menampilkan daftar mitra/mentor lansia. 
    *   **Elemen**: Memiliki UI *Dropdown Filter* yang ramah lansia (Asal Kota, Bahasa Pengantar). Filter saat ini masih bersifat dummy UI. Menampilkan *card* detail mentor beserta tarif, ulasan, badge, dan tombol *booking*.
*   **`/dashboard/mentor` (Jadwal Interaksi)**:
    *   **Fungsi Utama**: Menampilkan dashboard personalisasi (contoh: "Selamat Pagi, Oma Ratna"). Menampilkan jadwal terdekat secara besar dan sangat jelas di tengah layar.
    *   **Elemen Kunci**: Tombol raksasa oranye **"MULAI SOWAN"** yang mengarah langsung ke halaman Video Call.
*   **`/room/[id]` (Ruang Video Call)**:
    *   **Fungsi Utama**: Simulasi ruang interaksi tatap muka online. 
    *   **Elemen Kunci**: Menampilkan placeholder video lawan bicara dan frame video lokal milik pengguna (memanfaatkan Web API kamera). Memberikan indikator jaringan ("Status Jaringan: Stabil"), tombol *Mute/Unmute*, tombol *Video On/Off*, dan satu tombol besar merah **"AKHIRI SOWAN"**.

---

## 🛠️ 2. Daftar Fitur yang Sudah Aktif
*   **Integrasi Kamera Lokal (WebRTC API)**: Di halaman `/room/[id]`, browser secara otomatis meminta izin kamera dan mikrofon, kemudian merender video lokal pengguna ke layar secara mulus.
*   **Kontrol Media**: Pada halaman *room*, tombol matikan kamera (Video Off) dan hentikan suara (Mute) sudah dikaitkan dengan *local state* dan mengontrol *stream track* yang aktif (berfungsi dengan baik).
*   **Dummy Auth Context**: Terdapat `AuthContext` yang dibuat untuk menunjang login/logout pengguna secara terpusat.
*   **Gerontechnology Adaptive UI**: Hampir semua halaman sudah menggunakan *class utility* responsif dan elemen yang disesuaikan ukurannya khusus untuk kenyamanan visibilitas.

---

## 🧠 3. State Management
*   **Global State (Autentikasi)**: Menggunakan standard `React Context API` (`AuthContext.tsx`).
    *   **Mekanisme Persisten**: Context ini menggunakan `localStorage` dengan key `"sowan_user"`. Artinya, ketika lansia menyegarkan (*refresh*) halaman atau menutup browser, data login mereka tidak akan hilang. Hal ini sangat penting untuk ux lansia agar mereka tidak perlu login berulang kali.
*   **Local State**: 
    *   Digunakan dominan pada `/room/[id]` menggunakan `useState` bawaan React untuk mengatur toggle UI kamera dan mic, serta `useRef` untuk menahan *MediaStream* object agar tidak re-render secara tidak perlu.

---

## 🎨 4. Identitas UI/UX (Geronteknologi)
Desain Sowan sudah sangat mematuhi prinsip Geronteknologi (teknologi yang ramah lansia). Detail pedoman yang diterapkan pada file `globals.css`:
*   **Skema Warna Utama**:
    *   **Background**: *Soft Cream* (`#FAF9F6`) - Mengurangi pantulan cahaya berlebih (silau) yang biasa terjadi pada putih bersih (`#FFFFFF`), menghindari kelelahan mata katarak.
    *   **Pilihan Teks Primer**: *Deep Navy Blue* (`#1A365D`) - Memberikan kontras luar biasa tinggi terhadap *Soft Cream* tanpa menjadi terlalu tajam seperti teks Hitam pekat.
    *   **Aksen Interaktif**: *Warm Amber* (`#D97706`) - Digunakan untuk tombol utama pembawa aksi, sangat mencolok dan hangat.
    *   **Tindakan Destruktif**: *Red/Crimson* (`#C53030`) - Digunakan di tombol "Akhiri Sowan" yang dibuat masif dan paling beda dari elemen lain, mencegah ketidaksengajaan terpecet di ruang call.
*   **Tipografi & Visibilitas**:
    *   Font diset menjadi proporsional `18px` dasar dan `line-height: 1.6`. Spasi lega ini menghindarkan teks menumpuk.
*   **Kemudahan Interaksi Jari Tak Lincah**:
    *   Disisipkan atribut global `@apply min-h-[44px] min-w-[44px]` pada seluruh _button_, _input_, dan _select_. Ini adalah standar _Touch Target_ yang dikhususkan agar jari lansia tidak meleset saat melakukan _tap_.

---

## 💡 5. Rekomendasi Fitur Penyempurna untuk Semifinal (Perspektif AI)

Berdasarkan hasil audit di atas, untuk memberikan hasil wow di presentasi Semifinal, saya sangat merekomendasikan hal berikut untuk kita diskusikan & eksekusi:

1.  **"Pura-pura" Video Call Lawan Bicara (Simulasi Room) 📹**
    *   Saat ini di`/room/[id]`, tampilan pelanggan masih sekadar teks kotak abu-abu ("Video Customer").
    *   *Ide:* Kita bisa injeksi *stock footage video loop* orang sedang tersenyum/mengangguk yang otomatis ter-play, sehingga saat presentasi aplikasi akan terasa **SANGAT HIDUP**.
2.  **Flow Login Super Mudah (Pemberdayaan AuthContext) 🔑**
    *   `AuthContext` sudah siap, namun UI Login belum saya temukan di flow utama. Mengingat ini aplikasi lansia, kita haram memakai password ribet.
    *   *Ide:* Buat satu halaman *Login dengan PIN* ber-keyboard raksasa (mirip ATM), atau sekadar tombol muka profil "Pilih Akun Anda" langsung masuk.
3.  **Simulasi Transisi "Berhasil Booking" 📅**
    *   Di `/explore`, tombol "Buat Jadwal Sowan" saat ini langsung lompat ke dashboard. Akan lebih *smooth* jika saat diklik, muncul *Modal Pop-up/Alert* ramah (misal: dengan efek confetti tipis/icon ceklis raksasa hijau) bertuliskan: *"Hore! Jadwal Sowan dengan Ibu Ratna telah disimpan!"* baru ter-redirect.
4.  **Menghidupkan Filter Sederhana 🔍**
    *   Di `/explore`, dropdown filter itu UI-nya sangat cantik, namun jika juri meminta demo untuk mengubah dari "Semua Kota" ke "Jakarta", daftarnya harus secara visual berubah. Kita bisa menambahkan algoritma filter sederhana ke dalam mockup *card* mentor tersebut.
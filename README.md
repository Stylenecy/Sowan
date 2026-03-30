# 👵🏼 Sowan - Bridging Generations (Platform Panduan Pengguna)

Selamat datang di **Sowan**, platform inovatif yang menghubungkan generasi muda (Customer) dengan generasi lansia (Mentor) untuk sesi berbagi cerita, pengalaman, dan kebijaksanaan hidup. Platform ini dirancang menggunakan prinsip **Geronteknologi**, sehingga ramah bagi kelompok rentan atau lansia (dengan antarmuka besar, interaksi mudah, dan fokus pada kejelasan).

---

## 📖 Panduan Penggunaan Sowan (Untuk Pengguna Awam)

Aplikasi Sowan memiliki **2 (dua) jenis peran utama**:
1. **Customer (Generasi Muda)**: Ingin mencari mentor lansia, melihat profil mereka, melakukan *booking* (pemesanan) jadwal, dan memasuki ruang cerita (Virtual Room).
2. **Mentor (Lansia)**: Ingin melihat jadwal reservasi yang masuk, menerima panggilan, dan mengobrol dengan customer di Virtual Room.

Berikut adalah panduan langkah demi langkah untuk mencoba Sowan:

### 🚶🏽‍♂️ FLOW 1: Masuk Sebagai Customer (Pencari Mentor)

Jika Anda ingin mencoba Sowan dari kacamata pelanggan:

1. **Buka Halaman Utama Sowan**
   Kunjungi tautan Sowan yang telah dideploy (misalnya melalui Vercel). Anda akan melihat halaman sapaan (_Hero Section_).
2. **Login Sebagai Customer**
   - Pergi ke menu **Login/Masuk**.
   - Masukkan nama acak Anda (misal: "Dex", "Budi", "Sarah").
   - Pilih peran Anda sebagai **Customer/User** (Biasanya status defaultnya adalah Customer jika nama bukan spesifik mentor).
   - Pastikan Role "Saya Ingin Mencari Cerita" dicentang/aktif jika ada piliihannya.
   - Platform akan membawa Anda ke beranda (halaman Explore).
3. **Mencari dan Memilih Mentor**
   - Di halaman Explore, Anda akan menemukan daftar "Mentor Bijaksana" (misalnya Opa Adriel, Ibu Sri, dll).
   - Klik salah satu profil mentor untuk melihat deskripsi, spesialisasi cerita, dan jadwal yang tersedia.
4. **Memesan Sesi (Booking)**
   - Pada halaman detail, pilih durasi dan tanggal yang sesuai.
   - Klik tombol **Pesan Sesi** atau **Booking**.
   - Anda akan diarahkan ke tahap konfirmasi pembayaran / validasi pesanan (Flow Sowan akan menampilkan bahwa jadwal telah berhasil di-booking).
5. **Memulai Sesi Obrolan (Virtual Room)**
   - Saat proses sesi dimulai, Anda akan masuk ke halaman **Room** (`/room/[id]`).
   - Di sini Anda dapat melihat video mentor, menyalakan/mematikan mikrofon dan kamera Anda sendiri, serta berinteraksi secara _live_ (disimulasikan dengan antarmuka video).
   - Setelah selesai mendengarkan kearifan mereka, tekan tombol **Akhiri Sowan** (End Call) untuk diarahkan ke halaman _Feedback_.


### 👴🏼 FLOW 2: Masuk Sebagai Mentor (Lansia - Opsional: Opa Adriel)

Jika Anda ingin mencoba pengalaman Sowan dari kacamata seorang Mentor lansia:

1. **Login Sebagai Mentor (Sangat Penting: Harus ketik Opa Adriel)**
   - Pergi ke menu **Login** di beranda awal.
   - Pada kolom Nama Lengkap, **Wajib ketikkan nama: "Opa Adriel"** (atau "Ibu Sri" dll jika didukung).
   - Pilih peran Anda sebagai **Mentor** (Saya ingin membagikan cerita).
   - Klik tombol Masuk. Sowan secara cerdas akan mendeteksi nama tersebut dan memberikan hak akses berupa **Dashboard Mentor**. Area ini didesain secara khusus menyesuaikan indera penglihatan lansia (Geronteknologi) agar teks lebih besar dan lebih mudah terbaca.
2. **Melihat Jadwal Sesi (Reservasi Masuk)**
   - Di Dashboard, "Opa Adriel" akan melihat daftar pelanggan yang telah memesan waktunya (misal ada jadwal panggilan masuk yang harus disetujui / dihadiri).
3. **Menerima Panggilan Sesi**
   - Sesuai kaidah simplifikasi fitur, jika sesi tersebut sedang berlangsung atau sudah tiba waktunya, akan ada tautan / tombol masuk yang sangat jelas.
   - Mentor hanya perlu mengklik satu tombol persetujuan panggilan tanpa perlu menyalin link "Zoom" / meeting konvensional.
4. **Ruang Sesi (Virtual Room)**
   - Pada halaman Room, layar utama akan menampilkan wajah Customer secara besar. 
   - Tombol operasional (seperti Mute, Matikan Video) didesain dengan ikon universal, teks bantuan (caption), dan *high-contrast* (misal warna MERAH/HIJAU mencolok). 
   - Jika waktu bercerita habis, Opa Adriel dapat menekan tombol **Akhiri Panggilan** (End Call).
   - Mentor kemudian akan diarahkan ke layar _Review_ atau _Dashboard_.

---

## 🛠️ Penjelasan Teknis & Arsitektur (Bagi Developer / Juri)

Sowan adalah prototipe aplikasi web progresif yang dibangun dengan *stack* teknologi terkini untuk memastikan performa yang cepat, aman, responsif, dan yang paling krusial: _accessibility_-oriented.

### 💻 Platform & Tech Stack
- **Framework Utama**: Next.js 15 (App Router paradigm). Dipilih karena performa rendering server-nya (SSR) yang baik dan arsitektur routing yang efisien.
- **Bahasa Pemrograman**: TypeScript (strict type checking untuk memastikan kode scalable, bersih, dan menghindari *runtime error*).
- **Styling Sistem**: Vanilla CSS dipadukan dengan konfigurasi fleksibel / integrasi Tailwind CSS v4 (untuk *utility-first styling*, _glassmorphism_, animasi dinamis, _dark mode_).
- **State Management & Multilingual**: Mengandalkan **React Context API** (`Context API` ringan) guna mengatur _state_ autentikasi Global (`AuthContext`) dan Lokalisasi Bahasa (`LanguageContext`), menghindari _prop-drilling_ yang tidak perlu tanpa harus bergantung pada _third-party_ gemuk seperti Redux. Sowan mendukung lokalisasi dinamis 5 Bahasa secara _on-the-fly_ (_live-switch_ instan).
- **Ikonografi & Aset Multimedia**: Menggunakan `lucide-react` untuk ikon pintar, serta menyisipkan media format optimal (MP4 lokal / Embed YT) dalam komponen media.
- **Deployment Strategy**: **Vercel** dipilih sebagai platform *Continues Integration / Continues Deployment* (CI/CD) yang otomatis ter-trigger (membangun *production build*) dari Git push ke *branch* `main`.

### 🎨 Fitur Khusus: Geronteknologi & UX
1. **Aksesibilitas Ekstrem (*Simplicity-First*)**: Mengingat mentor Sowan *mostly* berada pada rentang generasi Senior/Baby-Boomer, UI dirancang menjauhi jargon teknologi.
  - Warna difokuskan pada High Contrast / Dark Aesthetic.
  - Font tipografi (*Google Fonts / sans-serif bawaan*) dibuat jauh lebih dominan memanjakan pandangan _low-vision_.
  - Pendekatan konfirmasi *One-Click Action* menghilangkan kewajiban input form/CAPTCHA berlebih, sehingga sesi online cepat digapai (tanpa halangan kognitif).
2. **WebRTC API Simulation**: Pada menu `/room/[id]`, sistem _live call_ mengimitasi fungsi WebRTC dengan memanggil `navigator.mediaDevices.getUserMedia` untuk memperoleh akses mikrofon/kamera pengguna, digabung dengan video *remote* yang dioptimasi memutar rekaman spesifik mentor untuk kepentingan DEMO bisnis (_Mockup Interaktif_).
3. **Dynamic Parameter Routing**: Pemisahan identitas ruangan (_room_) maupun identitas mentor (`/mentor/[id]`) memanfaatkan kapabilitas *Dynamic Segments* di Next.js App Router secara efisien.

### 🚀 Cara Menjalankan Project Secara Lokal (Local Development)

Bagi Anda yang ingin menguji fungsi atau sekadar membaca struktur kode proyek:

1. **Clone Repository (Unduh Kode)**
   ```bash
   git clone https://github.com/Stylenecy/Sowan.git
   cd sowan-app
   ```
2. **Install Semua Dependencies**
   Ketikan perintah berikut untuk membaca file `package.json` dan mengumpulkan paket-paket Node.js.
   ```bash
   npm install
   ```
3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
4. Buka Browser (Chrome, Firefox, Safari) lalu arahkan tab URL ke alamat: [http://localhost:3000](http://localhost:3000). Semua perubahan (_hot-reload_) akan termuat sekejap sesuai baris kode yang disunting!

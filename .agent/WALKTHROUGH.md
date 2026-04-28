# WALKTHROUGH.md - SOWAN.ID COMPREHENSIVE GUIDE

> **Version: Final Semifinal Demo** | Updated: April 27, 2026
> Platform intergenerational yang menghubungkan kearifan lokal Maestro (Lansia) dengan Cucu Angkat (Anak Muda) melalui video call + Geronteknologi.

---

## 🎯 PRODUKT VISION

**Sowan.id** adalah **Premium Intergenerational Cultural Marketplace**:
- Mengadopsi kehangatan koneksi empatik (model Eldera)
- Sistem monetisasi marketplace terukur (model iTalki)
- Fokus pada "Cultural Immersion & Wisdom" — bukan grammar学习

**Value Proposition:**
> "Belajar bahasa lokal & budaya autentik langsung dari para tetua Indonesia"

**Target Pengguna:**
- **Demand Side:** Ekspatriat, Digital Nomads, Turis Internasional (long-stay)
- **Supply Side:** 100 lansia pertama (60-74 tahun) dari 4 kota: Jogja, Bali, Jakarta, Bandung

---

## 🏗️ TECH STACK (Implemented)

| Component | Technology |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | Context API + localStorage (demo) |
| Icons | Lucide React |
| Fonts | Inter (UI), Playfair Display (headings) |
| Deployment | Vercel (CI/CD from GitHub) |
| Video (demo) | YouTube Embed + Local MP4 |
| Auth (demo) | localStorage mock |

**Expected Future Stack:**
- Database: Supabase PostgreSQL
- Auth: Supabase Auth
- Video: Daily.co / Agora SDK
- Payment: Stripe + Midtrans IRIS

---

## 🎨 DESIGN SYSTEM (Geronteknologi)

### Color Palette
```
Background Cream:  #FAF9F6  (SOFT - bukan putih bersih!)
Primary Navy:       #1A365D  (text, authority)
Accent Amber:      #D97706  (buttons, highlights)
Accent Terracotta: #C53030  (alerts, end call)
```

### Accessibility Standards
- Touch targets: Minimal 44x44px (untuk lansia)
- Font size: Body ≥16px, Headers ≥20px
- Contrast: WCAG 2.1 compliant
- One-click actions (tanpa CAPTCHA/form berlebih)

---

## 📱 PAGES & FEATURES (Complete)

### 1. Landing Page (`/`)
**Features:**
- Hero section dengan "Sowan.id" branding
- Floating glassmorphism cards (500+ users, emotional quote)
- Trust Banner (3 pillars: Global Languages, Curated Maestros, Escrow)
- About section dengan feature list (Video, Schedule, Social Impact)
- Featured Mentors grid (6 mentors)
- CTA buttons: "Cari Mentor Budaya" + "Gabung sebagai Lansia"

**Files:** `app/page.tsx`

---

### 2. Explore/Mentor Listing (`/explore`)
**Features:**
- Filter bar (sticky): Kota (10 cities) + Bahasa (5 languages)
- Reset filter button
- Vertical grid: 3 columns desktop, 1 column mobile
- Mentor cards dengan:
  - Profile image
  - Online/offline status (pulse animation)
  - Name, age, title, location
  - Language badge
  - Rating stars
  - Price display
  - "Lihat Profil" button → `/mentor/[id]`
  - "Pesan Sesi" button (disabled if offline)

**Files:** `app/explore/page.tsx`

---

### 3. Mentor Detail Page (`/mentor/[id]`)
**Features:**
- Large profile photo
- Name, age, title, location, language
- Rating + review count
- About/bio section
- Experience list (3 items)
- Interest tags (3 items, clickable style)
- Booking card (price + "Pesan Sesi" button)
- Payment modal:
  - Time selection (Today1/2, Tomorrow1/2)
  - Fee breakdown (mentor price + app fee Rp 5.000)
  - Total calculation
  - Confirm button with loading state
  - Success animation → redirect to dashboard

**Files:** `app/mentor/[id]/page.tsx`

---

### 4. Customer Dashboard (`/dashboard/customer`)
**Features:**
- Greeting: "Selamat Datang, [Name]!"
- Stats: Sessions (12), Hours (15.5), Points (450)
- Active Session Card:
  - Mentor photo (from localStorage or default "Opa Adriel")
  - Booked time (from localStorage or dynamic "Now + 1h")
  - Quote from mentor
  - **"MULAI SOWAN" button** → `/room/[id]`
- Last Message card
- Achievement card

**Data Flow:**
- Booking stores to localStorage: `sowan_selected_time`, `sowan_booked_mentor`
- Dashboard reads from localStorage to display booking info

**Files:** `app/dashboard/customer/page.tsx`

---

### 5. Mentor Dashboard (`/dashboard/mentor`)
**Features:**
- Greeting: "Selamat Pagi, Opa Adriel!" (large text for elderly)
- Stats: Sessions (128), Earnings (Rp 5.2jt), Rating (4.9)
- Imeldya Session Card (demo):
  - Photo from Unsplash
  - "Hari Ini" badge
  - Session time: "14:00 - 15:00 WIB"
  - Quote
  - **"MULAI SOWAN" button** → `/room/1` (hardcoded for demo)
- Pending discussion card
- Payout available card

**Note:** For demo, room link is hardcoded to `/room/1`

**Files:** `app/dashboard/mentor/page.tsx`

---

### 6. Virtual Room (`/room/[id]`)
**Features:**
- Full-screen black background
- **Remote Video:**
  - Male mentors (ID != 5,8,11): Local video `/video-pak-budi.mp4`
  - Female mentors (ID 5,8,11): YouTube embed (Sandra Hart channel)
- Top HUD: Sowan logo + Session ID + connection status + timer
- Partner info card (bottom-left): Name + online indicator
- Self PiP (bottom-right): Camera feed or "Camera Off" placeholder
- **Controls (bottom):**
  - Mute/Unmute (mic icon)
  - Video on/off (camera icon)
  - **End Call button** (red, large) → `/feedback` or `/feedback-mentor`
- Remote audio mute toggle (top-right corner)

**Video Logic (Hardcoded for Demo):**
```typescript
if (id === '5') { partnerName = "Ibu Sri"; videoId = "N90UIXMuMMU"; }
if (id === '8') { partnerName = "Ibu Dian"; videoId = "N90UIXMuMMU"; }
if (id === '11') { partnerName = "Ibu Ningsih"; videoId = "N90UIXMuMMU"; }
```

**Files:** `app/room/[id]/page.tsx`

---

### 7. Feedback Page - Customer (`/feedback`)
**Features:**
- Success checkmark animation
- Title: "Terima Kasih!" / "Thank You!"
- Rating stars (1-5, clickable)
- Gratitude message textarea
- Shows mentor name from localStorage
- "Kembali ke Beranda" button → `/dashboard/customer`

**Files:** `app/feedback/page.tsx`

---

### 8. Feedback Page - Mentor (`/feedback-mentor`)
**Features:**
- Success checkmark animation
- Title: "Sesi Selesai!"
- Stats cards: Earnings (Rp 100.000), Duration (45 menit)
- Customer gratitude card (shows "Imeldya")
- "Kembali ke Dashboard" button → `/dashboard/mentor`

**Files:** `app/feedback-mentor/page.tsx`

---

## 🌐 INTERNATIONALIZATION (i18n)

**Supported Languages:** ID, EN, JP, KR, CN

**Translation Files:** `context/LanguageContext.tsx` (~29KB, ~700+ lines)

**Key Translations:**
- Navigation: Masuk, Daftar, Beranda, Jelajahi
- Dashboard: selamat datang, sesi, earnings, rating
- Room: stable connection, end call, partner
- Payment: fee, app fee, total, confirm, success

---

## 🔐 AUTHENTICATION FLOW (Mock)

**Login Flow:**
1. User clicks "Masuk" button
2. Modal appears with name input
3. User enters name → clicks "Masuk"
4. AuthContext stores to localStorage
5. Role detection:
   - Name === "Opa Adriel" → Mentor Dashboard
   - Otherwise → Customer Dashboard

**Protected Routes:**
- `/dashboard/mentor` - Requires "Opa Adriel" login
- `/dashboard/customer` - Any logged-in user

---

## 💰 PAYMENT FLOW (Mock)

**Booking Flow:**
1. User selects mentor at `/explore` or `/mentor/[id]`
2. Click "Pesan Sesi" → Modal opens
3. Select time (Today1/2, Tomorrow1/2)
4. View fee breakdown (mentor price + Rp 5.000 app fee)
5. Click "Bayar" → Processing animation (800ms)
6. Success → localStorage stores booking → Redirect to dashboard

**localStorage Keys:**
- `sowan_user` - User session {name: string}
- `sowan_selected_time` - "Hari Ini, 15:00 - 16:00 WIB"
- `sowan_booked_mentor` - {id, name, image, desc, ...}

---

## 📂 ASSETS

### Images (Public Folder)
```
wanita_cover_tua.png    - Hero image (14MB, local)
video-pak-budi.mp4      - Demo video for room page (11MB, local)
dummy-video.mp4         - Backup video (73MB)
```

### External Resources
- Unsplash images (profile photos)
- YouTube embeds (for female mentor personas)
- Google Fonts: Inter, Playfair Display

---

## ⚠️ KNOWN LIMITATIONS (Demo)

1. **No real database** - All data in memory/localStorage
2. **No real video call** - Uses YouTube embed + local video
3. **Hardcoded room logic** - Video selection based on mentor ID
4. **localStorage auth** - Not secure, for demo only
5. **No payment gateway** - Mock checkout flow only
6. **No RLS/permissions** - All data publicly accessible in code

---

## 🚀 FUTURE ROADMAP

### Phase 1: Backend Foundation
- [ ] Supabase setup (Auth + Database)
- [ ] Profiles table with RLS
- [ ] Bookings table with RLS
- [ ] Seed data (10 mentors minimum)

### Phase 2: Payment Integration
- [ ] Stripe checkout session
- [ ] Webhook for payment confirmation
- [ ] Escrow split logic (75/5/20)
- [ ] Midtrans IRIS payout simulation

### Phase 3: Video SDK
- [ ] Daily.co room generation API
- [ ] WebRTC integration
- [ ] Low-bandwidth mode for elderly
- [ ] Recording permission flow

### Phase 4: Search & Discovery
- [ ] Text-based search (mentor name, topic)
- [ ] Advanced filters (price range, rating)
- [ ] "Similar mentors" recommendation

---

## 🏆 COMPETITION NOTES (EURECA 2026)

**Target:** Business Plan Competition Semifinal

**Demo Flow:**
1. Open Sowan.id (deployed URL)
2. Show Landing Page → Trust Banner
3. Navigate to Explore → Filter demo
4. Select Mentor → Show booking modal
5. Complete payment → Dashboard
6. Enter Room → Show video call UI
7. End call → Feedback page

**Key Selling Points:**
- Geronteknologi: Accessibility for elderly
- Social Impact: SDG 4, 8, 10
- Silver Economy: Empowering seniors financially
- Cultural Preservation: Intangible heritage transfer

---

**"Menghormati masa lalu, Menginspirasi masa depan."**
*Sowan.id - Connecting Generations Through Stories*
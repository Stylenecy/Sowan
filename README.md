# Sowan.id - Platform Bridging Generations

> **Demo Status: MVP Complete** | Semifinal Ready | April 2026

Sowan.id adalah platform inovatif yang menghubungkan generasi muda (Cucu Angkat) dengan lansia berpengalaman (Maestro) untuk sesi berbagi cerita, kearifan hidup, dan budaya lokal melalui video call.

---

## 🎯 What is Sowan?

**Premium Intergenerational Cultural Marketplace** yang menggabungkan:
- Kehangatan koneksi empatik (model Eldera)
- Sistem monetisasi marketplace terukur (model iTalki)
- Fokus pada "Cultural Immersion & Wisdom"

### Value Proposition
> "Belajar bahasa lokal & budaya autentik langsung dari para tetua Indonesia menggunakan 5 bahasa pengantar global"

### Target Pengguna
| Side | Profile | Kebutuhan |
|------|---------|-----------|
| **Customer** | Ekspatriat, Digital Nomads, Turis Internasional | Adaptasi budaya lokal, praktik percakapan |
| **Mentor** | Lansia 60-74 tahun, pensiunan diplomat/guru/tokoh adat | Pendapatan tambahan, rasa berguna, mengurangi kesepian |

---

## ✅ Features (Implemented)

### Pages
| Page | Route | Status |
|------|-------|--------|
| Landing Page | `/` | ✅ Complete |
| Explore Mentors | `/explore` | ✅ Complete |
| Mentor Detail | `/mentor/[id]` | ✅ Complete |
| Customer Dashboard | `/dashboard/customer` | ✅ Complete |
| Mentor Dashboard | `/dashboard/mentor` | ✅ Complete |
| Virtual Room | `/room/[id]` | ✅ Complete |
| Feedback (Customer) | `/feedback` | ✅ Complete |
| Feedback (Mentor) | `/feedback-mentor` | ✅ Complete |

### Core Features
- **5 Bahasa**: Indonesia, English, Japanese, Korean, Chinese
- **Geronteknologi UI**: High contrast, 44px+ touch targets, large fonts
- **Mock Auth**: localStorage-based login (demo mode)
- **Booking Flow**: Simulated payment with localStorage sync
- **Video Call UI**: Full-screen with camera/mic controls

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | React Context API + localStorage |
| Icons | Lucide React |
| Fonts | Inter, Playfair Display (Google Fonts) |
| Deployment | Vercel (CI/CD) |

**Future Stack:**
- Database: Supabase PostgreSQL
- Auth: Supabase Auth
- Video: Daily.co / Agora SDK
- Payment: Stripe + Midtrans IRIS

---

## 🎨 Design System

### Colors
```
Background Cream:  #FAF9F6
Primary Navy:      #1A365D
Accent Amber:      #D97706
Accent Terracotta: #C53030
```

### Accessibility
- Touch targets: Minimal 44x44px
- Font size: Body ≥16px, Headers ≥20px
- WCAG 2.1 compliant contrast
- One-click actions (elderly-friendly)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Demo Credentials
- **Customer**: Any name (e.g., "Dex", "Sarah")
- **Mentor**: Enter exactly "Opa Adriel"

---

## 📱 How to Demo

### Customer Flow
1. Visit `/` → Click "Masuk" → Enter name
2. Go to `/explore` → Browse mentors
3. Click mentor card → View profile at `/mentor/[id]`
4. Click "Pesan Sesi" → Select time → "Bayar"
5. Redirected to `/dashboard/customer`
6. Click "MULAI SOWAN" → Enter `/room/[id]`
7. Toggle mic/camera → End call
8. Leave feedback at `/feedback`

### Mentor Flow
1. Login with name: **"Opa Adriel"**
2. Redirected to `/dashboard/mentor`
3. Click "MULAI SOWAN" → Enter `/room/1`
4. End call → View earnings at `/feedback-mentor`

---

## 📁 Project Structure

```
sowan-app/
├── app/
│   ├── page.tsx                    # Landing
│   ├── layout.tsx                  # Root layout
│   ├── explore/page.tsx            # Mentor listing
│   ├── mentor/[id]/page.tsx        # Mentor profile
│   ├── dashboard/
│   │   ├── customer/page.tsx
│   │   └── mentor/page.tsx
│   ├── room/[id]/page.tsx          # Video call
│   ├── feedback/page.tsx
│   └── feedback-mentor/page.tsx
├── components/
│   ├── ui/                         # shadcn components
│   └── Navbar.tsx
├── context/
│   ├── AuthContext.tsx             # Mock auth
│   └── LanguageContext.tsx         # i18n
├── lib/
│   └── utils.ts
└── public/
    ├── wanita_cover_tua.png        # Hero image
    └── video-pak-budi.mp4          # Demo video
```

---

## 🔴 Not Implemented (Future)

- Real Supabase backend & authentication
- Database-driven booking system
- Real payment gateway (Stripe/Midtrans)
- Actual WebRTC video (uses YouTube embed + local video for demo)
- Ambassador management flow
- Search filter (text-based)

---

## 📊 Business Model

**Revenue:** Pay-per-session (per hour)

**Commission Split:**
- 75% → Lansia (Mentor)
- 5% → Village Ambassador
- 20% → Sowan.id (operational costs)

**SDGs Alignment:**
- SDG 4: Quality Education
- SDG 8: Decent Work & Growth
- SDG 10: Reduced Inequalities

---

## 🏆 Competition Info

**Event:** EURECA 2026 Business Plan Competition
**Stage:** Semifinal
**Team:** Trio Capybara Gaje

**Key Messages:**
1. Geronteknologi = accessibility for elderly mentors
2. Social Impact = silver economy, SDG alignment
3. Cultural Preservation = intangible heritage transfer
4. Innovative = first-mover in Indonesian intergenerational marketplace

---

**"Menghormati masa lalu, Menginspirasi masa depan."**
*Sowan.id - Connecting Generations Through Stories*
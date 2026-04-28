# TODO.md - SOWAN.ID PROJECT STATUS

> **Last Updated: April 27, 2026** | Status: ✅ MVP COMPLETE (Demo-Ready)

---

## ✅ COMPLETED FEATURES

### Core Application Pages
- [x] **Landing Page** (`app/page.tsx`)
  - Hero section with Sowan.id branding
  - Trust banner (HelloTalk-inspired: Global Languages, Curated Maestros, Escrow)
  - About section with feature list (Video Call, Flexible Schedule, Social Impact)
  - Featured mentors grid with 6 mentors
  - Responsive design with soft cream background (#FAF9F6)

- [x] **Explore/Mentor Listing** (`app/explore/page.tsx`)
  - Filter by City (10 cities) and Language (5 languages)
  - Vertical grid layout (3 columns desktop, 1 mobile)
  - Online/offline status indicator with pulse animation
  - 14 mentors with realistic Indonesian profiles
  - Booking modal with time selection and mock payment

- [x] **Mentor Detail Page** (`app/mentor/[id]/page.tsx`)
  - Full mentor biography and experience
  - Interest tags and language proficiency
  - Rating display with review count
  - In-page booking modal with payment simulation

- [x] **Customer Dashboard** (`app/dashboard/customer/page.tsx`)
  - Greeting with dynamic user name
  - Stats cards (sessions, hours, points)
  - Active session card with booked mentor info
  - localStorage sync for booking data
  - "MULAI SOWAN" button linking to room

- [x] **Mentor Dashboard** (`app/dashboard/mentor/page.tsx`)
  - Large greeting text for elderly-friendly UI
  - Stats row (sessions: 128, earnings: Rp 5.2jt, rating: 4.9)
  - Imeldya session card (demo-ready with hardcoded data)
  - "MULAI SOWAN" button linking to `/room/1`
  - Pending discussion and payout info cards

- [x] **Virtual Room** (`app/room/[id]/page.tsx`)
  - Full-screen video call interface
  - Camera/microphone access with toggle controls
  - Partner audio mute control
  - YouTube embed for female mentors (Ibu Sri, Ibu Dian, Ibu Ningsih)
  - Local video file for male mentors
  - Session timer (elapsed time)
  - End call button → feedback page
  - Connection status indicator

- [x] **Feedback Page (Customer)** (`app/feedback/page.tsx`)
  - 5-star rating system
  - Gratitude message textarea
  - Shows booked mentor name dynamically

- [x] **Feedback Page (Mentor)** (`app/feedback-mentor/page.tsx`)
  - Earnings display (Rp 100.000)
  - Session duration display
  - Customer gratitude card
  - Return to dashboard button

### Technical Features
- [x] **Authentication (Mock)**
  - localStorage-based user session
  - Login modal with name input
  - Role detection: "Opa Adriel" → Mentor Dashboard, others → Customer Dashboard

- [x] **Internationalization (5 Languages)**
  - Indonesian (ID), English (EN), Japanese (JP), Korean (KR), Chinese (CN)
  - LanguageContext with full translations
  - Real-time language switching

- [x] **Geronteknologi UI Compliance**
  - Soft cream background (#FAF9F6)
  - High contrast text (Deep Navy #1A365D)
  - Touch targets ≥44px
  - Large typography (16px+ body, 20px+ headers)
  - Minimal cognitive load (one-click actions)

- [x] **Responsive Design**
  - Mobile-first approach
  - Breakpoints: sm (640px), md (768px), lg (1024px)
  - Adaptive grid layouts

### UI Components
- [x] Button (variants: default, outline, ghost, link)
- [x] Card (with header, content, footer)
- [x] Input
- [x] Select (city and language filters)
- [x] Navigation Menu
- [x] Navbar with login modal trigger

---

## 🔴 NOT IMPLEMENTED (Future Development)

### Backend & Infrastructure
- [ ] **Supabase Authentication** - Real user accounts, not localStorage mock
- [ ] **Database Integration** - Supabase PostgreSQL for profiles, bookings, classes
- [ ] **Row Level Security (RLS)** - Protect elderly data per UU PDP

### Payment & Monetization
- [ ] **Stripe/Midtrans Integration** - Real payment gateway
- [ ] **Escrow System** - 75% mentor / 5% ambassador / 20% Sowan split
- [ ] **Payout System** - Midtrans IRIS simulation for withdrawals

### Video & Communication
- [ ] **Daily.co/Agora SDK** - Real WebRTC video calls
- [ ] **Dynamic Room Generation** - API endpoint for room creation
- [ ] **Low-Bandwidth Mode** - Adaptive video quality for elderly users

### Core Features
- [ ] **Search Filter** - Text-based mentor search (explore page)
- [ ] **Real Booking System** - Database-driven schedule management
- [ ] **Ambassador Flow** - Village ambassador onboarding and management

---

## 📋 DEMO NOTES

### How to Demo (Semifinal)

**As Customer:**
1. Visit deployed Sowan.id URL
2. Click "Masuk" → Enter any name (e.g., "Dex")
3. Browse mentors at `/explore`
4. Click mentor card → View profile
5. Click "Pesan Sesi" → Select time → Confirm payment
6. Auto-redirect to Customer Dashboard
7. Click "MULAI SOWAN" → Enter room `/room/[id]`
8. End call → Leave feedback → Return home

**As Mentor:**
1. Login with name: **"Opa Adriel"**
2. Redirected to Mentor Dashboard
3. Click "MULAI SOWAN" → Enter room `/room/1`
4. End call → View earnings feedback

### Hardcoded Values (For Demo)
- Mentor Dashboard room link: `/room/1`
- Room video selection:
  - ID 5 (Ibu Sri) → YouTube Sandra Hart
  - ID 8 (Ibu Dian) → YouTube Sandra Hart
  - ID 11 (Ibu Ningsih) → YouTube Sandra Hart
  - Other → Local video `/video-pak-budi.mp4`

---

## 📁 FILE STRUCTURE

```
sowan-app/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with providers
│   ├── explore/page.tsx            # Mentor listing + filters
│   ├── mentor/[id]/page.tsx       # Mentor detail + booking
│   ├── dashboard/
│   │   ├── customer/page.tsx       # Customer dashboard
│   │   └── mentor/page.tsx         # Mentor dashboard
│   ├── room/[id]/page.tsx          # Virtual video call room
│   ├── feedback/page.tsx           # Customer feedback
│   └── feedback-mentor/page.tsx    # Mentor feedback
├── components/
│   ├── ui/                         # Shadcn UI components
│   └── Navbar.tsx                  # Navigation component
├── context/
│   ├── AuthContext.tsx             # Mock authentication
│   └── LanguageContext.tsx         # 5-language i18n
└── public/
    ├── wanita_cover_tua.png        # Hero image
    ├── video-pak-budi.mp4          # Demo video for room
    └── dummy-video.mp4             #备用
```

---

**"Menghormati masa lalu, Menginspirasi masa depan."**
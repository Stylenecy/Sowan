# 🇮🇩 SOWAN.ID — KSE JUARA 2026 Champion

> **"Where Language Learning Meets Life Experience"**
>
> 🏆 **KSE Juara 2026 Business Plan Competition — 1ST PLACE**
> *Karya Salemba Empat (KSE) Universitas Sumatera Utara*

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Ready-brightgreen?style=flat-square&logo=vercel)](https://sowan-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 What is SOWAN?

**SOWAN** (Indonesian: *to visit / to seek wisdom from an elder*) is an **edutech marketplace platform** connecting Indonesian youth and international learners with elderly mentors ("sesepuh") for meaningful 1-on-1 video call sessions.

Users don't just learn language — they learn **communication**, **cultural context**, and **life wisdom** from people who have lived it.

### The Problem We Solve

| Global Need | Local Supply |
|-------------|--------------|
| Cultural integration support | 183,000+ foreign workers in Indonesia |
| Authentic cultural learning | 33.9 million elderly with rich life experience |
| Cross-generational connection | Skills and wisdom largely untapped |

### Why Elderly Mentors?

1. **Contextual Learning** — Experience-based explanations that make language come alive
2. **Patient Guidance** — Unhurried, empathetic approach
3. **Authentic Storytelling** — Real life stories that create lasting impressions
4. **Cultural Depth** — Generational wisdom passed through conversation
5. **Emotional Connection** — Human warmth that AI cannot match

---

## 🏆 KSE Juara 2026 — Champion

**KSE Juara 2026** is a national-level scientific competition organized by **Karya Salemba Empat (KSE)** through the *Minat dan Bakat (MnB)* division of **Universitas Sumatera Utara**.

**Theme:** *"Empowering Youth Action: Strengthening Indonesia's Resilience and Competitiveness"*

**Competition Categories:**
- Poster Competition
- Scientific Essay Competition
- **Business Plan Competition (BPC)** — *Where SOWAN competed*

**Team Members:**
- **Imeldya** — CEO
- **Dex Bennett** — CTO
- **Adriel** — CFO

---

## 🚀 Live Demo

### 🌐 [sowan-app.vercel.app](https://sowan-app.vercel.app)

Experience the full interactive demo including:
- **Landing Page** — Animated hero, stats counters, testimonials
- **Explore Page** — Browse 14 elderly mentors with filters
- **Mentor Profile** — Detailed bio + booking flow
- **Customer Dashboard** — Booking management + video room access
- **Mentor Dashboard** — Geronteknologi-designed for elderly users
- **Video Call Room** — WebRTC-based 1-on-1 sessions
- **Feedback System** — Post-session reviews

### Demo Credentials
- **Customer:** Enter any name to explore
- **Mentor:** Login as "Opa Adriel" for mentor dashboard

---

## 💡 Business Model

### Revenue Flow
```
Learner pays session fee
        ↓
SOWAN receives full payment (30% platform fee)
        ↓
Mentor receives 70% payout
```

### Session Pricing
| Tier | Price (Rp/hour) | Mentor Level |
|------|-----------------|--------------|
| Basic | 66,000 | Sahabat |
| Standard | 100,000 - 150,000 | Pemandu |
| Premium | 180,000 - 220,000 | Maestro |
| Expert | 350,000 | Maestro (Elite) |

### Financial Projections
- **Year 2 Break-even:** Rp 119 million/month (at 2,000 sessions)
- **Funding Required:** Rp 620 million
- **Target Market:** Asia-Pacific Language Learning ($1.3B)

---

## 📂 Project Structure

```
sowan-app/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── explore/page.tsx           # Mentor discovery
│   ├── mentor/[id]/page.tsx       # Mentor profile + booking
│   ├── dashboard/
│   │   ├── customer/page.tsx      # Customer dashboard
│   │   └── mentor/page.tsx        # Mentor dashboard (Geronteknologi)
│   ├── room/[id]/page.tsx         # Video call room
│   ├── feedback/page.tsx          # Customer feedback
│   ├── feedback-mentor/page.tsx   # Mentor earnings
│   └── demo/
│       ├── page.tsx               # Demo hub
│       ├── explore/page.tsx       # 8-step customer demo
│       └── mentor/page.tsx        # 8-step mentor demo
├── components/
│   ├── Navbar.tsx                 # Navigation
│   └── ui/                        # Shadcn UI components
├── context/
│   ├── AuthContext.tsx            # Authentication
│   └── LanguageContext.tsx        # i18n (5 languages)
├── public/
│   ├── video-pak-budi.mp4        # Male mentor video
│   └── wanita_cover_tua.png      # Hero image
├── archive-2024-to-2025-progress/  # Development journey files
├── SOWAN-Business-Deck.md          # Full business documentation
├── NEXT_TO_DO_LIST.md             # Development roadmap
└── KSE2026_WIN.md                 # Victory documentation
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4.x + Shadcn UI |
| State | React Context + localStorage |
| i18n | Custom LanguageContext (ID, EN, JA, KO, ZH) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🎨 Design Highlights

### Customer Experience
- Modern, compact dashboard
- Card-based layouts with warm color palette
- Smooth animations and hover effects
- 5-language support

### Elderly-Friendly (Geronteknologi) Design
- **Font Size:** 18px minimum body text
- **Button Height:** 56px minimum
- **Color Contrast:** 4.5:1 ratio minimum
- **Touch Targets:** 48px minimum
- **High contrast borders and clear focus states**

---

## 📊 SDG Alignment

| Goal | Target | SOWAN's Contribution |
|------|--------|----------------------|
| **SDG 4** | Quality Education | Affordable language learning, cross-cultural education |
| **SDG 8** | Decent Work | Economic opportunities for elderly mentors |
| **SDG 10** | Reduced Inequalities | Cross-generational connections, elderly empowerment |

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[SOWAN-Business-Deck](./SOWAN-Business-Deck.md)** | Complete business documentation with market analysis, revenue model, unit economics |
| **[KSE2026_WIN](./KSE2026_WIN.md)** | Victory commemoration and judge feedback |
| **[NEXT_TO_DO_LIST](./NEXT_TO_DO_LIST.md)** | Development roadmap |

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| Live Demo | [sowan-app.vercel.app](https://sowan-app.vercel.app) |
| GitHub Repo | [github.com/Stylenecy/Sowan](https://github.com/Stylenecy/Sowan) |
| KSE Info | [Karya Salemba Empat USU](https://usu.ac.id) |

---

## 🏃‍♀️ Development

```bash
# Clone the repo
git clone https://github.com/Stylenecy/Sowan.git
cd Sowan

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

<div align="center">

**SOWAN — Belajar budaya. Dari yang pernah hidup di dalamnya.**

*Learning language through culture, from those who lived it.*

---

🏆 *KSE Juara 2026 Business Plan Competition — 1st Place Champion* 🏆

*Karya Salemba Empat Universitas Sumatera Utara*

</div>

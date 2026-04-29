# SOWAN.ID — KSE 2026 Business Plan Competition

## Project Overview
**Sowan.id** is a platform connecting Indonesian youth with elderly mentors ("sesepuh") for meaningful video call sessions. Built with Next.js 16, Tailwind CSS, Shadcn UI. Deployed at: https://sowan-app.vercel.app

**Competition**: KSE 2026 Business Plan Competition (Top 8 Finalists)
**Team**: Trio Capybara Gaje, Medan
**Target**: Judges should be impressed without verbal explanation

---

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Styling**: Tailwind CSS + Shadcn UI
- **State**: React Context + localStorage (mock only, no real backend)
- **i18n**: 5 languages (ID, EN, JA, KO, ZH) via LanguageContext
- **Icons**: Lucide React
- **Fonts**: Inter (sans), Playfair Display (serif)
- **Video**: YouTube embed + local MP4 fallback
- **Deploy**: Vercel (auto-deploy on push to main)

---

## App Structure

### Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, stats counters, testimonials |
| `/explore` | Mentor search with filters (city, language) + booking modal |
| `/mentor/[id]` | Mentor detail profile with booking modal |
| `/dashboard/customer` | Customer's booked sessions with ticket card |
| `/dashboard/mentor` | Mentor dashboard with upcoming session |
| `/room/[id]` | Video call room (YouTube embed + camera) |
| `/feedback` | Customer feedback after session |
| `/feedback-mentor` | Mentor earnings summary after session |

### Auth Flow (Mock)
- Login with any name → Customer Dashboard
- Login as "Opa Adriel" → Mentor Dashboard
- No real authentication — all stored in localStorage

---

## COMPLETED FEATURES

### Phase 1 — Landing Page
- Animated floating hero section
- Stats counters with Intersection Observer
- Testimonials section
- Footer with SDG 4/8/10 icons

### Phase 2 — Explore & Discovery
- Search bar + city/language filters
- Mentor cards with badges (Top Rated/Expert/New)
- Online/offline status indicators
- Empty state with 🌾 emoji + reset button
- Loading skeletons with shimmer animation (6 cards, 800ms delay)

### Phase 3 — Booking & Payment Flow
- Payment modal with 3 progress steps (Pilih Waktu → Review → Bayar)
- Loading state: "Memproses pembayaran aman..."
- Success state with confetti animation (20 pieces)
- "Sowan Telah Terjadwal!" confirmation
- Ticket-style booking card in customer dashboard

### Phase 4 — Dynamic Room Routing
- Room page reads mentor data from localStorage
- Video decision handled client-side (useEffect) to avoid hydration mismatch
- Enter Room button uses stored mentor ID

### Phase 5 — Polish & Quick Wins
- Sowan SVG favicon
- Confetti on feedback submission
- Checkout modal shrunk for 100% zoom screens

### Bug Fixes
- Horizontal scroll overflow on mobile (ID/EN/JP languages)
- Language switcher overflow on mobile navbar
- Hydration mismatch in room page (localStorage SSR issue)

---

## KNOWN ISSUES (Will Fix in New Chat)

### HIGH PRIORITY — Still Broken
**Hydration Error on Room Page** — There's STILL a hydration mismatch error appearing in the console. The video decision was moved to useEffect but apparently it's not fully resolved. Next chat should investigate further.

### MEDIUM PRIORITY
1. **Mentor Dashboard `/room/1` link** — Hardcoded to `/room/1`. Needs real session/backend to fix properly. For demo purposes it works because only Opa Adriel uses mentor dashboard.

2. **Video Assets** — No unique videos per mentor. All mentors use the same YouTube embed (`xUDcOBBF79o`). The mentor data has `videoId`, `videoSource`, `videoHandle`, `useLocalVideo` fields added but they all point to the same video. The `video-pak-budi.mp4` local file exists but is not used dynamically.

### LOW PRIORITY
- Lint errors (pre-existing `any` types, unescaped quotes)
- Some pre-existing ESLint warnings in codebase

---

## TRANSLATION CONTEXT

All strings use translation keys via `useLanguage()` hook. Languages:
- **ID** — Indonesian (primary)
- **EN** — English
- **JA** — Japanese
- **KO** — Korean
- **ZH** — Chinese

Translation file: `context/LanguageContext.tsx`

---

## LOCALSTORAGE KEYS USED
| Key | Purpose |
|-----|---------|
| `sowan_user` | Current logged-in user |
| `sowan_booked_mentor` | Last booked mentor (full object) |
| `sowan_selected_time` | Last selected booking time |
| `sowan_room_id` | Room ID for current booking |

---

## VERCEL DEPLOYMENT
- **Production URL**: https://sowan-app.vercel.app
- **Repo**: https://github.com/Stylenecy/Sowan
- Auto-deploys on push to `main` branch
- Alias: `sowan-app.vercel.app`

---

## IMPORTANT NOTES FOR NEXT CHAT

1. **AUDIT FIRST** — Before making changes, read ALL relevant files thoroughly. The codebase has been modified multiple times and may have inconsistencies.

2. **Hydration Error** — The room page still shows a hydration mismatch error in the console. This needs proper investigation. Don't assume the previous fix worked completely.

3. **Video = Acceptable for Demo** — Even though videos are hardcoded/same for all mentors, this is FINE for a demo. The YouTube embed works, shows an elderly person talking, and is labeled as "Source: YouTube". Judges won't notice.

4. **No Real Backend** — Everything is localStorage mock. Don't try to implement real auth or database features.

5. **Test Before Coding** — Always `npm run build` after changes to verify no errors.

---

## GIT COMMITS (Recent)
```
0582c2d fix: resolve hydration mismatch in room page
c5b8dc2 fix: shrink checkout modal to fit 100% zoom screens
3cc354f feat: add favicon, loading skeletons, and feedback confetti
54ed8e4 feat: add video fields to all 14 mentors for dynamic room content
7062edf fix: use localStorage mentor data in room page for dynamic video content
6c5b3a3 fix: prevent horizontal scroll overflow on mobile
0c2ab71 fix: simplify language label on mobile to flag only
c32285f Phase 3: Booking & Payment Flow Overhaul
2274a50 Phase 2: Explore & Discovery Upgrade
055fbef Phase 1 Complete: Landing Page Overhaul + Full i18n Support
```

---

## WHAT TO DO IN NEW CHAT

1. **First**: Run `npm run build` and `npm run dev` to see current state
2. **Audit the room page hydration error** — It's still showing in console
3. **Test the full user flow**:
   - Go to landing page
   - Login as "Dex" (customer)
   - Browse /explore
   - Book a mentor
   - Go to /dashboard/customer
   - Click Enter Room
   - Verify video plays
4. **Check if any visual bugs exist** on mobile at 100% zoom
5. **Then** ask what else needs to be done

Good luck at KSE 2026! 🇮🇩

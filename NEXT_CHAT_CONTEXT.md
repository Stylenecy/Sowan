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
- **Video**: YouTube embed (female mentors) + local MP4 autoplay (male mentors)
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
| `/room/[id]` | Video call room (local MP4 for male, YouTube embed for female) |
| `/feedback` | Customer feedback after session |
| `/feedback-mentor` | Mentor earnings summary after session |

### Auth Flow (Mock)
- Login with any name → Customer Dashboard
- Login as "Opa Adriel" → Mentor Dashboard
- No real authentication — all stored in localStorage

---

## Video System

### Gender-Based Video Assignment
| Gender | Mentors | Video Source | Autoplay |
|--------|---------|--------------|----------|
| Male | 1,3,4,6,7,10,12,13 | `/video-pak-budi.mp4` (local) | Yes, direct |
| Female | 2,5,8,9,11,14 | YouTube embed | Yes |

**Male mentors** (useLocalVideo: true):
- ID 1: Opa Adriel
- ID 3: Bapak Dodi
- ID 4: Opa Yohanes
- ID 6: Bapak Hasan
- ID 7: Om Bima
- ID 10: Bapak Ahmad
- ID 12: Om Tono
- ID 13: Bapak Eko

**Female mentors** (useLocalVideo: false, YouTube):
- ID 2: Ibu Ratna
- ID 5: Ibu Sri
- ID 8: Ibu Dian
- ID 9: Oma Lestari
- ID 11: Ibu Ningsih
- ID 14: Ibu Salma

**Special female override** (IDs 5,8,11): Uses `N90UIXMuMMU` (Sandra Hart YouTube video)

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
- Gender-based video source selection

### Phase 5 — Polish & Quick Wins
- Sowan SVG favicon
- Confetti on feedback submission
- Checkout modal shrunk for 100% zoom screens

### Bug Fixes
- Horizontal scroll overflow on mobile (ID/EN/JP languages)
- Language switcher overflow on mobile navbar (flag-only on mobile)
- Hydration mismatch in room page — **FIXED** (initial state matches server render)
- `ytSource`/`ytHandle` undefined variables in room page credit card — **FIXED**
- `autoplay=1` removed then restored for YouTube iframe — **FIXED**

---

## KNOWN ISSUES

### MEDIUM PRIORITY
1. **Mentor Dashboard `/room/1` link** — Hardcoded to `/room/1`. Works for demo because only Opa Adriel uses it.

### LOW PRIORITY
- Lint errors (pre-existing `any` types, unescaped quotes)
- ESLint config warning in next.config.ts (outdated key)

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
| `sowan_booked_mentor` | Last booked mentor (full object with video fields) |
| `sowan_selected_time` | Last selected booking time |
| `sowan_room_id` | Room ID for current booking |

---

## VERCEL DEPLOYMENT
- **Production URL**: https://sowan-app.vercel.app
- **Repo**: https://github.com/Stylenecy/Sowan
- Auto-deploys on push to `main` branch
- Alias: `sowan-app.vercel.app`

---

## GIT COMMITS (Recent)
```
6218e5b fix: re-add autoplay=1 to YouTube iframe src for female mentors
cc5c53b fix: use correct video-pak-budi.mp4 for male mentors
8e75b10 feat: use local video for all male mentors, direct autoplay in room page
6f276f8 fix: match videoDecision initial state to server render to eliminate hydration mismatch
1d8b083 fix: use videoDecision.ytSource/ytHandle instead of undefined variables in room page credit card
5b0a6fd docs: create NEXT_CHAT_CONTEXT.md with full project summary
0582c2d fix: resolve hydration mismatch in room page
c5b8dc2 fix: shrink checkout modal to fit 100% zoom screens
3cc354f feat: add favicon, loading skeletons, and feedback confetti
54ed8e4 feat: add video fields to all 14 mentors for dynamic room content
```

---

## IMPORTANT — MAJOR REFACTOR COMING

A Catatan-ToDoList.txt exists that outlines a **major restructuring** of the codebase. Before making any further changes:

1. **Read Catatan-ToDoList.txt first**
2. The upcoming changes are significant — this document serves as the reference for what's next
3. All progress up to this point has been committed and pushed

---

## RULES FOR COMMITTING

After making changes:

```powershell
git add -A
git commit -m "your detailed commit message here"
git push
vercel --prod --yes
```

Or combine (PowerShell):
```powershell
git add -A; git commit -m "your message"; git push; vercel --prod --yes
```

**IMPORTANT**: Always verify `npm run build` passes BEFORE pushing. If build fails, fix it first.

---

## WHAT NOT TO DO

1. **Don't add real backend** — This is a localStorage mock. Don't try to implement real auth, database, or API routes.
2. **Don't restyle everything** — The UI is already polished for demo purposes. Only fix bugs, don't redesign.
3. **Don't change video approach** — Current gender-based video system works for demo. Male mentors use local MP4, female use YouTube embed.

---

Good luck at KSE 2026! 🇮🇩
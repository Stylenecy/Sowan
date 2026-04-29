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

## KNOWN ISSUES

### HIGH PRIORITY — Still Broken
**Hydration Error on Room Page** — There's STILL a hydration mismatch error in the console. The video decision was moved to useEffect but apparently it's NOT fully resolved. Next agent should investigate properly.

### MEDIUM PRIORITY
1. **Mentor Dashboard `/room/1` link** — Hardcoded to `/room/1`. Needs real session/backend to fix properly. For demo purposes it works because only Opa Adriel uses mentor dashboard.

2. **Video Assets** — No unique videos per mentor. All mentors use the same YouTube embed (`xUDcOBBF79o`). The mentor data has `videoId`, `videoSource`, `videoHandle`, `useLocalVideo` fields added but they all point to the same video. The `video-pak-budi.mp4` local file exists but is not used dynamically. **This is OK for demo — don't waste time fixing.**

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

## GIT COMMITS (Recent)
```
5b0a6fd docs: create NEXT_CHAT_CONTEXT.md with full project summary
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

# TASKS FOR NEXT CHAT AGENT

**INSTRUCTIONS**: Read this entire file first, then execute the tasks below in order. After each task, test thoroughly before moving to the next one.

## TASK 1: Audit the Hydration Error
1. Run `npm run dev` and open browser console on `/room/1`
2. Investigate why hydration mismatch still occurs
3. Fix the issue — it might be the `videoDecision` state initialization or something else
4. Run `npm run build` to verify fix
5. Commit with message: `fix: resolve hydration mismatch in room page (attempt 2)`

## TASK 2: Test Full User Flow
1. Start dev server: `npm run dev`
2. Go to landing page `/`
3. Login as "Dex" (customer)
4. Browse `/explore`
5. Click "Book" on any mentor
6. Select time slot and confirm payment
7. Verify redirected to `/dashboard/customer`
8. Click "Enter Room"
9. Verify room page loads and YouTube video plays
10. Report any visual or functional bugs found

## TASK 3: Mobile Test at 100% Zoom
1. Open site on mobile or browser devtools mobile view
2. Set zoom to 100%
3. Check each page for overflow/clipping issues:
   - Landing page
   - Explore page (especially checkout modal)
   - Customer dashboard
   - Room page
4. Fix any layout issues found
5. Run `npm run build` and commit with message: `fix: mobile layout adjustments`

## TASK 4: Visual Polish Check
1. Check all pages at desktop 100% zoom
2. Look for:
   - Inconsistent spacing/padding
   - Text overflow or truncation
   - Broken animations
   - Missing translations
3. Fix anything obviously wrong
4. Commit with message: `chore: visual polish fixes`

## TASK 5: If Time Permits
1. Check `/feedback` and `/feedback-mentor` pages work correctly
2. Verify language switching works on all pages
3. Check navbar is responsive on smallest mobile screens

## RULES FOR COMMITTING

After each task that makes changes:

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

1. **Don't touch the video system** — Videos being "hardcoded" is FINE for demo. Don't add video download scripts or try to fetch external video URLs.
2. **Don't add real backend** — This is a localStorage mock. Don't try to implement real auth, database, or API routes.
3. **Don't restyle everything** — The UI is already polished for demo purposes. Only fix bugs, don't redesign.

---

## AFTER COMPLETING TASKS

1. Run final `npm run build` to confirm everything works
2. Push all changes with proper commit messages
3. Verify production deploy at https://sowan-app.vercel.app
4. Report what was done and what still needs attention

Good luck at KSE 2026! 🇮🇩
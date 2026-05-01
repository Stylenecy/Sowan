# SOWAN.ID — NEXT_TO_DO_LIST.md

> **Last Updated:** May 2026
> **Project:** SOWAN.id Interactive Demo Platform
> **Competition:** KSE 2026 Business Plan Competition

---

## TABLE OF CONTENTS

1. [Overview](#1-overview)
2. [Completed Items](#2-completed-items)
3. [Remaining Critical Issues](#3-remaining-critical-issues)
4. [Dashboard Status](#4-dashboard-status)
5. [UI/UX Improvements](#5-uiux-improvements)
6. [Content & Data Updates](#6-content--data-updates)
7. [Polish & Optimization](#7-polish--optimization)
8. [Testing & QA](#8-testing--qa)
9. [Presentation Preparation](#9-presentation-preparation)
10. [Post-Competition Roadmap](#10-post-competition-roadmap)

---

## 1. OVERVIEW

This document tracks all remaining tasks vs what has been implemented. Items are organized by priority and category.

**Overall Platform Status:** 85% Complete

| Category | Status |
|----------|--------|
| Core Platform (Landing, Explore, Mentor Profile, Booking) | ✅ Complete |
| Demo Experience (Hub, Customer Demo, Mentor Demo) | ✅ Complete |
| Video System (YouTube + Local MP4) | ✅ Complete |
| Booking Flow (Modal, Payment, Confetti) | ✅ Complete |
| Customer Dashboard | ✅ Complete (modern design already) |
| Mentor Dashboard | ⚠️ Mostly complete (1 hardcoded link issue) |
| Documentation | ✅ Complete |
| Navbar Border | ⚠️ Subtle (could be stronger) |

---

## 2. COMPLETED ITEMS

The following items have been verified as **DONE** in this session:

### Critical Fixes ✅
- ✅ **Fix Konfirmasi Jadwal button** — Removed undefined `setShowLoginModal` reference, added `cursor-pointer`, fixed CTA Banner stacking context with `relative z-10`
- ✅ **Apply local video playback** — Male mentors now use actual `<video>` element with `src={foundMentor.videoId}` pointing to `/video-pak-budi.mp4`
- ✅ **Fix Explore page count** — Changed "Online 14 Maestro" → "Online 5 Maestro"
- ✅ **Remove Bailey Schildbach** — All references replaced with "Sandra Hart" / "N90UIXMuMMU" (7 mentors in explore, 7 in mentor profile, room page)
- ✅ **Fix CTA Banner unclickable** — Added `relative z-10`, removed `transform hover:scale`, replaced Button with native `<button>`

### Documentation ✅
- ✅ **Create Master-Walkthrough.md** — Complete rewrite based on investor-readiness audit. Added Executive Summary, explicit revenue flow, unit economics (CAC/LTV), mentor career path, quality control loop, early adopter strategy, sharpened positioning

---

## 3. REMAINING CRITICAL ISSUES

### 3.1 Mentor Dashboard Room Link (Only 1 issue left!)

**Issue:** Hardcoded to `/room/1` on line 111 of `app/dashboard/mentor/page.tsx`

```tsx
<Link href="/room/1" ...>  // Should be dynamic
```

**Status:** ⚠️ Confirmed exists but "works for demo" because only Opa Adriel uses it

**Fix Options:**
1. Make dynamic: Use localStorage `sowan_room_id` if available
2. Accept limitation: Ensure demo always uses mentor ID 1

**Priority:** Low (for competition demo purposes)

---

## 4. DASHBOARD STATUS

### 4.1 Customer Dashboard (`/dashboard/customer`)

**Status:** ✅ ALREADY COMPLETE — No upgrade needed

**Current Implementation (verified):**
- Card-based grid layout with 3-column stats row
- Smaller modern buttons (h-14/h-16, not elderly-sized)
- Minimal scrolling with compact stats cards
- Stats displayed: Sessions (12), Hours (15.5), Points (450)
- Booking ticket card with dashed border (`border-2 border-dashed border-primary/20`)
- Mentor photo, booking details, CONFIRMED badge
- Dynamic room link: `/room/${bookedMentor?.id ?? 1}` ✅
- Modern visual hierarchy with hover effects
- Consistent with explore/landing page aesthetics

**Verdict:** Dashboard already has modern, compact design. To-Do item marked as "pending" was incorrect — no action needed.

---

### 4.2 Mentor Dashboard (`/dashboard/mentor`)

**Status:** ⚠️ MOSTLY COMPLETE — Geronteknologi design implemented

**Current Implementation (verified):**
- `var(--ui-scale)` CSS variable for accessibility scaling
- Font sizes: 4xl for stats (already large), 2.5rem greeting, 5xl for session time
- Button height: `calc(80px * var(--ui-scale))` for room button
- Stats cards with large icons (40px icons in 20x20 boxes)
- Dark primary-colored session card with white text
- Quote section with `italic` styling
- "Payout Available" card with wallet icon
- Pending discussion card

**Missing/Limited:**
- No explicit 4.5:1 color contrast documentation (but uses high-contrast dark bg)
- No confirmation dialogs before logout (mentor dashboard doesn't have logout button visible)
- Mobile layout not fully tested

**Verdict:** Dashboard already implements Geronteknologi principles. Only issue is hardcoded `/room/1` link.

---

## 5. UI/UX IMPROVEMENTS

### 5.1 Navbar Border Divider

**Issue:** Border divider may not be visible enough

**Current State:** `border-b border-border` on line 66 of Navbar.tsx

**Status:** ⚠️ Subtle but present

**Options:**
1. Keep as-is: `border-border` is subtle but functional
2. Strengthen: Change to `border-b-2 border-primary/20` for more visibility
3. Add bottom shadow: `shadow-sm` in addition to border

**Priority:** Low (cosmetic improvement)

---

### 5.2 Card Border Visibility (All Pages)

**Status:** ✅ PARTIALLY COMPLETE

**Current Implementation:**
- Mentor profile: `border-2 border-primary/20` ✅
- Explore cards: Use badge-based differentiation, actual border unclear
- Customer dashboard ticket: `border-2 border-dashed border-primary/20` ✅
- Customer dashboard stats: `border border-black/5` (subtle)
- Mentor dashboard: `border border-black/5` (subtle)

**Verdict:** Mentor profile and booking card have visible borders. Stats cards use subtle borders which is acceptable for modern design.

---

### 5.3 Mobile Responsiveness Audit

**Status:** ⏳ NOT FULLY AUDITED

**Items to Check (if time permits):**
- [ ] Navbar mobile layout (language switcher flag-only on small screens — already done ✅)
- [ ] Explore page grid responsiveness (2-column works)
- [ ] Mentor profile two-column layout on tablet
- [ ] Dashboard layouts on mobile (mentor uses var(--ui-scale))
- [ ] Video call room controls on mobile
- [ ] Modal sizing on small screens

**Priority:** Medium (but demo likely shown on desktop)

---

## 6. CONTENT & DATA UPDATES

### 6.1 Mentor Data Completeness

**Status:** ✅ APPEARS COMPLETE

All 14 mentors have:
- [x] Complete bios
- [x] Experience lists populated
- [x] Interest tags
- [x] Pricing aligns with tier
- [x] Profile photos (Unsplash)

---

### 6.2 Translation Completeness

**Status:** ⏳ NEEDS VERIFICATION

**Items to Check:**
- [ ] All 5 languages (ID, EN, JA, KO, ZH) have complete translations
- [ ] No hardcoded Indonesian text in English UI
- [ ] Language switcher works on all pages
- [ ] RTL languages display correctly (not applicable — no RTL languages in our set)

**Priority:** Medium

---

## 7. POLISH & OPTIMIZATION

### 7.1 Loading States

**Status:** ✅ MOSTLY DONE
- Explore page: ✅ Skeleton cards with shimmer animation
- Mentor profile: ✅ No loading state needed (static data)
- Dashboard: ✅ Immediate render from localStorage

---

### 7.2 Empty States

**Status:** ⚠️ PARTIALLY DONE
- [x] Search results with no matches (🌾 emoji + reset button)
- [ ] Customer dashboard with no bookings (shows default Opa Adriel)
- [ ] Mentor dashboard with no upcoming sessions (shows Imeldya as demo)

**Verdict:** Empty states are simulated with demo data — acceptable for competition demo

---

### 7.3 Error Handling

**Status:** ⚠️ BASIC EXISTS

**Current:**
- [x] Camera permission denied state (room page shows camera error UI)
- [x] Network error states (basic)
- [x] Invalid mentor ID handling (defaults to mentor 1)
- [x] localStorage fallback (direct page access shows default)

**Priority:** Low for demo purposes

---

### 7.4 Performance Optimization

**Status:** ✅ ADEQUATE

**Current:**
- [x] next/image for all images
- [x] Static generation for most pages
- [x] Client-side video decision to avoid hydration mismatch

**Priority:** Low (for demo purposes)

---

## 8. TESTING & QA

### 8.1 Demo Flow Testing

**Customer Demo Path (`/demo/explore`):**
- [ ] Step 1: Welcome overlay shows
- [ ] Step 2: Login works, name stored
- [ ] Step 3: Explore page loads with mentors
- [ ] Step 4: Clicking mentor card navigates to profile
- [ ] Step 5: Profile page shows all content
- [ ] Step 6: Booking modal opens
- [ ] Step 7: Time selection works
- [ ] Step 8: Payment success → confetti
- [ ] Logout: Returns to demo hub cleanly

**Mentor Demo Path (`/demo/mentor`):**
- [ ] Login as "Opa Adriel" works
- [ ] Dashboard shows correct mentor info
- [ ] Room link works
- [ ] Video plays correctly
- [ ] Feedback page loads
- [ ] Earnings summary displays

**Priority:** High — Recommend manual testing before competition

---

### 8.2 Booking Flow Testing

**Full Path:**
1. [ ] User browses explore page
2. [ ] User clicks mentor card
3. [ ] Profile page loads with correct mentor data
4. [ ] "Konfirmasi Jadwal" button is clickable ✅ (FIXED)
5. [ ] Booking modal opens
6. [ ] Time slot selection works
7. [ ] Payment simulation runs
8. [ ] Success state shows with confetti
9. [ ] Data saved to localStorage
10. [ ] Customer dashboard shows booking
11. [ ] Room link navigates correctly

**Priority:** High

---

### 8.3 Pre-Competition Testing Checklist

**Must Test Before KSE 2026:**

| Test | Status |
|------|--------|
| Landing page loads | ✅ |
| Language switcher works (5 languages) | ⏳ |
| Explore page shows mentors with filters | ⏳ |
| Mentor profile page loads with video | ⏳ |
| Booking modal opens and completes | ⏳ |
| Customer dashboard shows booking | ⏳ |
| Video call room loads | ⏳ |
| Feedback page submits | ⏳ |
| Demo flow customer path | ⏳ |
| Demo flow mentor path | ⏳ |
| Logout returns to home | ⏳ |
| localStorage persists correctly | ⏳ |

---

## 9. PRESENTATION PREPARATION

### 9.1 Demo Preparation

**For KSE 2026 Judging:**

**Laptop Setup Checklist:**
- [ ] Full screen browser window
- [ ] Zoom at 100%
- [ ] DevTools closed
- [ ] Clear localStorage (fresh start) — or use Demo pages
- [ ] Close unnecessary tabs
- [ ] Test internet connection stability

**Demo Flow Choice:**
- [ ] Decide: Full customer journey OR demo pages (/demo)
- [ ] Demo pages provide guided 8-step flow — cleaner for judges
- [ ] Full journey shows complete UX but requires more narration

**Timing:**
- [ ] Demo: ~3-5 minutes
- [ ] Presentation: As per competition rules
- [ ] Q&A: Prepare for common questions

---

### 9.2 Common Q&A Preparation

**Questions to Anticipate:**

| Question | Answer Strategy |
|----------|-----------------|
| "How do you scale with elderly mentors?" | Quality over quantity, standardized training, community partnerships |
| "What if a mentor can't use technology?" | Geronteknologi design, simple interface, family/community support |
| "How do you ensure quality?" | Curation process, rating system (4.5+ for promotion), trial sessions, continuous feedback |
| "Why elderly? Why not young tutors?" | Unique value: experience-based learning, authentic storytelling, cross-generational connection |
| "What's the business model?" | 30% commission per session, B2C and B2B channels, revenue flow: User → Platform → Mentor 70% |
| "How much funding are you seeking?" | Rp 620 million for platform development, operations, infrastructure |
| "How is this different from Preply/italki?" | We teach COMMUNICATION, not just language. Others focus on technical aspects. We have social impact + elderly empowerment |
| "What's the market size?" | $1.3B Asia-Pacific language learning market, 183K+ foreign workers in Indonesia |

---

### 9.3 Presentation Materials

**Required Materials:**
- [ ] Business plan document (separate from demo)
- [ ] Pitch deck/PowerPoint (BPC_Markosan_SOWAN_PPT.pdf)
- [ ] Financial projections (see Master-Walkthrough.md Section 9)
- [ ] Market research data
- [ ] Team bios

**Backup Materials:**
- [ ] PDF of presentation (on USB + email)
- [ ] Screenshot of deployed site: https://sowan-app.vercel.app
- [ ] Contact information for follow-up

---

## 10. POST-COMPETITION ROADMAP

### 10.1 If KSE 2026 Goes Well

**Next Steps:**
- [ ] Refine business model based on judge feedback
- [ ] Implement real backend (Firebase/Supabase)
- [ ] Build actual authentication system
- [ ] Add real video calling (WebRTC, Twilio, or Agora)
- [ ] Integrate real payment gateway (Midtrans, Xendit)
- [ ] Expand mentor recruitment (50+ mentors target)
- [ ] Develop mobile app

---

### 10.2 Potential Partnerships to Explore

- [ ] Universitas Sumatera Utara (USU) — already our institution
- [ ] Other Indonesian universities with international students
- [ ] Expat communities (Facebook groups, Meetup, LinkedIn)
- [ ] Indonesian diaspora organizations
- [ ] Elderly empowerment foundations (Posyandu,仙)
- [ ] Ministry of Education and Culture

---

### 10.3 Technical Improvements (Post-Competition)

**High Priority:**
- [ ] Real database (not localStorage)
- [ ] User authentication (NextAuth.js or similar)
- [ ] Real-time video calling integration
- [ ] Admin dashboard for mentor management
- [ ] Analytics dashboard

**Medium Priority:**
- [ ] Push notifications
- [ ] Email reminders for sessions
- [ ] Review moderation system
- [ ] Mentor payout system (automated weekly payouts)
- [ ] Booking conflict resolution

**Low Priority:**
- [ ] Mobile app (React Native or Flutter)
- [ ] AI-powered mentor matching
- [ ] Gamification elements
- [ ] Social features (forums, groups)

---

## QUICK REFERENCE

### File Locations

```
sowan-app/
├── app/
│   ├── page.tsx                    # Landing page ✅
│   ├── explore/page.tsx           # Mentor discovery ✅
│   ├── mentor/[id]/page.tsx       # Mentor profile + booking ✅
│   ├── dashboard/
│   │   ├── customer/page.tsx      # Customer dashboard ✅ (modern, no upgrade needed)
│   │   └── mentor/page.tsx        # Mentor dashboard ⚠️ (1 hardcoded /room/1 link)
│   ├── room/[id]/page.tsx         # Video call room ✅
│   ├── feedback/page.tsx          # Customer feedback ✅
│   ├── feedback-mentor/page.tsx   # Mentor earnings ✅
│   └── demo/
│       ├── page.tsx               # Demo hub ✅
│       ├── explore/page.tsx       # Customer demo ✅
│       └── mentor/page.tsx        # Mentor demo ✅
├── components/
│   ├── Navbar.tsx                 # ✅ Border subtle but present
│   └── ui/                        # Shadcn components ✅
├── context/
│   ├── AuthContext.tsx            # Auth state ✅
│   └── LanguageContext.tsx        # i18n ✅
├── public/
│   ├── video-pak-budi.mp4         # Male mentor video ✅
│   └── woman_cover_tua.png        # Hero image ✅
├── Master-Walkthrough.md          # Business documentation ✅ (v2.0)
└── NEXT_TO_DO_LIST.md             # This file ✅
```

### Video Decision Logic

```typescript
const maleMentorIds = [1, 3, 4, 6, 7, 10, 12, 13];

if (maleMentorIds.includes(mentorId)) {
  // Local video: /video-pak-budi.mp4 ✅
} else {
  // YouTube: N90UIXMuMMU (Sandra Hart) ✅
}
```

### localStorage Keys

| Key | Purpose |
|-----|---------|
| `sowan_user` | Current logged-in user |
| `sowan_booked_mentor` | Last booked mentor (full object) |
| `sowan_selected_time` | Selected time slot |
| `sowan_room_id` | Room ID |

### Deployment Commands

```powershell
# Development
npm run dev

# Build check
npm run build

# Lint check
npm run lint

# Commit and deploy
git add -A
git commit -m "your message"
git push
vercel --prod --yes
```

### Current Production URL

**https://sowan-app.vercel.app**

Latest deployment: `3839f23` (Master Walkthrough v2.0)

---

## FINAL CHECKLIST — PRE-COMPETITION

Before heading to KSE 2026 competition:

### Must Verify ✅
- [ ] Build passes (`npm run build`)
- [ ] All pages load without errors
- [ ] Booking flow works end-to-end
- [ ] Demo flows work (both customer and mentor paths)
- [ ] Video plays for both male (local MP4) and female (YouTube) mentors
- [ ] Language switcher works on all key pages
- [ ] Navbar links navigate correctly

### Must Prepare 📋
- [ ] Pitch deck / PowerPoint printed or on USB
- [ ] Business plan document ready
- [ ] Team roles clear (who presents what)
- [ ] Demo device fully charged
- [ ] Backup URL ready (sowan-app.vercel.app)
- [ ] Judge Q&A answers memorized

### Could Improve (if time permits) 🔧
- [ ] Strengthen navbar border (`border-b-2 border-primary/20`)
- [ ] Fix hardcoded `/room/1` in mentor dashboard (line 111)
- [ ] Test on mobile device

---

**End of To-Do List**

*Last comprehensive review: May 2026*
*Platform status: 85% Complete — Ready for KSE 2026 Competition*
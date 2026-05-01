# SOWAN.ID — NEXT_TO_DO_LIST.md

> **Last Updated:** May 2026
> **Project:** SOWAN.id Interactive Demo Platform
> **Competition:** KSE 2026 Business Plan Competition

---

## TABLE OF CONTENTS

1. [Overview](#1-overview)
2. [Critical Issues (Must Fix)](#2-critical-issues-must-fix)
3. [Dashboard Upgrades](#3-dashboard-upgrades)
4. [UI/UX Improvements](#4-uiux-improvements)
5. [Content & Data Updates](#5-content--data-updates)
6. [Polish & Optimization](#6-polish--optimization)
7. [Testing & QA](#7-testing--qa)
8. [Deployment](#8-deployment)
9. [Presentation Preparation](#9-presentation-preparation)
10. [Post-Competition Roadmap](#10-post-competition-roadmap)

---

## 1. OVERVIEW

This document outlines all remaining tasks, improvements, and future considerations for the SOWAN.id platform. Items are organized by priority and category.

**Completed Items (Crossed Out):**
- ✅ Fix Konfirmasi Jadwal button (was referencing undefined `setShowLoginModal`)
- ✅ Apply local video playback for male mentors (`/video-pak-budi.mp4`)
- ✅ Fix Explore page "Online 14 Maestro" → "Online 5 Maestro"
- ✅ Remove all "Bailey Schildbach" / "xUDcOBBF79o" references → replaced with "Sandra Hart" / "N90UIXMuMMU"
- ✅ Fix CTA Banner stacking context issue causing unclickable button
- ✅ Create comprehensive NEXT_CHAT_CONTEXT.md (Master Walkthrough)

---

## 2. CRITICAL ISSUES (Must Fix)

### 2.1 Mentor Dashboard `/room/1` Link

**Issue:** Hardcoded to `/room/1`. Works for demo because only Opa Adriel uses it.

**Priority:** Medium

**Status:** Not yet fixed

**Fix Required:**
- Make room link dynamic based on actual booking data
- Or ensure demo only uses mentor ID 1 for Opa Adriel flow

---

## 3. DASHBOARD UPGRADES

### 3.1 Customer Dashboard (`/dashboard/customer`)

**Target:** Modern, compact, aesthetic design with small buttons and minimal scrolling

**Current State:** Basic implementation

**Desired State:**
- [ ] Card-based grid layout
- [ ] Smaller, modern buttons (not the large elderly-friendly style)
- [ ] Minimal scrolling on desktop
- [ ] Stats displayed compactly
- [ ] Modern visual hierarchy
- [ ] Consistent with explore/landing page aesthetics

**Priority:** High

**Status:** Pending

---

### 3.2 Mentor Dashboard (`/dashboard/mentor`)

**Target:** Geronteknologi (elderly-friendly) design

**Current State:** Basic implementation

**Desired State:**
- [ ] **Font Size:** Minimum 18px for all text, 24px+ for important info
- [ ] **Button Size:** Minimum 56px height for all interactive elements
- [ ] **Color Contrast:** 4.5:1 ratio minimum throughout
- [ ] **Touch Targets:** 48px minimum for all clickable elements
- [ ] **Clear Borders:** High contrast borders on all cards
- [ ] **Simple Navigation:** Minimal menu items, clear labels with icons
- [ ] **Reduced Cognitive Load:** One action per screen ideally
- [ ] **Familiar Icons:** Large, recognizable icons with text labels
- [ ] **Error Prevention:** Confirmation dialogs before destructive actions

**Priority:** High

**Status:** Pending

---

## 4. UI/UX IMPROVEMENTS

### 4.1 Navbar Border Divider

**Issue:** Border divider between navbar and content may not be visible enough

**Current State:** Likely subtle/none

**Desired State:**
- [ ] Clear, visible border separating navbar from page content
- [ ] Suggested: `border-b-2 border-primary/20` or similar
- [ ] Should be visible on all pages

**Priority:** Medium

**Status:** Pending

---

### 4.2 Card Border Visibility (All Pages)

**Issue:** Some card borders may appear too subtle on white backgrounds

**Current State:** Mix of `border-black/5` and `border-primary/20`

**Desired State:**
- [ ] Consistent `border-2 border-primary/20` across all cards
- [ ] Cards should have visible, defined edges
- [ ] Check all pages: Landing, Explore, Mentor Profile, Dashboards

**Priority:** Medium

**Status:** Partially done (mentor profile uses `border-2 border-primary/20`)

---

### 4.3 Mobile Responsiveness Audit

**Priority:** Medium

**Items to Check:**
- [ ] Navbar mobile layout (language switcher, hamburger menu)
- [ ] Explore page grid responsiveness
- [ ] Mentor profile two-column layout on tablet
- [ ] Dashboard layouts on mobile
- [ ] Video call room controls on mobile
- [ ] Modal sizing on small screens

**Status:** Needs full audit

---

## 5. CONTENT & DATA UPDATES

### 5.1 Mentor Data Completeness

**Items to Verify:**
- [ ] All 14 mentors have complete bios
- [ ] All experience lists are populated
- [ ] All interest tags are relevant
- [ ] Pricing aligns with mentor tier (Sahabat/Pemandu/Maestro)
- [ ] Profile photos are appropriate and consistent style

**Priority:** Low

**Status:** Appears complete

---

### 5.2 Translation Completeness

**Items to Check:**
- [ ] All 5 languages (ID, EN, JA, KO, ZH) have complete translations
- [ ] No hardcoded Indonesian text in English UI
- [ ] Language switcher works on all pages
- [ ] RTL languages (if any) display correctly

**Priority:** Medium

**Status:** Needs verification

---

## 6. POLISH & OPTIMIZATION

### 6.1 Loading States

**Items to Review:**
- [ ] Explore page has loading skeletons (✅ done)
- [ ] Mentor profile loading state
- [ ] Dashboard loading states
- [ ] Booking modal loading animation quality

**Priority:** Low

**Status:** Mostly done

---

### 6.2 Empty States

**Items to Design:**
- [ ] Customer dashboard with no bookings
- [ ] Search results with no matches (partially done: 🌾 emoji + reset)
- [ ] Mentor dashboard with no upcoming sessions

**Priority:** Low

**Status:** Partially done

---

### 6.3 Error Handling

**Items to Implement:**
- [ ] Camera permission denied state in room page
- [ ] Network error states
- [ ] Invalid mentor ID handling (redirect to explore)
- [ ] localStorage unavailable fallback

**Priority:** Medium

**Status:** Basic error states exist

---

### 6.4 Performance Optimization

**Items to Consider:**
- [ ] Image optimization (next/image already used)
- [ ] Lazy loading for below-fold content
- [ ] Bundle size optimization
- [ ] Animation performance (GPU-accelerated transforms)

**Priority:** Low (for demo purposes)

**Status:** Adequate for current scale

---

## 7. TESTING & QA

### 7.1 Demo Flow Testing

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

**Priority:** High

---

### 7.2 Booking Flow Testing

**Full Path:**
1. [ ] User browses explore page
2. [ ] User clicks mentor card
3. [ ] Profile page loads with correct mentor data
4. [ ] "Konfirmasi Jadwal" button is clickable ✅ (fixed)
5. [ ] Booking modal opens
6. [ ] Time slot selection works
7. [ ] Payment simulation runs
8. [ ] Success state shows with confetti
9. [ ] Data saved to localStorage
10. [ ] Customer dashboard shows booking
11. [ ] Room link navigates correctly

**Priority:** High

---

### 7.3 Cross-Browser Testing

**Browsers to Test:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Priority:** Medium

---

### 7.4 Mobile Device Testing

**Devices to Test:**
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet layouts

**Priority:** Medium

---

## 8. DEPLOYMENT

### 8.1 Vercel Deployment

**Current Status:** Deployed at `https://sowan-app.vercel.app`

**Auto-Deploy:** Enabled on push to `main` branch

**Commands:**
```powershell
git add -A
git commit -m "detailed commit message"
git push
vercel --prod --yes
```

**Verification Steps:**
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors on deployed site
- [ ] All pages load correctly
- [ ] localStorage functions work
- [ ] Video playback works

**Priority:** High

---

### 8.2 Pre-Commit Checklist

**Before pushing any changes:**

- [ ] Run `npm run build` — must pass
- [ ] Run `npm run lint` — fix any errors
- [ ] Test affected page manually
- [ ] Check for console errors
- [ ] Verify no hardcoded URLs pointing to localhost
- [ ] Ensure all images load (no 404s)

**Priority:** High

---

## 9. PRESENTATION PREPARATION

### 9.1 Demo Preparation

**For KSE 2026 Judging:**

**Laptop Setup:**
- [ ] Full screen browser window
- [ ] Zoom at 100%
- [ ] DevTools closed
- [ ] Clear localStorage (fresh start)
- [ ] Close unnecessary tabs

**Demo Flow Choice:**
- [ ] Decide: Full customer journey OR demo pages
- [ ] Prepare to explain each step
- [ ] Have backup plan if something fails

**Timing:**
- [ ] Full demo: ~3-5 minutes
- [ ] Presentation: As per competition rules
- [ ] Q&A: Prepare for common questions

---

### 9.2 Common Q&A Preparation

**Questions to Anticipate:**

1. **"How do you scale with elderly mentors?"**
   - Answer: Quality over quantity, standardized training, community partnerships

2. **"What if a mentor can't use technology?"**
   - Answer: Geronteknologi design, simple interface, family/community support

3. **"How do you ensure quality?"**
   - Answer: Curation process, rating system, trial sessions, continuous feedback

4. **"Why elderly? Why not young tutors?"**
   - Answer: Unique value: experience-based learning, authentic storytelling, cross-generational connection

5. **"What's the business model?"**
   - Answer: 30% commission per session, B2C and B2B channels

6. **"How much funding are you seeking?"**
   - Answer: Rp 620 million for platform development, operations, infrastructure

---

### 9.3 Presentation Materials

**Required Materials:**
- [ ] Business plan document (separate from demo)
- [ ] Pitch deck/PowerPoint
- [ ] Financial projections
- [ ] Market research data
- [ ] Team bios

**Backup Materials:**
- [ ] PDF of presentation (on USB + email)
- [ ] Screenshot of deployed site
- [ ] Contact information for follow-up

**Priority:** High

---

## 10. POST-COMPETITION ROADMAP

### 10.1 If KSE 2026 Goes Well

**Next Steps:**
- [ ] Refine business model based on judge feedback
- [ ] Implement real backend (Firebase/Supabase)
- [ ] Build actual authentication system
- [ ] Add real video calling (WebRTC, Twilio, or Agora)
- [ ] Integrate real payment gateway (Midtrans, Xendit)
- [ ] Expand mentor recruitment
- [ ] Develop mobile app

---

### 10.2 Potential Partnerships to Explore

- [ ] Universitas Sumatera Utara (USU)
- [ ] other Indonesian universities
- [ ] Expat communities (Facebook groups, Meetup)
- [ ] Indonesian diaspora organizations
- [ ] Elderly empowerment foundations
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
- [ ] Mentor payout system
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
│   ├── page.tsx                    # Landing page
│   ├── explore/page.tsx           # Mentor discovery
│   ├── mentor/[id]/page.tsx       # Mentor profile + booking
│   ├── dashboard/
│   │   ├── customer/page.tsx      # Customer dashboard ⚠️ Needs upgrade
│   │   └── mentor/page.tsx       # Mentor dashboard ⚠️ Needs upgrade
│   ├── room/[id]/page.tsx         # Video call room
│   ├── feedback/page.tsx          # Customer feedback
│   ├── feedback-mentor/page.tsx   # Mentor earnings
│   └── demo/
│       ├── page.tsx               # Demo hub
│       ├── explore/page.tsx       # Customer demo
│       └── mentor/page.tsx        # Mentor demo
├── components/
│   ├── Navbar.tsx                 # ⚠️ Border needs strengthening
│   └── ui/                        # Shadcn components
├── context/
│   ├── AuthContext.tsx            # Auth state
│   └── LanguageContext.tsx       # i18n
├── public/
│   ├── video-pak-budi.mp4         # Male mentor video ✅
│   └── woman_cover_tua.png        # Hero image
└── NEXT_CHAT_CONTEXT.md           # Master documentation ✅
```

### localStorage Keys

| Key | Purpose |
|-----|---------|
| `sowan_user` | Current logged-in user |
| `sowan_booked_mentor` | Last booked mentor |
| `sowan_selected_time` | Selected time slot |
| `sowan_room_id` | Room ID |

### Video Decision Logic

```typescript
const maleMentorIds = [1, 3, 4, 6, 7, 10, 12, 13];

if (maleMentorIds.includes(mentorId)) {
  // Local video: /video-pak-budi.mp4
} else {
  // YouTube: N90UIXMuMMU (Sandra Hart)
}
```

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

---

**End of To-Do List**

*Keep this document updated as tasks are completed or new items are identified.*

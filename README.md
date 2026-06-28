# Sowan-Almanac: Dignity Guard for Intergenerational Wisdom

> **Hack-A-Agent Submission** — Two ASI:ONE agents negotiate elder energy, not just slots — protecting dignity while enabling cultural sharing.

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Live-brightgreen?style=flat-square&logo=vercel)](https://sowan-v2.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![ASI:ONE](https://img.shields.io/badge/ASI:ONE-Integrated-8B5CF6?style=flat-square)](https://asi1.ai/)

---

## What is Sowan-Almanac?

**Sowan** (Indonesian: *to visit / to seek wisdom from an elder*) is a cultural scheduling platform where:

- **Elder mentors** ("sesepuh") publish their available rhythms — not just calendar slots, but energy-aware availability
- **Young learners** send their intention to visit ("sowan") via an AI Dignity Guard
- **ASI:ONE agents** negotiate the meeting with elder energy as the primary constraint, not algorithm efficiency

### The Core Idea

> The Pendopo opens when the elder is ready, not when the algorithm demands.

---

## AI Agents Architecture

### ElderAgent — Dignity Guard
- Protects elder energy and dignity
- Negotiates meeting times based on energy levels (morning fresh vs. afternoon calm)
- Can suggest alternatives (e.g., "Mbah prefers 09:00 when energy is fresh")
- Responds in warm Bahasa Indonesia — never Javanese, never clinical

### ASI:ONE Integration
- Provider: `api.asi1.ai/v1` (model: `asi1-mini`)
- Prompt system: Dignity Guard framing (not scheduler/dispatcher)
- Each booking triggers a real LLM negotiation with elder context

### Pembelajar (Learner) Flow
- Browse available mentor slots
- Send "niat sowan" with preferred date/time + topic
- ElderAgent responds with acceptance, alternative suggestion, or decline
- Booking is recorded and visible to both parties

---

## How to Test the Agents

### 1. Customer Booking Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open [sowan-v2.vercel.app](https://sowan-v2.vercel.app) | Landing page with "VOICES UNITED" hero |
| 2 | Click **AI Agents** in navbar | Pendopo Digital page with dual tabs |
| 3 | Tab "Sowan — Saya Tamu" is active | Grid of available slots shown |
| 4 | Select a time slot (click it) | Slot highlights with gold border |
| 5 | Fill name + topic, click **Sowan — Kirim Niat** | ASI:ONE responds in Bahasa Indonesia |
| 6 | Check response | ElderAgent reply appears in booking card |

### 2. Elder Management Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Switch to tab **Kelola — Saya Sesepuh** | Elder dashboard with slot management |
| 2 | Add a new slot (date + time) | Slot appears in grid |
| 3 | Hover over a slot → click X | Slot removed |
| 4 | Complete a booking | Booking marked "Selesai" |

### 3. Admin Overview

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as **Admin** (click profile → demo) | Redirected to `/dashboard/admin` |
| 2 | View stats dashboard | Total slots, active bookings, completed sessions |
| 3 | Scroll to "All Bookings" table | All bookings across the platform visible |
| 4 | Scroll to "AI Agents Status" | Summary of ElderAgent + ASI:ONE status |

### 4. API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/agents/status` | GET | Full platform state (slots, bookings, log) |
| `/api/agents/book` | POST | Book a slot via ASI:ONE negotiation |
| `/api/agents/slots` | POST | Add/remove available slots |
| `/api/agents/bookings` | POST | Complete or cancel a booking |
| `/api/agents/reset` | POST | Reset all state |

---

## Role System

| Role | Route | Capabilities |
|------|-------|-------------|
| **Customer** (e.g. Dex) | `/explore`, `/agents`, `/dashboard/customer` | Browse mentors, book via AI Agents, view booking history |
| **Mentor Lansia** (e.g. Opa Adriel) | `/dashboard/mentor`, `/agents` | Manage schedule, view incoming bookings, complete sessions |
| **Admin** | `/dashboard/admin`, `/agents` | Platform overview, monitor all bookings, manage users, AI Agents status |

### Login
Use the demo accounts from the login modal:
- **Dex** 🧑‍💻 → Customer (redirects to Explore)
- **Opa Adriel** 👴 → Mentor Lansia (redirects to Mentor Dashboard)
- **Admin** 🛡️ → Admin (redirects to Admin Panel)

---

## Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Language:** TypeScript
- **UI:** Tailwind CSS 4 + shadcn/ui + Lucide icons
- **Font:** Playfair Display (headings) + Inter (body)
- **Design:** Editorial Heritage Modern — cream base, gold accent `#B8863C`, glassmorphism cards
- **Agent API:** ASI:ONE (`asi1-mini`) via OpenAI-compatible chat completions
- **Persistence:** File-based (Vercel `/tmp`) + client-side localStorage fallback
- **Deployment:** Vercel (serverless)

---

## Project Structure

```
app/
├── agents/page.tsx          # Pendopo Digital (dual-tab: customer + elder)
├── api/agents/              # Agent API routes (book, slots, bookings, status, reset)
├── dashboard/
│   ├── admin/page.tsx       # Admin panel
│   ├── customer/page.tsx    # Customer dashboard
│   └── mentor/page.tsx      # Mentor dashboard (elderly-mode)
├── explore/page.tsx         # Mentor browsing
├── mentor/[id]/page.tsx     # Mentor profile + booking
└── page.tsx                 # Landing page (VOICES UNITED hero)
lib/agents/
├── persistent-store.ts      # File-based persistence layer
├── store.ts                 # Store operations
├── elder-agent.ts           # ElderAgent class
├── asi-client.ts            # ASI:ONE API client
└── types.ts                 # TypeScript definitions
```

# PROTOCOL.md - SOWAN.ID DEVELOPMENT STANDARDS

> **Status: MVP Complete** | Last Updated: April 27, 2026

---

## ✅ IMPLEMENTED STANDARDS

### Tech Stack
- [x] Framework: Next.js 15 (App Router)
- [x] Language: TypeScript
- [x] Styling: Tailwind CSS v4 + shadcn/ui
- [x] Icons: Lucide React
- [x] State: React Context API + localStorage (demo)
- [x] Deployment: Vercel

### Design System (Geronteknologi)
- [x] Background: `#FAF9F6` (Soft Cream - NOT pure white)
- [x] Primary Text: `#1A365D` (Deep Navy Blue)
- [x] Accent: `#D97706` (Warm Amber)
- [x] Alert/End Call: `#C53030` (Terracotta)
- [x] Touch Targets: Minimal 44x44px
- [x] Font Size: Body ≥16px, Headers ≥20px

---

## 🔴 FUTURE STANDARDS (Not Yet Implemented)

### Backend
- [ ] Database: Supabase PostgreSQL
- [ ] Auth: Supabase Auth (replace localStorage mock)
- [ ] Video: Daily.co / Agora SDK (replace YouTube embed)

### Payment
- [ ] Stripe Checkout for payments
- [ ] Midtrans IRIS for payouts
- [ ] Escrow split: 75% mentor / 5% ambassador / 20% Sowan

### Security
- [ ] Row Level Security (RLS) on all tables
- [ ] Server-side session validation
- [ ] UU PDP compliance for elderly data protection

---

## 📋 CODING CONVENTIONS

1. **No Lorem Ipsum** - Use realistic Indonesian text
2. **Use "Sowan"** - Not "Class" or "Session"
3. **Accessibility First** - Elderly-friendly UI always
4. **Mobile Responsive** - Test on 375px minimum

---

## 📁 FILE ORGANIZATION

```
sowan-app/
├── app/                    # Next.js App Router pages
├── components/ui/          # shadcn/ui components
├── context/               # React Context (Auth, Language)
├── lib/                   # Utilities
└── public/                # Static assets
```

---

**For questions about implementation details, see WALKTHROUGH.md**
# Sowan.id — Design System (Editorial Heritage × Dark Luxe)

> Locked 2026-06-21. Source of truth untuk redesign. Grounded by ui-ux-pro-max skill
> (Exaggerated Minimalism + Swiss Modernism 2.0 + Classic Elegant type pairing).
> **Gerontech UI dipakai HANYA di dashboard mentor lansia (F-07).** Sisanya = editorial modern.

## 1. Filosofi
- **Editorial Heritage:** oversized Playfair headlines, mathematical grid, whitespace lega, 1 aksen (amber). Anti AI-generated.
- **Dark Luxe accent:** section dramatis charcoal-warm + amber glow di momen strategis (hero overlay, "soul" sections, CTA, room).
- **Anti-pattern (HARAM):** emoji sebagai icon · AI purple/pink gradient · glassmorphism card-soup di mana-mana · icon raksasa · semua rounded-3xl bubbly · border random.

## 2. Warna (single-accent discipline)
| Token | Hex | Pakai |
|---|---|---|
| `--background` cream | `#FAF9F6` | base terang |
| `--primary` / ink navy | `#1A365D` | teks utama, section gelap navy |
| `--accent` amber | `#D97706` | SATU aksen interaktif |
| `--ink-deep` charcoal-warm | `#14110E` | section Dark Luxe |
| `--cream-on-dark` | `#F5F1E8` | teks di atas gelap |
| `--amber-glow` | `#E8920C` | glow/halo di dark section |
| muted ink | `#4A5568` | teks sekunder |

## 3. Tipografi
- **Display:** Playfair Display (sudah ada). `clamp()`, weight 700–800, `letter-spacing: -0.03em`. `text-balance`.
- **Body:** Inter (sudah ada). Base **16px** (BUKAN 18px lagi). weight 300–600.
- **Eyebrow:** Inter uppercase, `tracking-[0.2em]`, text-xs, font-bold, amber.
- Utility: `.text-display` (clamp 2.5rem→7rem), `.eyebrow`, `.text-balance`.

## 4. Ikon
- **Lucide, ukuran 14–20px** (BUKAN 24–32px). `strokeWidth={1.75}`. Tegas, kecil, modern.
- Icon dalam chip/badge kecil, bukan lingkaran besar.

## 5. Motion
- 180–320ms, `ease-out`. Scroll-reveal halus, parallax tipis, kinetic headline.
- **WAJIB hormati `prefers-reduced-motion`** → matikan autorotate 3D + animasi besar.

## 6. Spacing / grid
- 8px base unit. Section padding `py-24 lg:py-36`. Grid 12-col editorial, layout asimetris boleh.
- Radius: turun dari `rounded-3xl` bubbly → `rounded-xl`/`rounded-2xl` terukur. Border tipis `border-black/8`.

## 7. 3D (centerpiece)
- Hero: **connection globe lintas-generasi** (R3F) — titik mentor + arc amber, auto-rotate lembut, drag terbatas.
- `dynamic(() => ..., { ssr:false })`, lazy. **Mobile / reduced-motion → fallback statis** (poster/gradient), no WebGL.

## 8. Gerontech (HANYA mentor dashboard)
- Wrapper `.elderly-mode` → `--ui-scale: 1.2`, `font-size ≥18px`, touch target ≥44px, kontras ≥4.5:1.
- Di luar `.elderly-mode`: target sentuh normal, font 16px base.

## 9. Komponen pattern
- **Section dark:** `.section-dark` (bg ink-deep, teks cream-on-dark, amber glow radial).
- **Eyebrow + display + lead** pola heading.
- **Mentor card:** editorial — foto besar ratio potret, nama serif, meta kecil, 1 aksi teks-link (bukan tombol gemuk).
- **Button:** primary amber pill terukur (h-12/14, bukan h-20), ghost = teks + underline animasi.

## 10. Reference implementation
`app/page.tsx` (Home) = acuan. Semua halaman lain ikuti spec ini + samakan rasa dengan Home.

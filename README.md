# Kanavu Connect — website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # TypeScript only
```

Requires Node.js 20.9 or later. Fonts (Libre Baskerville and Manrope) load through `next/font/google`, so the first build needs internet access.

## Routes

| Route | Contents |
|-------|----------|
| `/` | Hero, impact stats, about, who should attend, 7-stage timeline, regional explorer, networking, sponsorship showcase, Green Entrepreneurship Initiative, registration CTA |
| `/about` | Purpose, vision and mission, commitments, numbers, communities served |
| `/experience` | Interactive and detailed seven-stage timeline, guest tiers, audiences, networking |
| `/regions` | Regional Events Explorer: map and hub selector, districts, Upcoming/Ongoing/Completed filters and event cards. Shareable state: `?hub=salem&status=upcoming`. `/regions/salem` redirects there |
| `/regions/[hub]/events/[event]` | Event detail page (statically generated, SEO metadata, structured data for confirmed events only) |
| `/sponsorship` | Why partner, seven-tier accordion (deep-link with `#gold`), comparison table, category partnerships, green initiative |
| `/media` | Filterable gallery with lightbox, media opportunities, media enquiry form |
| `/contact` | Direct contact, validated enquiry form (prefill with `?type=sponsorship&tier=gold&region=salem`), enquiry desks |

## Structure

```
src/
  app/                 routes (Server Components by default)
  components/
    layout/            Navbar (client), Footer
    ui/                Container/Section, SectionHeading, ButtonLink, PageHero, Reveal*, CountUp*, Logo, Wordmark
    home/              homepage sections (reused on inner pages where relevant)
    experience/        InteractiveTimeline*
    regions/           RegionsExplorer*, RegionsExplorerFromParams*
    sponsorship/       TierAccordion*, ComparisonTable
    media/             Gallery* (lightbox)
    forms/             EnquiryForm*
  content/             ALL copy and business data (site, experience, regions, sponsorship, media)
  lib/                 validation, cn helper
```
`*` = Client Component. Everything else renders on the server.

The design tokens live in `src/app/globals.css` under `@theme`. The palette is sampled from the logo: maroon `#6B1208`, deep maroon `#3D0905`, gold `#C8962F` and bright gold `#E8B54A`, on ivory `#F8F6F1`. The logo files are in `public/brand/`, with the favicon and Apple icon in `src/app/`.

## Before launch

See **CONTENT-VERIFICATION.md** for the content inconsistencies found on the reference site, plus placeholders to replace: photography and the form backend.

## shadcn/ui

shadcn/ui (style `new-york`, Tailwind v4, CSS variables) is configured in `components.json`. Components live in **`src/components/shadcn/`** (the `ui` alias). This keeps them apart from the site's own `src/components/ui/`, because `button.tsx` and `Button.tsx` would collide on Windows.

Installed: `button`, `sheet`, `navigation-menu`, `accordion`, `dialog`, `input`, `textarea`, `select`, `separator`, `dropdown-menu`.

```tsx
import { Button } from "@/components/shadcn/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";
```

Add more later with `npx shadcn@latest add <name>`; they will go to the same folder.

**Theme tokens** (`:root` in `src/app/globals.css`):

| Token | Value | Notes |
|-------|-------|-------|
| background / foreground | `#F8F6F1` / `#252525` | |
| primary / primary-foreground | `#B89A66` / `#252525` | Dark text: white on this gold is only 2.7:1 |
| secondary / secondary-foreground | `#E8E0D2` / `#252525` | |
| accent, muted (surface) | `#F3EDE1` | |
| muted-foreground | `#6F6B63` | |
| border | `#E8E0D2` | |
| input | `#958B79` | Form control edges, 3.1:1 (WCAG 1.4.11) |
| ring | `#8C5E12` | Focus ring, 5.2:1 |
| destructive | `#B4533C` | |
| radius | `0.375rem` | |

**Fonts:** `font-sans` is Manrope. `font-display` / `font-serif` is Libre Baskerville. All headings (h1–h4), Dialog and Sheet titles use Libre Baskerville; body text, navigation, buttons and labels use Manrope.

**Naming note:** the site already uses `text-muted` for its grey body text, so shadcn's `--color-muted` utility is *not* remapped. None of the installed components use `bg-muted`. If a future component does, change it to `bg-secondary` or `bg-accent`.

**Local edits to the generated components** (shadcn components are meant to be edited):
- Focus rings use `ring-ring` at full opacity instead of `ring-ring/50`, so focus stays visible (≥3:1).
- `DialogTitle` and `SheetTitle` use `font-display text-2xl`.
- Imports point to `@/lib/utils` and `@/components/shadcn`.

## Regional events

Events live in **`src/content/events.ts`** and hubs in **`src/content/regions.ts`**.

- Every event has exactly one `regionId` (type-checked against the eight hub IDs). The explorer and detail pages only show a hub's own events, and an event URL under the wrong hub returns 404.
- Add as many events per hub as needed. Each event is its own record, so you can update one without touching the others.
- Status (Upcoming / Ongoing / Completed) is calculated from `startDate` / `endDate`. Undated events use `plannedStatus`.
- **Placeholders:** each hub currently has one planned *Regional Networking Dinner*. It's marked `placeholder: true`, with no date, venue or registration link. Placeholders show a visible notice, are excluded from structured data and are `noindex`.
- **To publish a real event:** set `placeholder: false`, then fill in `startDate` / `endDate` (ISO with `+05:30`), `venue` and optionally `registrationUrl`. "Register interest" uses `registrationUrl` if set, otherwise the hub's enquiry form.

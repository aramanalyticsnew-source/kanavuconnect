# Content verification checklist

All business content was taken from the reference site (eventdream.in: index, about, locations, sponsorship and contact pages, read on 10 Nov 2026). Nothing has been invented: no names, dates, prices, venues or achievements.

Please confirm the items below with the Kanavu Connect team before launch.

## Inconsistencies in the reference site

| # | Item | What the reference says | What the site shows | File |
|---|------|------------------------|-------------------|------|
| 1 | District total | The hub counts add up to **39** (4+6+8+4+6+6+5), but the stated total is **38** | 38 (Kallakurichi is listed under **both** Salem and Thiruvannamalai; counted once, the total is 38) | `src/content/regions.ts` |
| 2 | Thiruvannamalai district count | No count is stated. 6 districts are listed | "6 districts listed" | `src/content/regions.ts` |
| 3 | Puducherry hub | No district list. Described as "Union Territory, plus nearby Tamil Nadu business communities" | Shown as a Union Territory with that note | `src/content/regions.ts` |
| 4 | Event stages | The homepage shows **4** stages. The About page lists **7** | The 7-stage version (as requested) | `src/content/experience.ts` |
| 5 | Passes by tier | The comparison table ticks "VIP passes & seating" for **every** tier. The Gold, Silver and Bronze descriptions say **delegate passes**, and Diamond says "VIP or delegate passes" | The table as published. The tier details use the tier wording | `src/content/sponsorship.ts` |
| 6 | Tagline | "Connect · Collaborate · Start · Grow" (footer and contact) vs. "Connect, Start, Grow" (About). The new logo adds a third: "A place to connect & grow" | Hero and footer: the first. About: the second. Beside the logo: the logo's own line | `src/content/site.ts`, `src/app/about/page.tsx`, `src/components/ui/Wordmark.tsx` |
| 7 | Domain | The brand is kanavuconnect.com, but the site runs on eventdream.in | `kanavuconnect.com` (metadata base URL) | `src/content/site.ts` |
| 8 | Second phone number | +91 72008 99709 appears **only** on the contact page | Shown on Contact and in the footer | `src/content/site.ts` |
| 9 | Audience size | "250+ participants per event" vs. "250+ influential and emerging ecosystem members per dinner" | "250+" | — |

## Not published on the reference site (intentionally left out)

- Sponsorship prices, amounts and slot counts. The site says these are shared on request
- Event dates, timings and venues for each hub. Each hub has one **development placeholder** event (*[Hub] Regional Networking Dinner*) in `src/content/events.ts`, showing "Date to be announced" and "Venue to be confirmed". No completed events are listed
- Organiser, team and guest names
- Registration fees and eligibility. The site treats registration as an expression of interest
- Physical address, office hours and social media links
- Past event results, press coverage and testimonials

## Placeholders to replace

- **Photography:** every image is representative Unsplash stock (`src/content/media.ts`). Replace it with official event photography.
- **Logo:** the supplied medallion (`InShot_20261102_183053830.jpg.jpeg`) has been cut out as a transparent circle at `public/brand/kanavu-connect-logo.png`, plus the favicon (`src/app/icon.png`) and Apple touch icon (`src/app/apple-icon.png`). A vector (SVG) or high-resolution transparent PNG from the designer would be sharper.
- **Forms:** frontend only. `submitEnquiry()` in `src/components/forms/EnquiryForm.tsx` simulates success and offers a pre-filled email. Connect it to an API route or Server Action.
- **"Kanavu means dream":** the About headline relies on the Tamil meaning of கனவு. Confirm the brand is happy with this framing.

/**
 * Core business information for Kanavu Connect.
 * Source: https://eventdream.in (index, about, contact pages).
 * Items marked VERIFY are listed in CONTENT-VERIFICATION.md.
 */

export type NavItem = { label: string; href: string };

export const site = {
  name: "Kanavu Connect",
  shortName: "Kanavu",
  /** Footer / contact page tagline. The About page uses "Connect, Start, Grow" (VERIFY). */
  tagline: "Connect · Collaborate · Start · Grow",
  description:
    "A premium business networking dinner series bringing together business owners, founders, investors, mentors, startups, bankers, government representatives and media across eight regions of Tamil Nadu and Puducherry.",
  positioning: "Tamil Nadu's most inclusive entrepreneurial ecosystem",
  email: "contact@kanavuconnect.com",
  phones: [
    { display: "+91 73970 95609", href: "tel:+917397095609", whatsapp: "https://wa.me/917397095609" },
    // VERIFY: second number appears only on the reference contact page.
    { display: "+91 72008 99709", href: "tel:+917200899709", whatsapp: "https://wa.me/917200899709" },
  ],
  /** VERIFY: brand domain vs. eventdream.in reference domain. */
  website: "kanavuconnect.com",
  url: "https://kanavuconnect.com",
} as const;

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Regions", href: "/regions" },
  { label: "Sponsorship", href: "/sponsorship" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export type Stat = { value: number; suffix?: string; label: string };

export const impactStats: Stat[] = [
  { value: 8, label: "Regional hubs" },
  { value: 38, label: "Districts reached" },
  { value: 250, suffix: "+", label: "Curated participants per event" },
  { value: 5, label: "Hours of curated networking" },
];

export const ambition = {
  value: "100,000+",
  label: "Entrepreneurs across Tamil Nadu",
  timeframe: "Target by 2027",
};

export const aboutIntro = {
  summary:
    "Kanavu Connect links established business leaders with emerging entrepreneurs — especially first-generation, rural, women and young founders from Tier-2, Tier-3 and Tier-4 regions.",
  pillars: [
    {
      title: "Meaningful connections",
      body: "Curated rooms where owners, founders, investors and mentors meet the entrepreneurs who will shape their regions next.",
    },
    {
      title: "Regional reach",
      body: "Eight regional hubs spanning Tamil Nadu and Puducherry, bringing the network to districts, towns and taluks — not just the capital.",
    },
    {
      title: "Real outcomes",
      body: "Introductions designed to continue after the evening ends: mentorship, funding access, partnerships and new markets.",
    },
  ],
};

export const vision = [
  "Build Tamil Nadu's most inclusive entrepreneurial ecosystem.",
  "Serve people from Tier-2, Tier-3, Tier-4 and rural communities.",
  "Enable people to dream, start, connect and grow.",
];

export const mission = [
  "Connect first-generation, rural, women and young entrepreneurs with business owners, founders, investors, mentors, startups, banks, government institutions, incubators, associations, media and ecosystem partners.",
  "Provide connections, mentorship, funding access and market opportunities.",
];

export const enquiryTypes = [
  {
    value: "general",
    label: "General enquiry",
    description: "Event information and registration support.",
    subject: "General Enquiry - Kanavu Connect",
  },
  {
    value: "sponsorship",
    label: "Sponsorship enquiry",
    description: "Brands interested in sponsorship and promotional opportunities.",
    subject: "Sponsorship Enquiry - Kanavu Connect",
  },
  {
    value: "partnership",
    label: "Partnership enquiry",
    description: "Associations, incubators, banks, government organisations, media and ecosystem partners.",
    subject: "Partnership Enquiry - Kanavu Connect",
  },
  {
    value: "exhibitor",
    label: "Exhibitor enquiry",
    description: "Businesses and startups showcasing products, services or brands.",
    subject: "Exhibitor Enquiry - Kanavu Connect",
  },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

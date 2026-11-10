/**
 * Sponsorship. Source: https://eventdream.in/sponsorship.html
 * The reference site publishes no prices, amounts or slot counts — none are shown.
 */

export type BenefitGroup = { title: string; items: string[] };

export type Tier = {
  slug: string;
  name: string;
  rank: string;
  positioning: string;
  groups: BenefitGroup[];
};

export const tiers: Tier[] = [
  {
    slug: "title",
    name: "Title Sponsor",
    rank: "I",
    positioning:
      "Brand integrated into the event name, with category exclusivity and premium positioning across all eight regional events.",
    groups: [
      { title: "Brand identity", items: ["Largest sponsor logo across major communications"] },
      {
        title: "Media & promotion",
        items: [
          "Optional TV coverage (subject to media plan)",
          "OTT and digital campaigns",
          "Newspaper ads and PR",
          "Radio mentions",
          "Press conference and release branding",
          "Influencer and social campaigns",
          "Promotional video and teaser branding",
        ],
      },
      {
        title: "Outdoor",
        items: [
          "Premium logo on 200+ proposed outdoor banners",
          "1,000 posters per region",
          "Regional materials",
          "Welcome and directional banners",
          "Selected city or venue branding",
        ],
      },
      {
        title: "Venue",
        items: [
          "Main stage and LED wall",
          "Entrance arch",
          "Registration and networking zones",
          "Photo booth and selfie point",
          "Interview backdrop",
          "Standees and table branding",
        ],
      },
      {
        title: "Delegate experience",
        items: [
          "Welcome kit",
          "Delegate badges and lanyards",
          "Registration materials",
          "Programme and brochure",
          "Return gift and photo frame branding",
        ],
      },
      {
        title: "Business access",
        items: [
          "Premium exhibition space",
          "VIP passes and front-row seating",
          "Brand speaking opportunity",
          "Curated B2B introductions",
          "Networking dinner access",
        ],
      },
      {
        title: "Content & digital",
        items: [
          "Dedicated sponsor announcement and brand feature",
          "Founder or CEO interview",
          "Collaborative reels and social tags",
          "Highlight video branding",
          "Post-event thank-you campaign",
        ],
      },
      {
        title: "CSR",
        items: [
          "Association with 300 tree plantings per event",
          "Title-level CSR visibility",
          "Plantation campaign branding",
        ],
      },
    ],
  },
  {
    slug: "powered-by",
    name: "Powered By Sponsor",
    rank: "II",
    positioning: "Positioned immediately after the Title Sponsor.",
    groups: [
      {
        title: "Visibility",
        items: [
          "Logo on major event creatives",
          "Stage and LED wall",
          "Entrance and registration zone",
          "Photo booth and interview backdrop",
          "Welcome kit and return gift",
        ],
      },
      {
        title: "Media & outdoor",
        items: [
          "Selected outdoor banners and posters",
          "Newspaper and PR mentions where applicable",
          "Radio and digital mentions",
          "Social and reel branding",
        ],
      },
      {
        title: "Business access",
        items: [
          "Premium exhibition space",
          "VIP passes and seating",
          "Selected speaking or brand presentation opportunity",
          "Curated B2B networking and dinner access",
        ],
      },
      { title: "CSR", items: ["CSR and tree plantation campaign association"] },
    ],
  },
  {
    slug: "platinum",
    name: "Platinum Sponsor",
    rank: "III",
    positioning: "High-impact regional and venue visibility.",
    groups: [
      {
        title: "Visibility",
        items: [
          "Logo on key digital creatives",
          "Selected outdoor banners and posters",
          "Main stage sponsor panel",
          "LED wall rotations",
          "Entrance and venue branding",
          "Registration, photo booth, interview backdrop and welcome kit logo",
        ],
      },
      {
        title: "Business access",
        items: ["Premium stall or display space", "VIP passes", "Stage acknowledgement", "Networking dinner and B2B access"],
      },
      {
        title: "Digital & CSR",
        items: ["Social media sponsor announcement", "Tree plantation initiative branding"],
      },
    ],
  },
  {
    slug: "diamond",
    name: "Diamond Sponsor",
    rank: "IV",
    positioning: "Strong event and digital presence.",
    groups: [
      {
        title: "Visibility",
        items: [
          "Logo on sponsor creatives",
          "Selected banners and posters",
          "Stage sponsor panel and LED rotation",
          "Venue branding at selected locations",
          "Photo booth and interview backdrop logo",
          "Welcome kit logo",
        ],
      },
      {
        title: "Business access",
        items: ["Standard exhibition space", "VIP or delegate passes", "Stage acknowledgement", "Networking dinner access"],
      },
      {
        title: "Digital & CSR",
        items: ["Social media mentions and selected reel visibility", "Tree plantation acknowledgement"],
      },
    ],
  },
  {
    slug: "gold",
    name: "Gold Sponsor",
    rank: "V",
    positioning: "Regional business visibility.",
    groups: [
      {
        title: "Visibility",
        items: [
          "Logo on selected event creatives",
          "Selected poster and banner branding",
          "Stage sponsor panel logo and LED rotation",
          "Selected venue branding",
          "Photo or interview backdrop logo",
          "Welcome kit branding",
        ],
      },
      {
        title: "Business access",
        items: ["Exhibition or product display opportunity", "Delegate passes", "Networking access"],
      },
      { title: "Digital & CSR", items: ["Social media sponsor mention", "CSR acknowledgement"] },
    ],
  },
  {
    slug: "silver",
    name: "Silver Sponsor",
    rank: "VI",
    positioning: "Focused event visibility.",
    groups: [
      {
        title: "Visibility",
        items: [
          "Logo on sponsor panel and selected digital creatives",
          "LED sponsor rotation",
          "Selected venue and poster visibility",
          "Media or photo backdrop logo",
          "Welcome kit logo",
        ],
      },
      { title: "Business access", items: ["Delegate passes", "Networking access"] },
      { title: "Digital & CSR", items: ["Social media acknowledgement", "CSR acknowledgement"] },
    ],
  },
  {
    slug: "bronze",
    name: "Bronze Sponsor",
    rank: "VII",
    positioning: "An accessible entry-level partnership.",
    groups: [
      {
        title: "Visibility",
        items: [
          "Logo on sponsor acknowledgement creatives",
          "Sponsor panel branding",
          "LED sponsor rotation",
          "Selected venue and digital visibility",
          "Media or photo backdrop logo",
        ],
      },
      { title: "Business access", items: ["Delegate passes", "Networking access"] },
      { title: "Digital & CSR", items: ["Social media acknowledgement", "Event and CSR acknowledgement"] },
    ],
  },
];

export const tierShortNames = ["Title", "Powered By", "Platinum", "Diamond", "Gold", "Silver", "Bronze"] as const;

/**
 * Comparison matrix exactly as published.
 * VERIFY: "VIP passes & seating" is ticked for every tier, while Gold, Silver
 * and Bronze tier descriptions specify delegate passes.
 */
export const comparison: { benefit: string; included: boolean[] }[] = [
  { benefit: "Stage & LED branding", included: [true, true, true, true, true, true, true] },
  { benefit: "Speaking opportunity", included: [true, true, false, false, false, false, false] },
  { benefit: "Mass media (TV / OTT / PR)", included: [true, true, false, false, false, false, false] },
  { benefit: "Outdoor & poster campaign", included: [true, true, true, false, false, false, false] },
  { benefit: "Exhibition / display space", included: [true, true, true, true, true, false, false] },
  { benefit: "VIP passes & seating", included: [true, true, true, true, true, true, true] },
  { benefit: "Networking dinner access", included: [true, true, true, true, true, true, true] },
  { benefit: "CSR / tree plantation tag", included: [true, true, true, true, true, true, true] },
];

export const categoryPartnerships = [
  "Banking",
  "Investment",
  "Insurance",
  "Automobile",
  "Technology",
  "Telecom",
  "Hospitality",
  "Travel",
  "Knowledge",
  "Incubation",
  "Gifting",
  "Food & Beverage",
  "Networking Dinner",
  "Registration",
  "Welcome Kit",
  "Green / Sustainability",
  "Media",
  "Radio",
  "Digital",
  "Mobility",
];

export const whyPartner = [
  {
    title: "Reach",
    body: "Eight regional markets: Kanyakumari, Madurai, Trichy, Coimbatore, Salem, Thiruvannamalai, Chennai and Puducherry.",
  },
  { title: "Market access", body: "Visibility in Tier-2 to Tier-4 towns and rural entrepreneurial communities." },
  {
    title: "Decision-makers",
    body: "Access to business owners, founders, investors, bankers, government representatives and ecosystem leaders.",
  },
  {
    title: "360° visibility",
    body: "Outdoor, print, radio, digital, PR, influencers, venue, content, networking and CSR.",
  },
  {
    title: "Business outcomes",
    body: "Lead generation, dealer and distributor connections, B2B meetings, partnerships and regional expansion.",
  },
];

export const reachStats = [
  { value: "8", label: "Regional events" },
  { value: "200+", label: "Proposed outdoor banners" },
  { value: "1,000", label: "Posters per region" },
];

export const greenInitiative = {
  title: "Green Entrepreneurship Initiative",
  summary:
    "Every regional event is planned with a tree plantation drive — giving participating brands a lasting sustainability and CSR association.",
  stats: [
    { value: 300, label: "Trees per regional event" },
    { value: 2400, label: "Trees across all eight events" },
  ],
};

export const sponsorshipTerms = [
  "Title Sponsor includes category exclusivity.",
  "Category partnerships are customised, with exclusivity based on the partner's objectives.",
  "TV coverage for the Title Sponsor is optional and subject to the media plan.",
  "Newspaper and PR mentions for Powered By are provided where applicable.",
];

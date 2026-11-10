/**
 * Regional hubs. Source: https://eventdream.in/locations.html
 * No venues or dates are published for any hub.
 *
 * VERIFY: per-hub counts sum to 39 against a stated total of 38 —
 * Kallakurichi appears under both Salem and Thiruvannamalai.
 */

export type Region = {
  slug: string;
  name: string;
  /** District count as stated on the reference site; null where none is stated. */
  statedCount: number | null;
  districts: string[];
  note?: string;
  /** Schematic position (0–100) derived from approximate lat/long. Not to scale. */
  position: { x: number; y: number };
};

export const regions: Region[] = [
  {
    slug: "chennai",
    name: "Chennai",
    statedCount: 5,
    districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Chengalpattu", "Ranipet"],
    position: { x: 88, y: 9 },
  },
  {
    slug: "thiruvannamalai",
    name: "Thiruvannamalai",
    statedCount: null,
    districts: ["Tiruvannamalai", "Vellore", "Tirupattur", "Viluppuram", "Cuddalore", "Kallakurichi"],
    note: "No district count is stated for this hub on the reference site.",
    position: { x: 62, y: 23 },
  },
  {
    slug: "puducherry",
    name: "Puducherry",
    statedCount: null,
    districts: ["Puducherry"],
    note: "Union Territory, together with nearby Tamil Nadu business communities.",
    position: { x: 79, y: 29 },
  },
  {
    slug: "salem",
    name: "Salem",
    statedCount: 6,
    districts: ["Salem", "Dharmapuri", "Namakkal", "Krishnagiri", "Karur", "Kallakurichi"],
    position: { x: 42, y: 32 },
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    statedCount: 4,
    districts: ["Coimbatore", "Tiruppur", "Erode", "The Nilgiris"],
    position: { x: 16, y: 43 },
  },
  {
    slug: "trichy",
    name: "Trichy",
    statedCount: 8,
    districts: [
      "Tiruchirappalli",
      "Ariyalur",
      "Perambalur",
      "Pudukkottai",
      "Thanjavur",
      "Mayiladuthurai",
      "Tiruvarur",
      "Nagapattinam",
    ],
    position: { x: 55, y: 47 },
  },
  {
    slug: "madurai",
    name: "Madurai",
    statedCount: 6,
    districts: ["Madurai", "Dindigul", "Sivagangai", "Ramanathapuram", "Virudhunagar", "Theni"],
    position: { x: 42, y: 62 },
  },
  {
    slug: "kanyakumari",
    name: "Kanyakumari",
    statedCount: 4,
    districts: ["Kanniyakumari", "Thoothukudi", "Tirunelveli", "Tenkasi"],
    position: { x: 29, y: 92 },
  },
];

/** Order used by the reference site (south to north). */
export const regionDisplayOrder = [
  "kanyakumari",
  "madurai",
  "trichy",
  "coimbatore",
  "salem",
  "thiruvannamalai",
  "chennai",
  "puducherry",
];

export const orderedRegions: Region[] = regionDisplayOrder
  .map((slug) => regions.find((r) => r.slug === slug))
  .filter((r): r is Region => Boolean(r));

export const regionStats = {
  hubs: 8,
  districts: 38,
  participantsPerEvent: "250+",
  coverage: "Districts, cities, towns and taluks across Tamil Nadu and Puducherry",
};

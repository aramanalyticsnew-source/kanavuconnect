/**
 * Regional hubs. Source: https://eventdream.in/locations.html
 * No venues or dates are published for any hub.
 *
 * VERIFY: per-hub counts sum to 39 against a stated total of 38 —
 * Kallakurichi appears under both Salem and Thiruvannamalai.
 */

/** Canonical hub identifiers. Every event references exactly one of these. */
export const regionIds = [
  "kanyakumari",
  "madurai",
  "trichy",
  "coimbatore",
  "salem",
  "thiruvannamalai",
  "chennai",
  "puducherry",
] as const;

export type RegionId = (typeof regionIds)[number];

export function isRegionId(value: unknown): value is RegionId {
  return typeof value === "string" && (regionIds as readonly string[]).includes(value);
}

export type Region = {
  /** Hub identifier (also used in URLs, e.g. /regions?hub=madurai). */
  slug: RegionId;
  name: string;
  /** District count as stated on the reference site; null where none is stated. */
  statedCount: number | null;
  districts: string[];
  note?: string;
  /** Schematic position used by decorative homepage illustrations. */
  position: { x: number; y: number };
  /** OSM city/town center from Nominatim search results. */
  coordinates: { lat: number; lng: number };
};

// City and town center coordinates verified via OpenStreetMap Nominatim:
// https://nominatim.openstreetmap.org/ui/search.html
// OSM objects: Chennai relation/1766358; Tiruvannamalai way/84649892;
// Puducherry node/245600130; Salem node/3780703409; Coimbatore node/245589078;
// Tiruchirappalli relation/10318360; Madurai relation/11268397; Kanyakumari node/353039871.
export const regions: Region[] = [
  {
    slug: "chennai",
    name: "Chennai",
    statedCount: 5,
    districts: ["Chennai", "Kanchipuram", "Tiruvallur", "Chengalpattu", "Ranipet"],
    position: { x: 88, y: 9 },
    coordinates: { lat: 13.0800915, lng: 80.2807978 },
  },
  {
    slug: "thiruvannamalai",
    name: "Thiruvannamalai",
    statedCount: null,
    districts: ["Tiruvannamalai", "Vellore", "Tirupattur", "Viluppuram", "Cuddalore", "Kallakurichi"],
    note: "No district count is stated for this hub on the reference site.",
    position: { x: 62, y: 23 },
    coordinates: { lat: 12.2343228, lng: 79.0761989 },
  },
  {
    slug: "puducherry",
    name: "Puducherry",
    statedCount: null,
    districts: ["Puducherry"],
    note: "Union Territory, together with nearby Tamil Nadu business communities.",
    position: { x: 79, y: 29 },
    coordinates: { lat: 11.9340568, lng: 79.8306447 },
  },
  {
    slug: "salem",
    name: "Salem",
    statedCount: 6,
    districts: ["Salem", "Dharmapuri", "Namakkal", "Krishnagiri", "Karur", "Kallakurichi"],
    position: { x: 42, y: 32 },
    coordinates: { lat: 11.6551982, lng: 78.1581771 },
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    statedCount: 4,
    districts: ["Coimbatore", "Tiruppur", "Erode", "The Nilgiris"],
    position: { x: 16, y: 43 },
    coordinates: { lat: 11.0018115, lng: 76.9628425 },
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
    coordinates: { lat: 10.8071144, lng: 78.6880939 },
  },
  {
    slug: "madurai",
    name: "Madurai",
    statedCount: 6,
    districts: ["Madurai", "Dindigul", "Sivagangai", "Ramanathapuram", "Virudhunagar", "Theni"],
    position: { x: 42, y: 62 },
    coordinates: { lat: 9.9261153, lng: 78.1140983 },
  },
  {
    slug: "kanyakumari",
    name: "Kanyakumari",
    statedCount: 4,
    districts: ["Kanniyakumari", "Thoothukudi", "Tirunelveli", "Tenkasi"],
    position: { x: 29, y: 92 },
    coordinates: { lat: 8.079252, lng: 77.5499338 },
  },
];

/** Order used by the reference site (south to north). */
export const regionDisplayOrder: RegionId[] = [
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

export function getRegion(id: string | null | undefined): Region | undefined {
  return isRegionId(id) ? regions.find((r) => r.slug === id) : undefined;
}

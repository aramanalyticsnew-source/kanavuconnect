/**
 * Event format. Source: https://eventdream.in/about.html
 * The reference homepage condenses this into four stages; the About page
 * lists seven. The seven-stage version is used here (VERIFY).
 * No timings are published, so none are shown.
 */

export type Stage = { number: string; title: string; summary: string; detail: string };

export const eventFormat = {
  duration: "Approx. 5-hour evening",
  attendance: "250+ influential and emerging ecosystem members",
};

export const stages: Stage[] = [
  {
    number: "01",
    title: "Welcome & Registration",
    summary: "Guest reception, introductions and networking.",
    detail:
      "Guests are received, registered and introduced — the first conversations of the evening begin on arrival.",
  },
  {
    number: "02",
    title: "Opening Ceremony",
    summary: "The vision of Kanavu Connect and regional opportunity.",
    detail:
      "An introduction to Kanavu Connect, its vision, and the entrepreneurship opportunities within the region.",
  },
  {
    number: "03",
    title: "Chief Guest & Special Guest Session",
    summary: "Keynotes from ministers, officials and business leaders.",
    detail:
      "Keynotes and insights from ministers, government representatives and business leaders.",
  },
  {
    number: "04",
    title: "Founder & Business Connect",
    summary: "Established owners meet emerging entrepreneurs.",
    detail:
      "Curated interaction between established business owners, founders and emerging entrepreneurs.",
  },
  {
    number: "05",
    title: "Investor & Startup Connect",
    summary: "Startups meet investors, mentors and institutions.",
    detail:
      "Startups and entrepreneurs are connected with investors, mentors, incubators and financial institutions.",
  },
  {
    number: "06",
    title: "Business Networking & Matchmaking",
    summary: "Focused B2B introductions and partnerships.",
    detail:
      "Focused B2B introductions, collaborations, partnerships and market connections.",
  },
  {
    number: "07",
    title: "Networking Dinner",
    summary: "An exclusive dinner across the ecosystem.",
    detail: "The evening closes with an exclusive dinner for building relationships across the ecosystem.",
  },
];

export type Audience = { title: string; members: string[] };

export const audiences: Audience[] = [
  {
    title: "Entrepreneurs",
    members: ["First-generation", "Rural", "Women", "Young", "Aspiring entrepreneurs"],
  },
  {
    title: "Business Leaders",
    members: ["Business owners", "Founders", "CEOs & CXOs", "MSME operators", "Manufacturers", "Family businesses"],
  },
  {
    title: "Startup Ecosystem",
    members: ["Startups", "Angel investors, VCs & HNIs", "Mentors", "Incubators", "Accelerators"],
  },
  {
    title: "Finance & Government",
    members: ["Bankers", "Financial institutions", "Government representatives", "Government agencies"],
  },
  {
    title: "Business Networks",
    members: ["Associations", "Chambers", "Professional & community networks", "Ecosystem partners"],
  },
  {
    title: "Media & Influence",
    members: ["Influencers", "Content creators", "Journalists", "Digital & business media"],
  },
];

export const guestTiers = [
  {
    title: "Chief Guests",
    description: "Ministers, senior government officials, leading industrialists and prominent business leaders.",
  },
  {
    title: "Special Guests",
    description:
      "Top business owners, successful founders, investors, HNIs, industry leaders, mentors, association leaders and influential personalities.",
  },
  {
    title: "Networking Floor",
    description:
      "Business owners, founders, investors, mentors, entrepreneurs, startups, bankers, government representatives, incubators, business associations, industry experts, influencers and media.",
  },
];

export const networkingOpportunities = [
  { title: "Guest reception & introductions", body: "Warm introductions from the moment guests arrive." },
  { title: "Founder & business connect", body: "Established owners and founders meet emerging entrepreneurs." },
  { title: "Investor & startup connect", body: "Startups meet investors, mentors, incubators and lenders." },
  { title: "Focused B2B matchmaking", body: "Introductions built around collaborations and market access." },
  { title: "Networking dinner", body: "Relationships deepened over an exclusive evening dinner." },
];

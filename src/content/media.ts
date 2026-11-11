/**
 * Imagery.
 * The reference site publishes no event photography. Every image below is
 * REPRESENTATIVE stock photography (Unsplash licence) and must be replaced
 * with official Kanavu Connect photography before launch. Captions describe
 * the kind of moment shown, never a specific past event.
 */

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  hero: unsplash("photo-1511578314322-379afb476865", 2000),
  dinner: unsplash("photo-1519167758481-83f550bb49b3"),
  keynote: unsplash("photo-1540575467063-178a50c2df87"),
  networking: unsplash("photo-1515187029135-18ee286d815b"),
  meeting: unsplash("photo-1556761175-5973dc0f32e7"),
  stage: unsplash("photo-1475721027785-f74eccf877e2"),
  hall: unsplash("photo-1505373877841-8d25f7d46678"),
  toast: unsplash("photo-1528605248644-14dd04022da1"),
  presentation: unsplash("photo-1542744173-8e7e53415bb0"),
  team: unsplash("photo-1552664730-d307ca884978"),
  forest: unsplash("photo-1441974231531-c6227db76b6e"),
  saplings: unsplash("photo-1502082553048-f009c37129b9"),
} as const;

export type GalleryCategory = "Keynotes" | "Networking" | "Dinner" | "Venue";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Layout hint for the editorial grid. */
  span?: "tall" | "wide";
};

export const galleryCategories: GalleryCategory[] = ["Keynotes", "Networking", "Dinner", "Venue"];

export const gallery: GalleryItem[] = [
  { src: images.keynote, alt: "Audience seated facing a conference stage", caption: "Guest keynote session", category: "Keynotes", span: "wide" },
  { src: images.networking, alt: "Professionals in conversation at a networking event", caption: "Founder & business connect", category: "Networking", span: "tall" },
  { src: images.dinner, alt: "Elegantly laid banquet tables in a lit hall", caption: "Networking dinner setting", category: "Dinner" },
  { src: images.stage, alt: "Speaker presenting on a lit stage", caption: "Opening ceremony", category: "Keynotes" },
  { src: images.meeting, alt: "Small group discussion around a table", caption: "Investor & startup connect", category: "Networking" },
  { src: images.hall, alt: "Empty conference hall with rows of chairs", caption: "Venue preparation", category: "Venue", span: "tall" },
  { src: images.toast, alt: "Guests raising glasses in a toast", caption: "Evening dinner", category: "Dinner", span: "wide" },
  { src: images.presentation, alt: "Presenter addressing a seated group", caption: "Business matchmaking", category: "Networking" },
  { src: images.team, alt: "Colleagues collaborating around a table", caption: "B2B introductions", category: "Networking" },
];

export const mediaOpportunities = [
  { title: "Press conference & release", body: "Press conference and release branding for partner brands." },
  { title: "Founder & CEO interviews", body: "Interview backdrops and founder or CEO interview features." },
  { title: "Reels & social", body: "Collaborative reels, social tags and influencer campaigns." },
  { title: "Video", body: "Promotional video and teaser branding, and highlight video branding." },
];

/**
 * Official Kanavu Connect event photography (optimised copies of the
 * originals in public/Images, which is git-ignored). Captions describe what is shown only.
 */
export const aboutImages = {
  logoLaunch: {
    src: "/photos/about/logo-launch.jpg",
    alt: "Guests on stage unveiling the Kanavu Connect logo",
    width: 2400,
    height: 1600,
  },
  keynote: {
    src: "/photos/about/keynote.jpg",
    alt: "A speaker addressing guests in front of the Kanavu Connect logo",
    width: 1600,
    height: 1066,
  },
  openFloor: {
    src: "/photos/about/open-floor.jpg",
    alt: "An attendee speaking into a microphone during an open-floor session",
    width: 1800,
    height: 1200,
  },
  panel: {
    src: "/photos/about/panel-discussion.jpg",
    alt: "A moderator leading a panel discussion on stage",
    width: 1800,
    height: 1200,
  },
} as const;

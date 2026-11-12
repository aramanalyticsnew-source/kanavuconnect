/**
 * Imagery.
 * Event photography is official Kanavu Connect material: optimised copies of
 * the originals in public/Images (git-ignored) live in public/photos.
 * Captions and alt text describe only what each photo shows.
 * The forest image (Green Entrepreneurship Initiative) is stock (Unsplash licence).
 */

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  forest: unsplash("photo-1441974231531-c6227db76b6e"),
} as const;

export type Photo = { src: string; alt: string; width: number; height: number };

const event = (file: string, alt: string, width = 1800): Photo => ({
  src: `/photos/events/${file}`,
  alt,
  width,
  height: Math.round((width * 2) / 3),
});

/** Event photographs, keyed by what they show. */
export const eventPhotos = {
  sponsorWall: event("sponsor-wall-networking.jpg", "Guests talking in front of the partner backdrop", 2400),
  guestConversation: event("guest-conversation.jpg", "Two guests in conversation beside the dinner tables"),
  venueArrivals: event("venue-arrivals.jpg", "Guests arriving in the event hall with round dinner tables", 2400),
  welcomeHandshake: event("welcome-handshake.jpg", "Guests greeting each other with a handshake"),
  networkingCircle: event("networking-circle.jpg", "A small group networking beside a Kanavu Connect banner"),
  floorIntroductions: event("floor-introductions.jpg", "Guests being introduced on the event floor"),
  audienceAttentive: event("audience-attentive.jpg", "Guests seated and listening during a session"),
  audienceTables: event("audience-tables.jpg", "Guests seated at dinner tables during the programme"),
  lampLighting: event("lamp-lighting.jpg", "Guests lighting the traditional lamp at the opening"),
  audienceFrontRow: event("audience-front-row.jpg", "Front-row guests with photographers behind them"),
  stageAddress: event("stage-address.jpg", "A speaker addressing the room from the podium", 2400),
  stageGuests: event("stage-guests.jpg", "Guests seated on stage"),
  panelSeated: event("panel-seated.jpg", "Panel guests seated on stage"),
  panelSession: event("panel-session.jpg", "A speaker at the podium with the panel seated behind", 2400),
  recognitionGroup: event("recognition-group.jpg", "A guest receiving a memento on stage in front of the Kanavu Connect logo"),
  recognitionMemento: event("recognition-memento.jpg", "A memento being presented on stage in front of the Kanavu Connect logo"),
  guestsFrontRow: event("guests-front-row.jpg", "Guests seated in the front row"),
} as const;

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

export type GalleryCategory = "Stage" | "Networking" | "Audience" | "Moments";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Layout hint for the editorial grid. */
  span?: "tall" | "wide";
};

export const galleryCategories: GalleryCategory[] = ["Stage", "Networking", "Audience", "Moments"];

const item = (p: Photo | { src: string; alt: string }, caption: string, category: GalleryCategory, span?: GalleryItem["span"]): GalleryItem => ({
  src: p.src,
  alt: p.alt,
  caption,
  category,
  span,
});

/** Full event gallery (Media page). */
export const gallery: GalleryItem[] = [
  item(eventPhotos.lampLighting, "Lighting the lamp", "Moments", "wide"),
  item(eventPhotos.sponsorWall, "Conversations at the partner wall", "Networking"),
  item(eventPhotos.panelSession, "Panel session", "Stage", "tall"),
  item(eventPhotos.recognitionGroup, "On-stage recognition", "Moments"),
  item(eventPhotos.networkingCircle, "Networking", "Networking"),
  item(eventPhotos.audienceFrontRow, "The audience", "Audience", "wide"),
  item(eventPhotos.stageAddress, "Address from the podium", "Stage"),
  item(eventPhotos.guestConversation, "Guest conversations", "Networking"),
  item(eventPhotos.recognitionMemento, "Presenting a memento", "Moments", "tall"),
  item(eventPhotos.audienceTables, "At the tables", "Audience"),
  item(eventPhotos.welcomeHandshake, "A warm welcome", "Networking"),
  item(eventPhotos.panelSeated, "Panel guests", "Stage"),
  item(eventPhotos.venueArrivals, "Arrivals", "Moments", "wide"),
  item(eventPhotos.audienceAttentive, "Listening in", "Audience"),
  item(eventPhotos.floorIntroductions, "Introductions", "Networking"),
  item(eventPhotos.stageGuests, "Guests on stage", "Stage"),
  item(eventPhotos.guestsFrontRow, "Front row", "Audience"),
  item(aboutImages.logoLaunch, "Unveiling the logo", "Moments", "wide"),
  item(aboutImages.keynote, "Keynote", "Stage"),
  item(aboutImages.openFloor, "Open-floor conversations", "Audience"),
  item(aboutImages.panel, "Panel discussion", "Stage"),
];

export const mediaOpportunities = [
  { title: "Press conference & release", body: "Press conference and release branding for partner brands." },
  { title: "Founder & CEO interviews", body: "Interview backdrops and founder or CEO interview features." },
  { title: "Reels & social", body: "Collaborative reels, social tags and influencer campaigns." },
  { title: "Video", body: "Promotional video and teaser branding, and highlight video branding." },
];

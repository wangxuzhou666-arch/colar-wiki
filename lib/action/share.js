// Link-preview metadata shared by the site root and /action/. LinkedIn and
// other crawlers don't run JS, so the root page must carry the comic page's
// card itself rather than rely on its client-side redirect.
const TITLE = "Colar in Action — Curiosity. Unleashed.";
const DESCRIPTION =
  "Step into Colar’s world of study, products, cooking and everyday adventures.";
const IMAGE = {
  url: "/og/colar-in-action.jpg",
  width: 1200,
  height: 627,
  alt: "Comic-book card: Colar, in a caped superhero suit, swings past the title COLAR IN ACTION.",
};

export function shareMetadata(path) {
  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: path, images: [IMAGE] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE.url] },
  };
}

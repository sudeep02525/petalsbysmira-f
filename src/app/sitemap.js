export default function sitemap() {
  const base = "https://www.petalsbysmira.in";
  const pages = [
    "",
    "/editions",
    "/our-story",
    "/experience",
    "/corporate-gifting",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];
  return pages.map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}


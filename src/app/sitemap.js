export default async function sitemap() {
  const base = "https://www.petalsbysmira.in";
  const staticPages = [
    "",
    "/editions",
    "/our-story",
    "/experience",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];

  let products = [];
  const apiUrl = process.env.API_BASE_URL || "https://api.petalsbysmira.in";

  try {
    const res = await fetch(`${apiUrl}/products?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.products)) {
        products = data.products.filter((p) => Boolean(p.slug));
      }
    }
  } catch (err) {
    console.warn(`[sitemap] API unreachable (${apiUrl}) — products sitemap me nahi aayenge:`, err.message);
  }

  const staticEntries = staticPages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.8,
  }));

  const productEntries = products.map((p) => ({
    url: `${base}/editions/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}

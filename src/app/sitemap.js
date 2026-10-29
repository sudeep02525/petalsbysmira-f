export default async function sitemap() {
  const base = "https://www.petalsbysmira.in";
  const staticPages = [
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

  let productSlugs = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.petalsbysmira.in";
    const res = await fetch(`${apiUrl}/products?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.products)) {
        productSlugs = data.products.map((p) => `/editions/${p.slug}`);
      }
    }
  } catch (err) {
    console.error("Failed to fetch products for sitemap:", err);
  }

  const staticEntries = staticPages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.8,
  }));

  const productEntries = productSlugs.map((slug) => ({
    url: `${base}${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}

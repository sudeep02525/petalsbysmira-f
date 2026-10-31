export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private-access/", "/request-access"],
    },
    sitemap: "https://www.petalsbysmira.in/sitemap.xml",
  };
}

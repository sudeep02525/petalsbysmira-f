import PageRenderer from "../../components/PageRenderer";
import { getPage } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("experience");
  const rawTitle = page?.seo?.title || page?.title || "The Experience";
  const cleanTitle = rawTitle.replace(/\s*\|\s*Petals by Smira.*$/i, "").trim() || "The Experience";
  return {
    title: cleanTitle,
    description:
      page?.seo?.description ||
      page?.subtitle ||
      "Luxury, curated differently. Discover the Petals by Smira private access experience.",
    alternates: { canonical: "/experience" },
    openGraph: page?.seo?.ogImageUrl ? { images: [page.seo.ogImageUrl] } : undefined,
  };
}

export default async function ExperiencePage() {
  const page = await getPage("experience");
  return <PageRenderer page={page} />;
}

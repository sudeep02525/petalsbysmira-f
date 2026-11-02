import PageRenderer from "../../components/PageRenderer";
import { getPage } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("our-story");
  return {
    title: page?.seo?.title || page?.title || "Our Story | Petals by Smira",
    description:
      page?.seo?.description ||
      page?.subtitle ||
      "The heritage, craftsmanship, and philosophy behind Petals by Smira's exclusive luxury collections.",
    alternates: { canonical: "/our-story" },
    openGraph: page?.seo?.ogImageUrl ? { images: [page.seo.ogImageUrl] } : undefined,
  };
}

export default async function OurStoryPage() {
  const page = await getPage("our-story");
  return <PageRenderer page={page} />;
}

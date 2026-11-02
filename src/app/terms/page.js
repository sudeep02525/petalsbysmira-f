import PageRenderer from "../../components/PageRenderer";
import { getPage } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("terms");
  return {
    title: page?.seo?.title || page?.title || "Terms of Service | Petals by Smira",
    description:
      page?.seo?.description ||
      page?.subtitle ||
      "Terms governing private access, commissions, acquisitions, and certificates of authenticity at Petals by Smira.",
    alternates: { canonical: "/terms" },
    openGraph: page?.seo?.ogImageUrl ? { images: [page.seo.ogImageUrl] } : undefined,
  };
}

export default async function TermsOfServicePage() {
  const page = await getPage("terms");
  return <PageRenderer page={page} />;
}

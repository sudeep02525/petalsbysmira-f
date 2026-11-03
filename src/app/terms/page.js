import PageRenderer from "../../components/PageRenderer";
import { getPage } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("terms");
  const rawTitle = page?.seo?.title || page?.title || "Terms of Service";
  const cleanTitle = rawTitle.replace(/\s*\|\s*Petals by Smira.*$/i, "").trim() || "Terms of Service";
  return {
    title: cleanTitle,
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

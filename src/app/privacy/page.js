import PageRenderer from "../../components/PageRenderer";
import { getPage } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("privacy");
  const rawTitle = page?.seo?.title || page?.title || "Privacy Policy";
  const cleanTitle = rawTitle.replace(/\s*\|\s*Petals by Smira.*$/i, "").trim() || "Privacy Policy";
  return {
    title: cleanTitle,
    description:
      page?.seo?.description ||
      page?.subtitle ||
      "Learn how Petals by Smira protects your personal data and confidentiality.",
    alternates: { canonical: "/privacy" },
    openGraph: page?.seo?.ogImageUrl ? { images: [page.seo.ogImageUrl] } : undefined,
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPage("privacy");
  return <PageRenderer page={page} />;
}

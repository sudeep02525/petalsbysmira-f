import PageRenderer from "../../components/PageRenderer";
import { getPage } from "../../lib/cms";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("privacy");
  return {
    title: page?.seo?.title || page?.title || "Privacy Policy | Petals by Smira",
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

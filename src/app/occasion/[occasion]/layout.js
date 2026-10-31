const pretty = (s = "") => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export async function generateMetadata({ params }) {
  const { occasion } = await params;
  const name = occasion === "all" ? "All Occasions" : pretty(occasion);
  return {
    title: `${name} Gifts`,
    description: `Luxury ${name.toLowerCase()} gifts curated by Petals by Smira — limited-edition jewellery, watches and bags.`,
    alternates: { canonical: `/occasion/${occasion}` },
  };
}

export default function OccasionLayout({ children }) {
  return children;
}


import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import PrivateAccessBanner from "../components/layout/PrivateAccessBanner";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://www.petalsbysmira.in"),
  title: {
    default: "Petals by Smira | Luxury Gifting",
    template: "%s | Petals by Smira",
  },
  description: "Curated with love. Made to impress. Premium luxury gifting for birthdays, anniversaries, festivals, weddings, and milestones.",
  icons: {
    icon: "/fabicon.png",
  },
  openGraph: {
    title: "Petals by Smira",
    description: "Curated with love. Made to impress.",
    url: "https://www.petalsbysmira.in",
    siteName: "Petals by Smira",
    images: ["/image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Petals by Smira",
    images: ["/image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} antialiased font-sans min-h-screen flex flex-col`}>
        <Providers>
          <PrivateAccessBanner />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

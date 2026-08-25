import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "Petals by Smira | Luxury Gifting",
  description: "Curated with love. Made to impress. Premium luxury gifting for birthdays, anniversaries, festivals, weddings, and milestones.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} antialiased font-sans min-h-screen flex flex-col`}>
        <Providers>
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

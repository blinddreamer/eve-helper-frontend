import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarMenu from "./components/NavbarMenu";
import Footer from "./components/Footer";
import Video from "./components/Video";
import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Status bar / browser chrome color. Dark is the site default; DarkModeToggle keeps it in sync.
export const viewport = {
  themeColor: "#1E1E1E",
};

export const metadata = {
  // Relative canonical/OG URLs in each page resolve against this
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://eve-helper.com"),
  title: "EVE Helper - Industry Calculator/Appraisal for EVE Online",
  description:
    "EVE Helper is an industrial calculator for EVE Online, helping with market appraisals, production costs, and profit calculations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" sizes="512x512" href="/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta
          property="og:image"
          content="https://eve-helper.com/social-preview.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="EVE Helper - Industrial Calculator for EVE Online"
        />
        <meta property="og:site_name" content="EVE Helper" />
        <meta property="og:locale" content="en_US" />
        <meta
          name="twitter:image"
          content="https://eve-helper.com/social-preview.png"
        />
        <meta
          name="keywords"
          content="EVE Online, industry calculator, reprocessing, market data, appraisal, profit calculator"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
                  const isDark = storedDarkMode ?? true;
                  document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
                  if (!isDark) document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffffff");
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* Statcounter analytics loads from CookieBanner, only after consent */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id="root">
          <div id="HukuBartopolos">
            <Video />
            <CookieBanner />
            <NavbarMenu />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

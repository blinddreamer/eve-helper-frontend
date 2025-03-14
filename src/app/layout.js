import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import NavbarMenu from "./components/NavbarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Video from "./components/Video";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EVE Helper - Industry Calculator/Appraisal for EVE Online",
  description:
    "EVE Helper is an industrial calculator for EVE Online, helping with market appraisals, production costs, and profit calculations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://eve-helper.com" />
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
        <meta name="theme-color" content="#ffffff" />
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
        <meta property="og:url" content="https://eve-helper.com" />
        <meta property="og:site_name" content="EVE Helper" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content="2023-10-01T12:00:00Z" />
        <meta
          name="twitter:image"
          content="https://eve-helper.com/social-preview.png"
        />
        <meta name="twitter:url" content="https://eve-helper.com" />
        <meta name="twitter:site" content="@YourWebsiteHandle" />
        <meta name="twitter:creator" content="@YourPersonalHandle" />
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
                  const isDark = storedDarkMode ?? false;
                  document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script
          id="site-behaviour-tracking"
          strategy="lazyOnload" // Loads after page is interactive
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var sbSiteSecret = "cc3cae2c-f2b1-4bec-8bdd-45a71fb70bf8";
                window.sitebehaviourTrackingSecret = sbSiteSecret;
                var scriptElement = document.createElement("script");
                scriptElement.async = true;
                scriptElement.id = "site-behaviour-script-v2";
                scriptElement.src =
                  "https://sitebehaviour-cdn.fra1.cdn.digitaloceanspaces.com/index.min.js?sitebehaviour-secret=" +
                  sbSiteSecret;
                document.head.appendChild(scriptElement);
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id="root">
          <div id="HukuBartopolos">
            <Video />
            <NavbarMenu />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

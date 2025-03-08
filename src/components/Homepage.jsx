import { React, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Animated from "./Animated";
import { Helmet } from "react-helmet-async";

function Homepage() {
  return (
    <>
      <Helmet>
        {/* Open Graph Meta Tags (For Social Media Previews) */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="EVE Helper - Industry Calculator/Appraisal"
        />
        <meta
          property="og:description"
          content="EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators."
        />
        {/* Open Graph Meta Tags (For Social Media Previews) */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="EVE Helper - Industry Calculator/Appraisal"
        />
        <meta
          property="og:description"
          content="EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators."
        />
        <meta property="og:image" content="/social-preview.png" />
        <meta property="og:url" content="https://eve-helper.com" />

        {/* Twitter Card Meta Tags (For Twitter Previews) */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EVE Helper - Industry Calculator/Appraisal"
        />
        <meta
          name="twitter:description"
          content="EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators."
        />
        <meta name="twitter:image" content="/social-preview.png" />
        {/* Favicon & App Icons */}
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

        {/* Title & Meta Description */}
        <title>EVE Helper - Industry Calculator/Appraisal for EVE Online</title>
        <meta
          name="description"
          content="EVE Helper is an industrial calculator for EVE Online, helping with market appraisals, production costs, and profit calculations."
        />
        <meta
          name="keywords"
          content="EVE Online, industry calculator, reprocessing, market data, appraisal, profit calculator"
        />
      </Helmet>
      <Animated>
        <div id="homebox">
          <div>
            <Alert variant="danger">UNDER CONSTRUCTION</Alert>
          </div>
          <main style={{ lineHeight: "1.6" }}>
            {" "}
            {/* Adjust line height for readability */}
            <div>
              eve-helper is an industrial calculator aiming to help with your
              industrial costs.
              <br />
              Whether you're a seasoned industrialist or just starting out,{" "}
              eve-helper provides comprehensive tools and features to streamline
              your industrial operations in EVE.
              <br />
              With eve-helper, you can calculate material requirements,
              production costs, profit margins, and more for a wide range of
              industrial activities.
              <br />
              Our user-friendly interface and customizable settings make it easy
              to optimize your industry and maximize your profits.
            </div>
          </main>
        </div>
      </Animated>
    </>
  );
}
export default Homepage;

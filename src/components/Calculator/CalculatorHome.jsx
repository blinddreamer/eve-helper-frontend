import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Body from "./CalculatorBody.jsx";

function CalculatorHome() {
  const [advancedMode, setAdvancedMode] = useState(false);
  useEffect(() => {
    document.title = "EVE Helper - Industry Calculator";
  });
  return (
    <>
       <Helmet>
          <meta property="og:title"content="EVE Helper - Industry Calculator/Appraisal"/>
          <meta property="og:description" content="EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators." />
          <meta
      property="og:image"
      content="https://eve-helper.com/social-preview.png"
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
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="EVE Helper - Industry Calculator/Appraisal"
    />
    <meta
      name="twitter:description"
      content="EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators."
    />
    <meta
      name="twitter:image"
      content="https://eve-helper.com/social-preview.png"
    />
    <meta name="twitter:url" content="https://eve-helper.com" />
    <meta name="twitter:site" content="@YourWebsiteHandle" />
    <meta name="twitter:creator" content="@YourPersonalHandle" />
      </Helmet>
      <div id="animateddiv">
        <Body advancedMode={advancedMode} setAdvancedMode={setAdvancedMode} />
      </div>
    </>
  );
}
export default CalculatorHome;

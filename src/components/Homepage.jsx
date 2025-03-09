import { React} from "react";
import Alert from "react-bootstrap/Alert";
import Animated from "./Animated";
import { Helmet } from "react-helmet-async";

function Homepage() {
  return (
    <>
      <Animated>
      <Helmet>
          <title>EVE Helper - Industry Calculator/Appraisal for EVE Online</title>
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

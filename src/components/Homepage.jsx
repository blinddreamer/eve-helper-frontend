import { React, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Animated from "./Animated";
import { Helmet } from "react-helmet-async";

function Homepage() {
  return (
    <>
      <Helmet>
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

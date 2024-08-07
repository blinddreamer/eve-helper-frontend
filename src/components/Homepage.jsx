import { React, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Animated from "./Animated";

function Homepage() {
  useEffect(() => {
    document.title =
      "EVE Helper - Industry Calculator/Appraisal for EVE Online";
  });
  return (
    <>
      <Animated>
        <div>
          <div>
            <Alert variant="danger">UNDER CONSTRUCTION</Alert>
          </div>
          <main>
            <p>
              eve-helper is an advanced industrial calculator aiming to help
              with your industrial costs.
            </p>
            <p>
              Whether you're a seasoned industrialist or just starting out,{" "}
              eve-helper provides comprehensive tools and features to streamline
              your industrial operations in EVE.
            </p>
            <p>
              With eve-helper, you can calculate material requirements,
              production costs, profit margins, and more for a wide range of
              industrial activities.{" "}
            </p>
            <p>
              Our user-friendly interface and customizable settings make it easy
              to optimize your industry and maximize your profits.
            </p>
          </main>
        </div>
      </Animated>
    </>
  );
}
export default Homepage;

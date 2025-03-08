import { React, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Animated from "./Animated";

function Homepage() {
  return (
    <>
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

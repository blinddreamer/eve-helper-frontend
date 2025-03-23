// components/Homepage.js
import React from "react";
import Animated from "./Animated";

function Homepage() {
  return (
    <Animated>
      <div id="homebox">
        <main style={{ lineHeight: "1.6" }}>
          eve-helper is an industrial calculator aiming to help with your
          industrial costs.
          <br />
          Whether you're a seasoned industrialist or just starting out,
          eve-helper provides comprehensive tools and features to streamline
          your industrial operations in EVE.
          <br />
          With eve-helper, you can calculate material requirements, production
          costs, profit margins, and more for a wide range of industrial
          activities.
          <br />
          Our user-friendly interface and customizable settings make it easy to
          optimize your industry and maximize your profits.
        </main>
      </div>
    </Animated>
  );
}

export default Homepage;

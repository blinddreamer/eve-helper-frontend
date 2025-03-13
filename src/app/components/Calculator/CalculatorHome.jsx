"use client"
import {useState} from "react";
import Body from "./CalculatorBody.jsx";
import Animated from "../Animated.jsx";

function CalculatorHome() {
  const [advancedMode, setAdvancedMode] = useState(false);

  return (
      <div id="animateddiv">
        <Animated>
        <Body advancedMode={advancedMode} setAdvancedMode={setAdvancedMode} />
        </Animated>
      </div>

  );
}
export default CalculatorHome;

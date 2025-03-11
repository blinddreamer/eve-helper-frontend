import {useEffect, useState} from "react";
import Body from "./CalculatorBody.jsx";

function CalculatorHome() {
  const [advancedMode, setAdvancedMode] = useState(false);
  useEffect(() => {
    document.title = "EVE Helper - Industry Calculator";
  });
  return (
      <div id="animateddiv">
        <Body advancedMode={advancedMode} setAdvancedMode={setAdvancedMode} />
      </div>

  );
}
export default CalculatorHome;

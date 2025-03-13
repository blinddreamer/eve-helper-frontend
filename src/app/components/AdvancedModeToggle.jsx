import React from "react";
import Button from "react-bootstrap/Button";

function AdvancedModeToggle(props) {
  return (
    <Button
      variant="secondary"
      id="advmode"
      onClick={() => props.setAdvancedMode(!props.advancedMode)}
    >
      {props.advancedMode ? "Basic Mode" : "Advanced Mode"}
    </Button>
  );
}

export default AdvancedModeToggle;

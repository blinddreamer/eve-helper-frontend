import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import Alert from "react-bootstrap/Alert";
import React, { useRef } from "react";

function AppraisalForm(props) {
  const typeaheadRef = useRef(null);
  const handlePercentChange = (e) => {
    let value = parseFloat(e.target.value);

    // Ensure the value is within the allowed range
    if (isNaN(value)) return; // Ignore non-numeric values
    if (value < 0.25) value = 0.25;
    if (value > 200) value = 200;

    props.setPricePercentage(value); // Update the state
  };

  const handleSystemChange = (selected) => {
    if (selected.length > 0) {
      props.setSystem(selected[0]); // Update parent state (submission handles saving)
    } else {
      props.setSystem(""); // Clear selection properly
    }
  };

  const handleMarketChange = (e) => {
    props.setMarket(e.target.value);
  };
  return (
    <div id="appraisalform">
      <Form>
        {props.errorMessage && <Alert>{props.errorMessage}</Alert>}
        <div id="appraisalformtop">
          <div id="appraisalformleft">
            <div id="appraisalcontainer">
              <div id="appraisalformelements">Market Region:</div>
              <div id="appraisalformelements">
                <Form.Group controlId="marketRegion">
                  <Form.Select
                    key="appraisal-select"
                    aria-label="Default select example"
                    onChange={handleMarketChange}
                  >
                    {props.stations.map((station, index) => {
                      return (
                        <option
                          key={index}
                          selected={
                            station.regionId + "_" + station.stationId ===
                            props.market
                          }
                          value={station.regionId + "_" + station.stationId}
                        >
                          {station.regionName + " - " + station.stationName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div id="appraisalcontainer">
              <div id="appraisalformelements">Order type:</div>
              <div id="appraisalformelements">
                <Form.Group controlId="orderType">
                  <Form.Select
                    value={props.transactionType}
                    onChange={(e) => props.setTransactionType(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value={"BUY"}>BUY</option>
                    <option value={"SELL"}>SELL</option>
                    <option value={"SPLIT"}>SPLIT</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
          {/* <div id="appraisalformmid"></div> */}
          <div id="appraisalformright">
            <div id="appraisalcontainer">
              <div id="appraisalformelements">Price Percentage:</div>
              <div id="appraisalformelements">
                <Form.Group controlId="slider-price">
                  <Form.Control
                    type="number"
                    min={0.25}
                    max={200}
                    step={0.25}
                    value={props.pricePercentage}
                    onChange={handlePercentChange} // Update state when input changes
                  />
                </Form.Group>
              </div>
            </div>
            <div id="appraisalcontainer">
              <div id="appraisalformelements">Items system location:</div>
              <div id="appraisalformelements">
                <Form.Group id="bp_system_app" controlId="systemName">
                  <Typeahead
                    ref={typeaheadRef}
                    clearButton={true}
                    minLength={2}
                    selected={props.system ? [props.system] : []} // Use local state
                    onChange={handleSystemChange}
                    id="basic-behaviors-example"
                    options={props.optionsSys}
                    placeholder="Choose a system"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
export default AppraisalForm;

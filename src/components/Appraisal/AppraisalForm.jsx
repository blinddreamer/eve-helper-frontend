import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Alert from "react-bootstrap/Alert";
import Animated from "../Animated";
import { useRef } from "react";
import { Clipboard } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

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
    <Animated>
      <div id="appraisalform">
        <Form>
          {props.errorMessage && <Alert>{props.errorMessage}</Alert>}
          <div id="appraisalformtop">
            <div id="appraisalformleft">
              <div id="appraisalformelements">
                <Form.Group controlId="marketRegion">
                  <Form.Label>Market Region</Form.Label>
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
              <div id="appraisalformelements">
                <Form.Group controlId="orderType">
                  <Form.Label>Order type</Form.Label>
                  <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                      inline
                      type="radio"
                      label="Buy"
                      aria-label="radio 1"
                      value={"buy"}
                      id={`inline-radio-1`}
                      checked={props.transactionType === "buy"}
                      onChange={(e) => props.setTransactionType(e.target.value)}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Sell"
                      aria-label="radio 1"
                      value={"sell"}
                      id={`inline-radio-2`}
                      checked={props.transactionType === "sell"}
                      onChange={(e) => props.setTransactionType(e.target.value)}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Split"
                      aria-label="radio 1"
                      value={"split"}
                      id={`inline-radio-3`}
                      checked={props.transactionType === "split"}
                      onChange={(e) => props.setTransactionType(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <div id="buttonappraisalright">
                  <Button
                    disabled={!props.uuid}
                    onClick={props.handleCopy}
                    variant="secondary"
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy URL
                  </Button>
                </div>
              </div>
            </div>
            {/* <div id="appraisalformmid"></div> */}
            <div id="appraisalformright">
              <div id="appraisalformelements">
                <Form.Group controlId="slider-price">
                  <Form.Label>Price Percentage</Form.Label>
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
              <div id="appraisalformelements">
                <Form.Group id="bp_system_app" controlId="systemName">
                  <Form.Label>Items system location:</Form.Label>
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
        </Form>
      </div>
    </Animated>
  );
}
export default AppraisalForm;

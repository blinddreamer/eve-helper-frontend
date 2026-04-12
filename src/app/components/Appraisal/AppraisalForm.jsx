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
    if (isNaN(value)) return;
    if (value < 0.25) value = 0.25;
    if (value > 200) value = 200;
    props.setPricePercentage(value);
  };

  const handleSystemChange = (selected) => {
    props.setSystem(selected.length > 0 ? selected[0] : "");
  };

  return (
    <div className="appr-settings">
      {props.errorMessage && (
        <Alert variant="danger" className="mb-3">{props.errorMessage}</Alert>
      )}
      <div className="appr-settings-grid">
        <Form.Group className="calc-form-group" controlId="marketRegion">
          <Form.Label>Market Region</Form.Label>
          <Form.Select value={props.market} onChange={(e) => props.setMarket(e.target.value)}>
            {props.stations.map((station, index) => (
              <option key={index} value={station.regionId + "_" + station.stationId}>
                {station.regionName + " — " + station.stationName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="calc-form-group" controlId="orderType">
          <Form.Label>Order Type</Form.Label>
          <Form.Select value={props.transactionType} onChange={(e) => props.setTransactionType(e.target.value)}>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
            <option value="SPLIT">Split</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="calc-form-group" controlId="slider-price">
          <Form.Label>Price %</Form.Label>
          <Form.Control
            type="number" min={0.25} max={200} step={0.25}
            value={props.pricePercentage} onChange={handlePercentChange}
          />
        </Form.Group>

        <Form.Group className="calc-form-group" controlId="systemName">
          <Form.Label>Item Location</Form.Label>
          <Typeahead
            ref={typeaheadRef}
            clearButton
            minLength={2}
            selected={props.system ? [props.system] : []}
            onChange={handleSystemChange}
            id="appr-system-typeahead"
            options={props.optionsSys}
            placeholder="Search system…"
          />
        </Form.Group>
      </div>
    </div>
  );
}
export default AppraisalForm;

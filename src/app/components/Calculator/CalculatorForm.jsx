import { Form, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { Typeahead } from "react-bootstrap-typeahead";
import React, { useState, useRef } from "react";
import ShortForm from "./ShortForm";

function CalculatorForm(props) {
  const [system, setSystem] = useState("");
  const [blueprint, setBlueprint] = useState("");
  const typeaheadRef = useRef(null);

  function sendData() {
    let building     = document.getElementById("building").value;
    let runs         = document.getElementById("quantity").value;
    let buildingRig  = document.getElementById("buildingRig").value;
    let blueprintMe  = document.getElementById("blueprintMe").value;
    let facilityTax  = document.getElementById("facility").value;
    let count        = document.getElementById("blueprintCount").value;
    let regionId     = document.getElementById("marketRegion").value;
    props.setFormData({
      blueprintName: blueprint,
      runs,
      blueprintMe,
      buildingRig,
      building,
      system,
      facilityTax,
      count,
      regionId,
    });
    props.setIsClicked(true);
  }

  return (
    <>
      <Form className="calc-form">

        {/* Blueprint */}
        <Form.Group className="calc-form-group" controlId="blueprintName">
          <Form.Label>Blueprint</Form.Label>
          <Typeahead
            ref={typeaheadRef}
            minLength={2}
            clearButton
            onChange={(selected) => setBlueprint(selected[0])}
            id="basic-behaviors-example"
            options={props.optionsBp}
            placeholder="Search blueprint…"
          />
        </Form.Group>

        {/* Runs + ME side by side */}
        <div className="calc-form-row">
          <Form.Group className="calc-form-group" controlId="quantity">
            <Form.Label>Runs</Form.Label>
            <Form.Control type="number" min={1} placeholder="1" />
          </Form.Group>
          <Form.Group className="calc-form-group" controlId="blueprintMe">
            <Form.Label>Blueprint ME %</Form.Label>
            <Form.Control type="number" min={0} max={10} placeholder="0" />
          </Form.Group>
        </div>

        {/* Structure + Rig side by side */}
        <div className="calc-form-row">
          <Form.Group className="calc-form-group" controlId="building">
            <Form.Label>Structure</Form.Label>
            <Form.Select defaultValue="0">
              <option value={0}>— select —</option>
              {(!blueprint || props.bpDetails.some((bp) => bp.blueprint === blueprint && bp.activity !== 11)) && <option value="1">Azbel</option>}
              {(!blueprint || props.bpDetails.some((bp) => bp.blueprint === blueprint && bp.activity !== 11)) && <option value="2">Raitaru</option>}
              {(!blueprint || props.bpDetails.some((bp) => bp.blueprint === blueprint && bp.activity !== 11)) && <option value="3">Sotiyo</option>}
              {(!blueprint || props.bpDetails.some((bp) => bp.blueprint === blueprint && bp.activity !== 1))  && <option value="4">Athanor</option>}
              {(!blueprint || props.bpDetails.some((bp) => bp.blueprint === blueprint && bp.activity !== 1))  && <option value="5">Tatara</option>}
            </Form.Select>
          </Form.Group>
          <Form.Group className="calc-form-group" controlId="buildingRig">
            <Form.Label>Structure Rig</Form.Label>
            <Form.Select defaultValue="0">
              <option value={0}>— none —</option>
              <option value="1">T1</option>
              <option value="2">T2</option>
            </Form.Select>
          </Form.Group>
        </div>

        {/* System */}
        <Form.Group className="calc-form-group" controlId="systemName">
          <Form.Label>System</Form.Label>
          <Typeahead
            ref={typeaheadRef}
            clearButton
            minLength={2}
            onChange={(selected) => setSystem(selected[0])}
            id="system-typeahead"
            options={props.optionsSys}
            placeholder="Search system…"
          />
        </Form.Group>

        {/* Facility Tax + Job Count side by side */}
        <div className="calc-form-row">
          <Form.Group className="calc-form-group" controlId="facility">
            <Form.Label>Facility Tax %</Form.Label>
            <Form.Control type="number" min={0} step="0.1" placeholder="0.0" />
          </Form.Group>
          <Form.Group className="calc-form-group" controlId="blueprintCount">
            <Form.Label>Job Count</Form.Label>
            <Form.Control type="number" min={1} placeholder="1" />
          </Form.Group>
        </div>

        {/* Market Region */}
        <Form.Group className="calc-form-group" controlId="marketRegion">
          <Form.Label>Buy Materials From</Form.Label>
          <Form.Select defaultValue="10000002_60003760">
            {props.stations.map((station, index) => (
              <option
                key={index}
                value={station.regionId + "_" + station.stationId}
              >
                {station.regionName + " — " + station.stationName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

      </Form>

      {/* Advanced sub-forms */}
      {props.advancedMode &&
        blueprint != null &&
        props.bpDetails.filter((bp) => bp.blueprint === blueprint).some((bp) => bp.complexity === 3) && (
          <ShortForm
            reaction={false}
            setFormDataPart={props.setFormDataPart}
            setFormDataReaction={props.setFormDataReaction}
            optionsSys={props.optionsSys}
            advancedMode={props.advancedMode}
          />
        )}
      {props.advancedMode &&
        blueprint != null &&
        props.bpDetails.filter((bp) => bp.blueprint === blueprint).some((bp) => bp.complexity >= 2) && (
          <ShortForm
            reaction={true}
            setFormDataPart={props.setFormDataPart}
            setFormDataReaction={props.setFormDataReaction}
            optionsSys={props.optionsSys}
            advancedMode={props.advancedMode}
          />
        )}

      <Button className="w-100 mt-3" variant="secondary" onClick={sendData}>
        {props.isLoading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
            Calculating…
          </>
        ) : (
          "Calculate"
        )}
      </Button>
    </>
  );
}

export default CalculatorForm;

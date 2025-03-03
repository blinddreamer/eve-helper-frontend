import { Form, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { Typeahead } from "react-bootstrap-typeahead";

import React, { useState } from "react";
import ShortForm from "./ShortForm";

function CalculatorForm(props) {
  const [system, setSystem] = useState("");
  const [blueprint, setBlueprint] = useState("");

  function sendData() {
    let building = document.getElementById("building").value;
    let runs = document.getElementById("quantity").value;
    let buildingRig = document.getElementById("buildingRig").value;
    let blueprintMe = document.getElementById("blueprintMe").value;
    let facilityTax = document.getElementById("facility").value;
    let count = document.getElementById("blueprintCount").value;
    let regionId = document.getElementById("marketRegion").value;
    props.setFormData({
      blueprintName: blueprint,
      runs: runs,
      blueprintMe: blueprintMe,
      buildingRig: buildingRig,
      building: building,
      system: system,
      facilityTax: facilityTax,
      count: count,
      regionId: regionId,
    });
    props.setIsClicked(true);
  }

  return (<>
    <Form>
      <Form.Group controlId="blueprintName">
        <Form.Label>Blueprint Name:</Form.Label>
        <Typeahead
          minLength={2}
          clearButton
          onChange={(selected) => {
            setBlueprint(selected[0]);
          }}
          id="basic-behaviors-example"
          options={props.optionsBp}
          placeholder="Choose a Blueprint..."
        />
      </Form.Group>
      <Form.Group controlId="quantity">
        <Form.Label>Runs:</Form.Label>
        <Form.Control
          type="number"
          min={1}
          name="quantity"
          placeholder="Enter quantity number."
        />
      </Form.Group>

      <Form.Group controlId="blueprintMe">
        <Form.Label>Blueprint ME:</Form.Label>
        <Form.Control
          type="number"
          min={0}
          name="blueprintMe"
          placeholder="Enter blueprint ME."
        />
      </Form.Group>

      <Form.Group controlId="building">
        <Form.Label>Building:</Form.Label>
        <Form.Select defaultValue="0" aria-label="Default select example">
          <option value={0}>None</option>
          <option value="1">Azbel</option>
          <option value="2">Raitaru</option>
          <option value="3">Sotiyo</option>
          <option value="4">Athanor</option>
          <option value="5">Tatara</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="buildingRig">
        <Form.Label>Building Rig:</Form.Label>
        <Form.Select aria-label="Default select example" defaultValue="0">
          <option value={0}>None</option>
          <option value="1">T1</option>
          <option value="2">T2</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="systemName">
        <Form.Label>System:</Form.Label>
        <Typeahead
          clearButton={true}
          minLength={2}
          onChange={(selected) => {
            setSystem(selected[0]);
          }}
          id="basic-behaviors-example"
          options={props.optionsSys}
          oo
          placeholder="Choose a system..."
        />
      </Form.Group>
      <Form.Group controlId="facility">
        <Form.Label>Facility tax:</Form.Label>
        <Form.Control
          type="number"
          min={0}
          name="facility"
          placeholder="Enter facility tax."
        />
      </Form.Group>

      <Form.Group controlId="blueprintCount">
        <Form.Label>Job Count:</Form.Label>
        <Form.Control
          type="number"
          min={1}
          name="blueprintCount"
          placeholder="Enter blueprint count."
        />
      </Form.Group>

      <Form.Group controlId="marketRegion">
        <Form.Label>Market Region:</Form.Label>
        <Form.Select aria-label="Default select example">
          {props.regions.map((region, index) => {
            return (
              <option
                key={index}
                selected={region.regionId == 10000002}
                value={region.regionId}
              >
                {region.regionName}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      </Form>
      <p />
      {props.advancedMode &&
      blueprint!= null &&
      props.bpDetails
  .filter(bp => bp.blueprint === blueprint)
  .some(bp => bp.complexity === 3) &&
      <ShortForm
        reaction={false}
        setFormDataPart={props.setFormDataPart}
        setFormDataReaction={props.setFormDataReaction}
        optionsSys={props.optionsSys}
        advancedMode={props.advancedMode}
        regions={props.regions}
      />}
  {props.advancedMode &&
  blueprint!= null &&
      props.bpDetails
  .filter(bp => bp.blueprint === blueprint)
  .some(bp => bp.complexity >=2) &&
      <ShortForm
        reaction={true}
        setFormDataPart={props.setFormDataPart}
        setFormDataReaction={props.setFormDataReaction}
        optionsSys={props.optionsSys}
        advancedMode={props.advancedMode}
        regions={props.regions}
      />}
      <Button variant="secondary" onClick={sendData}>
        {props.isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </>
        ) : (
          "Calculate"
        )}
      </Button>
    
      </>
  );
}
export default CalculatorForm;

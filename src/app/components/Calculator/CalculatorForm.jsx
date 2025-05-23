import {
  Form,
  Button,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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

  return (
    <>
      <Form>
      <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="bps-tooltip">
              Type Blueprint
            </Tooltip>
          }
        >
        <Form.Group id="bp_bn" controlId="blueprintName">
          <Typeahead
            ref={typeaheadRef}
            minLength={2}
            clearButton
            onChange={(selected) => {
              setBlueprint(selected[0]);
            }}
            id="basic-behaviors-example"
            options={props.optionsBp}
            placeholder="Choose a Blueprint"
          />
        </Form.Group>
        </OverlayTrigger>
        
        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="runs-tooltip">
              Number of runs for single manufacturing job/line.
            </Tooltip>
          }
        >
          <Form.Group id="bp_quantity" controlId="quantity">
            <Form.Control
              type="number"
              min={1}
              name="quantity"
              placeholder="Runs"
            />
          </Form.Group>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="bp_me-tooltip">
              Material Efficiency value
            </Tooltip>
          }
        >
        <Form.Group id="bp_me" controlId="blueprintMe">
          <Form.Control
            type="number"
            min={0}
            name="blueprintMe"
            placeholder="Blueprint ME"
          />
        </Form.Group>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="build-tooltip">
              Crafting Structure.
            </Tooltip>
          }
        >
        <Form.Group id="bp_build" controlId="building">
          <Form.Select defaultValue="0" aria-label="Default select example">
            <option value={0}>Building.</option>
            {(!blueprint ||
              props.bpDetails.some(
                (bp) => bp.blueprint === blueprint && bp.activity !== 11
              )) && <option value="1">Azbel</option>}
            {(!blueprint ||
              props.bpDetails.some(
                (bp) => bp.blueprint === blueprint && bp.activity !== 11
              )) && <option value="2">Raitaru</option>}
            {(!blueprint ||
              props.bpDetails.some(
                (bp) => bp.blueprint === blueprint && bp.activity !== 11
              )) && <option value="3">Sotiyo</option>}
            {(!blueprint ||
              props.bpDetails.some(
                (bp) => bp.blueprint === blueprint && bp.activity !== 1
              )) && <option value="4">Athanor</option>}
            {(!blueprint ||
              props.bpDetails.some(
                (bp) => bp.blueprint === blueprint && bp.activity !== 1
              )) && <option value="5">Tatara</option>}
          </Form.Select>
        </Form.Group>
        </OverlayTrigger>
        
        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="rig-tooltip">
              Building Rig
            </Tooltip>
          }
        >
        <Form.Group id="bp_rig" controlId="buildingRig">
          <Form.Select aria-label="Default select example" defaultValue="0">
            <option value={0}>Building Rig.</option>
            <option value="1">T1</option>
            <option value="2">T2</option>
          </Form.Select>
        </Form.Group>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="system-tooltip">
              System of the building
            </Tooltip>
          }
        >
        <Form.Group id="bp_system" controlId="systemName">
          <Typeahead
            ref={typeaheadRef}
            clearButton={true}
            minLength={2}
            onChange={(selected) => {
              setSystem(selected[0]);
            }}
            id="basic-behaviors-example"
            options={props.optionsSys}
            oo
            placeholder="Choose a system"
          />
        </Form.Group>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="ft-tooltip">
              Stucture Facility Tax
            </Tooltip>
          }
        >
        <Form.Group id="bp_ft" controlId="facility">
          <Form.Control
            type="number"
            min={0}
            name="facility"
            placeholder="Facility tax."
          />
        </Form.Group>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="count-tooltip">
              How many manufacturing jobs you are going to start
            </Tooltip>
          }
        >
          <Form.Group id="bp_count" controlId="blueprintCount">
            <Form.Control
              type="number"
              min={1}
              name="blueprintCount"
              placeholder="Job Count."
            />
          </Form.Group>
        </OverlayTrigger>
        <OverlayTrigger
          placement="left" // Position of tooltip
          overlay={
            <Tooltip id="market-tooltip">
              Region you are buying mats from. For Jita leave Forge
            </Tooltip>
          }
        >
          <Form.Group id="bp_market" controlId="marketRegion">
            <Form.Select aria-label="Default select example">
              {props.stations.map((station, index) => {
                return (
                  <option
                    key={index}
                    selected={station.stationId == 60003760}
                    value={station.regionId+"_"+station.stationId}
                  >
                    {station.regionName+ " - " + station.stationName}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </OverlayTrigger>
      </Form>
      <p />
      {props.advancedMode &&
        blueprint != null &&
        props.bpDetails
          .filter((bp) => bp.blueprint === blueprint)
          .some((bp) => bp.complexity === 3) && (
          <ShortForm
            reaction={false}
            setFormDataPart={props.setFormDataPart}
            setFormDataReaction={props.setFormDataReaction}
            optionsSys={props.optionsSys}
            advancedMode={props.advancedMode}
           // regions={props.regions}
          />
        )}
      {props.advancedMode &&
        blueprint != null &&
        props.bpDetails
          .filter((bp) => bp.blueprint === blueprint)
          .some((bp) => bp.complexity >= 2) && (
          <ShortForm
            reaction={true}
            setFormDataPart={props.setFormDataPart}
            setFormDataReaction={props.setFormDataReaction}
            optionsSys={props.optionsSys}
            advancedMode={props.advancedMode}
           // regions={props.regions}
          />
        )}
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

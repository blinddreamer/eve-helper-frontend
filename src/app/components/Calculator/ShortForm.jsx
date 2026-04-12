"use client"
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState, useRef } from "react";

function ShortForm(props) {
  const [systemPart, setSystemPart] = useState(null);
  const [systemReaction, setSystemReaction] = useState(null);
  const typeaheadRef = useRef(null);
  const componentId = props.reaction ? "reactiion" : "part";

  function handleOnchange() {
    let building    = document.getElementById("build_" + componentId).value;
    let buildingRig = document.getElementById("rig_" + componentId).value;
    let blueprintMe = document.getElementById("me_" + "part")?.value;
    let facilityTax = document.getElementById("ft_" + componentId).value;
    !props.reaction
      ? props.setFormDataPart({ blueprintMe, buildingRig, building, system: systemPart, facilityTax })
      : props.setFormDataReaction({ buildingRig, building, system: systemReaction, facilityTax });
  }

  const title = props.reaction ? "Reaction Structure" : "Component Structure";
  const hint  = props.reaction
    ? "Structure used for reactions (Tatara / Athanor)"
    : "Structure used for component manufacturing";

  return (
    <div className="calc-subform">
      <div className="calc-subform-title">{title}</div>
      <p className="text-muted mb-2" style={{ fontSize: "0.72rem" }}>{hint}</p>

      <Form className="calc-form">
        {!props.reaction && (
          <Form.Group className="calc-form-group" controlId={`me_${componentId}`}>
            <Form.Label>Blueprint ME %</Form.Label>
            <Form.Control
              type="number"
              min={0}
              placeholder="0"
              onChange={handleOnchange}
            />
          </Form.Group>
        )}

        <div className="calc-form-row">
          <Form.Group className="calc-form-group" controlId={`build_${componentId}`}>
            <Form.Label>Structure</Form.Label>
            <Form.Select onChange={handleOnchange}>
              <option hidden>— select —</option>
              <option value="0">None</option>
              {!props.reaction && <option value="1">Azbel</option>}
              {!props.reaction && <option value="2">Raitaru</option>}
              {!props.reaction && <option value="3">Sotiyo</option>}
              {props.reaction  && <option value="4">Athanor</option>}
              {props.reaction  && <option value="5">Tatara</option>}
            </Form.Select>
          </Form.Group>
          <Form.Group className="calc-form-group" controlId={"rig_" + componentId}>
            <Form.Label>Rig</Form.Label>
            <Form.Select onChange={handleOnchange}>
              <option hidden>— select —</option>
              <option value="0">None</option>
              <option value="1">T1</option>
              <option value="2">T2</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="calc-form-group" id="system_select">
          <Form.Label>System</Form.Label>
          <Typeahead
            ref={typeaheadRef}
            id={`system_${componentId}`}
            minLength={2}
            onChange={(selected) => {
              !props.reaction ? setSystemPart(selected[0]) : setSystemReaction(selected[0]);
              handleOnchange();
            }}
            options={props.optionsSys}
            placeholder="Search system…"
          />
        </Form.Group>

        <Form.Group className="calc-form-group" controlId={"ft_" + componentId}>
          <Form.Label>Facility Tax %</Form.Label>
          <Form.Control
            type="number"
            min={0}
            step="0.1"
            placeholder="0.0"
            onChange={handleOnchange}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default ShortForm;

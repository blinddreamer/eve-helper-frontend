import Form from "react-bootstrap/Form";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead/types";
import { useState, useRef } from "react";

function ShortForm(props) {
  const [systemPart, setSystemPart] = useState(null);
  const [systemReaction, setSystemReaction] = useState(null);
  const typeaheadRef = useRef(null);
  const componentId = props.reaction ? "reactiion" : "part";
  function handleOnchange(componentId) {
    let building = document.getElementById("build_" + componentId).value;
    let buildingRig = document.getElementById("rig_" + componentId).value;
    let blueprintMe = document.getElementById("me_" + componentId).value;
    let facilityTax = document.getElementById("ft_" + componentId).value;
    !props.reaction
      ? props.setFormDataPart({
          blueprintMe: blueprintMe,
          buildingRig: buildingRig,
          building: building,
          system: systemPart,
          facilityTax: facilityTax,
        })
      : props.setFormDataReaction({
          blueprintMe: blueprintMe,
          buildingRig: buildingRig,
          building: building,
          system: systemReaction,
          facilityTax: facilityTax,
        });
  }

  return (
    <Form>
      <OverlayTrigger
        placement="right" // Position of tooltip
        overlay={
          props.reaction ? (
            <Tooltip id="reaction-tooltip">
              Populate the below with the structure information for the
              Tatara/Athanor you are using for reactions.
            </Tooltip>
          ) : (
            <Tooltip id="component-tooltip">
              Populate the below with information for the structure you are
              using for components.
            </Tooltip>
          )
        }
      >
        <p>{props.reaction ? "Reaction Structure:" : "Component Structure:"}</p>
      </OverlayTrigger>
      {!props.reaction && (
        <Form.Group id="me_select" controlId={`me_${componentId}`}>
          <Form.Control
            type="number"
            min={0}
            placeholder="Material Efficiency"
            onChange={() => handleOnchange(componentId)}
          />
        </Form.Group>
      )}

      <Form.Group id="build_select" controlId={`build_${componentId}`}>
        <Form.Select
          aria-label="Default select example"
          onChange={() => handleOnchange(componentId)}
        >
          <option hidden>Select Building</option>
          <option value="0">None</option>
          {!props.reaction && <option value="1">Azbel</option>}
          {!props.reaction && <option value="2">Raitaru</option>}
          {!props.reaction && <option value="3">Sotiyo</option>}
          {props.reaction && <option value="4">Athanor</option>}
          {props.reaction && <option value="5">Tatara</option>}
        </Form.Select>
      </Form.Group>
      <Form.Group id="rig_select" controlId={"rig_" + componentId}>
        <Form.Select
          onChange={() => handleOnchange(componentId)}
          aria-label="Default select example"
        >
          <option hidden>Select Building Rig</option>
          <option value="0">None</option>
          <option value="1">T1</option>
          <option value="2">T2</option>
        </Form.Select>
      </Form.Group>
      <Form.Group id="system_select">
        <Typeahead
          ref={typeaheadRef}
          id={`system_${componentId}`}
          minLength={2}
          onChange={(selected) => {
            !props.reaction
              ? setSystemPart(selected[0])
              : setSystemReaction(selected[0]);
          }}
          options={props.optionsSys}
          placeholder="System"
        />
      </Form.Group>
      <Form.Group id="ft_select" controlId={"ft_" + componentId}>
        <Form.Control
          type="number"
          min={0}
          name="facility"
          placeholder="Enter facility tax."
          onChange={() => handleOnchange(componentId)}
        />
      </Form.Group>
      {/* <Button className="btn btn-secondary"> Apply</Button> */}
    </Form>
  );
}
export default ShortForm;

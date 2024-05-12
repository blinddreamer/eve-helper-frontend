import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead/types";
import { useState } from "react";
import { Button } from "react-bootstrap";
function ShortForm(props) {
   const [systemPart, setSystemPart] = useState(null);
   const [systemReaction, setSystemReaction] = useState(null);
   const componentId = props.reaction ? "reactiion" : "part";
    function handleOnchange(componentId){
        let building = document.getElementById("build_"+ componentId).value;
        let buildingRig = document.getElementById("rig_"+componentId).value;
        let blueprintMe = document.getElementById("me_"+ componentId).value;
        let facilityTax = document.getElementById("ft_"+ componentId).value;
        !props.reaction ?
        props.setFormDataPart({
          blueprintMe: blueprintMe,
          buildingRig: buildingRig,
          building: building,
          system: systemPart,
          facilityTax: facilityTax,
        }) : 
        props.setFormDataReaction({
            blueprintMe: blueprintMe,
            buildingRig: buildingRig,
            building: building,
            system: systemReaction,
            facilityTax: facilityTax,
           
        })
    }

    return (
        <Form>
           <Form.Group controlId={`me_${componentId}`}>
                  <Form.Control
                    type="number"
                    min={0}
                    
                    placeholder="Material Efficiency"
                    onChange={() => handleOnchange(componentId)}
                   />
                </Form.Group>

                <Form.Group controlId={`build_${componentId}`}>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={() => handleOnchange(componentId)}
                  >
                    <option hidden>Select Building</option>
                    <option value="0">None</option>
                    <option value="1">Azbel</option>
                    <option value="2">Raitaru</option>
                    <option value="3">Sotiyo</option>
                    <option value="4">Athanor</option>
                    <option value="5">Tatara</option>
                  </Form.Select>
                </Form.Group>             
            <Form.Group controlId={"rig_"+componentId}>
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
                <Form.Group>
                  <Typeahead
                    id={`system_${componentId}`}
                   
                    minLength={2}
                    onChange={(selected) => {
                     !props.reaction ? setSystemPart(selected[0]) :
                     setSystemReaction(selected[0])
                    }}
                    options={props.optionsSys}
                    placeholder="System"
                  />
                </Form.Group>
        <Form.Group controlId={"ft_"+componentId}  >
        <Form.Control
          type="number"
          min={0}
          name="facility"
          placeholder="Enter facility tax."
          onChange={() => handleOnchange(componentId)}
        />
      </Form.Group>
      <Button className="btn btn-secondary"> Apply</Button>
            </Form>
             
    );
}
export default ShortForm;
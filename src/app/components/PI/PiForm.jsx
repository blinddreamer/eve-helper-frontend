"use client"
import Form from "react-bootstrap/Form";

function PiForm(props){

  function endMatHandler(e){
    props.setSelectedItem(e.target.value)
  }

  function volumeHandler(e){
    props.setVolume(Number(e.target.value))
  }

  function basicFacHandler(e){
    props.setBasicFactory(Number(e.target.value))
  }

  function advFacHandler(e){
    props.setAdvancedFactory(Number(e.target.value))
  }

  function specFacHandler(e){
    props.setSpecialFactory(Number(e.target.value))
  }

    return(
       <div id="piForm">
      <Form>
         <Form.Group id="endMat" controlId="end-material">
                  <Form.Label>End Material</Form.Label>
                  <Form.Select
                    key="material-select"
                    aria-label="Select PI Material"
                    onChange={endMatHandler}
                    value={props.selectedItem || ""}
                  >
                    <option value="">Select Material...</option>
                    {props.piList.filter(pi=> pi.type>1).map((pi, index) => {
                      return (
                        <option
                          key={pi.id || index}
                          value={pi.name}
                        >
                          {pi.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
        <Form.Group id="vol" controlId="volume">
          <Form.Label>Volume</Form.Label>
          <Form.Control
            type="number"
            onChange={volumeHandler}
            min={1}
            name="volume"
            placeholder="Enter volume"
            value={props.volume || ""}
          />
        </Form.Group>
         <Form.Group id="facBasic" controlId="factory-basic">
          <Form.Label>Basic Factory</Form.Label>
          <Form.Control
            type="number"
            onChange={basicFacHandler}
            min={1}
            name="basicFactory"
            placeholder="Number of basic factories"
            value={props.basicFactory || ""}
          />
        </Form.Group>
         <Form.Group id="facAdv" controlId="factory-adv">
          <Form.Label>Advanced Factory</Form.Label>
          <Form.Control
            type="number"
            onChange={advFacHandler}
            min={1}
            name="advancedFactory"
            placeholder="Number of advanced factories"
            value={props.advancedFactory || ""}
          />
        </Form.Group>
         <Form.Group id="facSpec" controlId="factory-spc">
          <Form.Label>Special Factory</Form.Label>
          <Form.Control
            onChange={specFacHandler}
            type="number"
            min={1}
            name="specialFactory"
            placeholder="Number of special factories"
            value={props.specialFactory || ""}
          />
        </Form.Group>
        </Form>
    </div>
    )
}
export default PiForm;
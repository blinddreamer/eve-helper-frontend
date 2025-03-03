import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calculator from "./Calculator-new.jsx";
import GetForm from "./CalculatorForm.jsx";
import AdvancedModeToggle from "../AdvancedModeToggle.jsx";
import axios from "axios";
import Animated from "../Animated";

function CalculatorBody(props) {
  const [openState, setOpenState] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [initialBlueprint, setInitialBlueprint] = useState({});
  const [materialsList, setMaterialsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [formDataPart, setFormDataPart] = useState({});
  const [formDataReaction, setFormDataReaction] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [optionsBp, setOptionsBp] = useState([]);
  const [optionsSys, setOptionsSys] = useState([]);
  const [onStart, setOnstart] = useState(true);
  const [regions, setRegions] = useState([{}]);
  const [stations, setStations] = useState([{}]);
  const [requestId, setRequestId] = useState({});
  const [isAdvancedCalc, setIsAdvancedCacl] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [blueprintComplexity, setBlueprintComplexity] = useState({});
  const [bpDetails, setBpDetails] = useState([]);
 // const backend = "https://api.eve-helper.com/api/v1/";
   const backend = "http://localhost:8080/api/v1/";

  useEffect(() => {
    isClicked && submitForm();
  });
  useEffect(() => {
    onStart && getRegions() && getSystems() && getBlueprints() && getStations();
    setOnstart(false);
  });

  async function getRegions() {
    const response = await axios.get(backend + "regions");
    if (response.status === 200) {
      setRegions(response.data);
    }
  }
  async function getStations() {
    const response = await axios.get(backend + "stations");
    if (response.status === 200) {
      setStations(response.data);
    }
  }
  async function getSystems() {
    const response = await axios.get(backend + "systems");
    if (response.status === 200) {
      setOptionsSys(response.data.map((sys) => sys.systemName));
    }
  }
  async function getBlueprints() {
    const response = await axios.get(backend + "blueprints");
    if (response.status === 200) {
      setOptionsBp(response.data.blueprints.map((bp) => bp.blueprint));
      setBpDetails(response.data.blueprints);
    }
  }
  const submitForm = async () => {
    setCheckedItems({});
    setIsClicked(false);
    setOpenState({});
    setIsAdvancedCacl(props.advancedMode);
   // setMaterialsList([]);
   setIsLoading(true);
    try {
      const response = await axios.post(backend + "type", {
        blueprintName: formData.blueprintName,
        runs: formData.runs,
        blueprintMe: formData.blueprintMe,
        buildingRig: formData.buildingRig,
        building: formData.building,
        system: formData.system,
        facilityTax: formData.facilityTax,
        count: formData.count,
        regionId: formData.regionId,
        init: true,
      });
      if (response.status !== 200) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
      setErrorMessage("");
      
      const data = response.data;
      
      const materials = data.blueprintResult;
      const requestId = data.id;
      setMaterialsList(materials);
      setInitialBlueprint(data.blueprintResult[0]);
      setRequestId(requestId);
      
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(
        "Item '" + formData.blueprintName + "' not found in database !"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Animated>
        <Container>
          <Row>
            <Col>
              <Col>
                <div id="menuleft">
                <AdvancedModeToggle
                setAdvancedMode={props.setAdvancedMode}
                advancedMode={props.advancedMode}
              />
                  <GetForm
                    setFormData={setFormData}
                    setIsClicked={setIsClicked}
                    isLoading={isLoading}
                    optionsBp={optionsBp}
                    optionsSys={optionsSys}
                    advancedMode={props.advancedMode}
                    setFormDataPart={setFormDataPart}
                    setFormDataReaction={setFormDataReaction}
                    regions={regions}
                    blueprintComplexity={blueprintComplexity}
                    setBlueprintComplexity={setBlueprintComplexity}
                    bpDetails={bpDetails}
                  ></GetForm>
                </div>
                {/* <div id="menuParts">
                  <p>Parts bonuses:</p>
                  <ShortForm
                    reaction={false}
                    formData={formData}
                    setFormDataPart={setFormDataPart}
                    setFormDataReaction={setFormDataReaction}
                    optionsSys={optionsSys}
                    advancedMode={props.advancedMode}
                    regions={regions}
                  ></ShortForm>
                </div>
                <div id="menuReactions">
                  <p>Reaction Bonuses:</p>
                  <ShortForm
                    reaction={true}
                    formData={formData}
                    setFormDataPart={setFormDataPart}
                    setFormDataReaction={setFormDataReaction}
                    optionsSys={optionsSys}
                    advancedMode={props.advancedMode}
                    regions={regions}
                  ></ShortForm>
                </div> */}
              </Col>
            </Col>
            <Col xs={9}>
              <Calculator
                materialsList={materialsList}
                setMaterialsList={setMaterialsList}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                initialBlueprint={initialBlueprint}
                setInitialBlueprint={setInitialBlueprint}
                openState={openState}
                setOpenState={setOpenState}
                optionsSys={optionsSys}
                backend={backend}
                advancedMode={props.advancedMode}
                setAdvancedMode={props.setAdvancedMode}
                formData={formData}
                formDataPart={formDataPart}
                formDataReaction={formDataReaction}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                requestId={requestId}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                isAdvancedCalc={isAdvancedCalc}
              />
            </Col>
          </Row>
        </Container>
      </Animated>
    </>
  );
}

export default CalculatorBody;

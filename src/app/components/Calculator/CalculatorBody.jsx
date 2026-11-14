import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calculator from "./Calculator.jsx";
import GetForm from "./CalculatorForm.jsx";
import AdvancedModeToggle from "../AdvancedModeToggle.jsx";
import { publicApi } from "../../utils/axios";

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
  const [regions, setRegions] = useState([{}]);
  const [stations, setStations] = useState([{}]);
  const [isCopied, setIsCopied] = useState({});
  const [requestId, setRequestId] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [blueprintComplexity, setBlueprintComplexity] = useState({});
  const [bpDetails, setBpDetails] = useState([]);

  useEffect(() => {
    isClicked && submitForm();
  }, [isClicked]);
  useEffect(() => {
    // The form is unusable without this data, so surface a failure instead of an empty form
    Promise.all([
      publicApi.get("regions").then((r) => setRegions(r.data)),
      publicApi.get("stations").then((r) => setStations(r.data)),
      publicApi.get("systems").then((r) => setOptionsSys(r.data.map((sys) => sys.systemName))),
      publicApi.get("blueprints").then((r) => {
        setOptionsBp(r.data.blueprints.map((bp) => bp.blueprint));
        setBpDetails(r.data.blueprints);
      }),
    ]).catch((error) => {
      console.error("Failed to load calculator data:", error);
      setErrorMessage("Could not load calculator data. Please refresh the page or try again later.");
    });
  }, []);
  const submitForm = async () => {
    setCheckedItems({});
    setIsCopied({});
    setIsClicked(false);
    setOpenState({});
    setIsLoading(true);
    try {
      const response = await publicApi.post("type", {
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
      
        <Container>
          <Row>
            {/* side by side from lg up; stacked (form first) on smaller screens */}
            <Col xs={12} lg>
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
                    stations={stations}
                    blueprintComplexity={blueprintComplexity}
                    setBlueprintComplexity={setBlueprintComplexity}
                    bpDetails={bpDetails}
                  ></GetForm>
                </div>
               </Col>
            </Col>
            <Col xs={12} lg={9}>
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
                isCopied={isCopied}
                setIsCopied={setIsCopied}
              />
            </Col>
          </Row>
        </Container>
      
    </>
  );
}

export default CalculatorBody;

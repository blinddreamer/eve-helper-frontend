import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calculator from "./Calculator.jsx";
import GetForm from "./CalculatorForm.jsx";
import axios from "axios";
import Animated from "../Animated";

function CalculatorBody(props) {
  const [openState, setOpenState] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [initialBlueprint, setInitialBlueprint] = useState({});
  const [materialsList, setMaterialsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [optionsBp, setOptionsBp] = useState([]);
  const [optionsSys, setOptionsSys] = useState([]);
  const [onStart, setOnstart] = useState(true);
  const [regions, setRegions] = useState([{}]);
  const [stations, setStations] = useState([{}]);
  const [crafitng, setCrafting] = useState({});
  const [isChecked, setIsChecked] = useState({});

  const backend = "https://api.eve-helper.com/api/v1/";
  // const backend = "http://thunder:8080/api/v1/";

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
    }
  }
  const submitForm = async () => {
    setIsClicked(false);
    setOpenState({});
    setCrafting({});
    setIsChecked({});
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
      setMaterialsList(data.materialsList);
      setInitialBlueprint(data);
      setCrafting({ ["card_" + data.name]: true });
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
                  <GetForm
                    setFormData={setFormData}
                    setIsClicked={setIsClicked}
                    isLoading={isLoading}
                    optionsBp={optionsBp}
                    optionsSys={optionsSys}
                    advancedMode={props.advancedMode}
                    regions={regions}
                  ></GetForm>
                </div>
              </Col>
            </Col>
            <Col xs={9}>
              <Calculator
                materialsList={materialsList}
                setMaterialsList={setMaterialsList}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                initialBlueprint={initialBlueprint}
                openState={openState}
                setOpenState={setOpenState}
                optionsSys={optionsSys}
                backend={backend}
                advancedMode={props.advancedMode}
                setAdvancedMode={props.setAdvancedMode}
                formData={formData}
                crafitng={crafitng}
                setCrafting={setCrafting}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </Col>
          </Row>
        </Container>
      </Animated>
    </>
  );
}

export default CalculatorBody;

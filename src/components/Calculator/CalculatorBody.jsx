import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calculator from "./Calculator-new.jsx";
import GetForm from "./CalculatorForm.jsx";
import ShortForm from "./ShortForm.jsx";
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
  const [crafitng, setCrafting] = useState({});
  const [isChecked, setIsChecked] = useState({});
  const [fuelList, setFuelList] = useState({});
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
    }
  }
  const submitForm = async () => {
    setIsClicked(false);
    setOpenState({});
    setCrafting({});
    setIsChecked({});
    setFuelList({});
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
      
      const materials = data.materialsList.map( mat => {
       // mat.tier = 0;
        let materialId = mat.id;
        let special = {materialId: data.id, neededQuantity: mat.quantity}
        let materialToAdd = {materialId: materialId, materials: [special], tier: 0, volume: mat.volume, icon: mat.icon, price: mat.sellPrice, 
          name:mat.name, activityId: mat.activityId, craftQuantity: mat.craftQuantity, isCreatable: mat.isCreatable, quantity: mat.quantity, checked: true,
        jobsCount: mat.jobsCount}
        return materialToAdd;
      })
      setMaterialsList(materials);
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
                <div id="menuParts">
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
                formDataPart={formDataPart}
                formDataReaction={formDataReaction}
                crafitng={crafitng}
                setCrafting={setCrafting}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fuelList={fuelList}
                setFuelList={setFuelList}
              />
            </Col>
          </Row>
        </Container>
      </Animated>
    </>
  );
}

export default CalculatorBody;

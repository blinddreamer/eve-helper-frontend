import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Typeahead } from "react-bootstrap-typeahead/types";
import AdvancedModeToggle from "../AdvancedModeToggle";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { GiBasket } from "react-icons/gi";

function Calculator(props) {
  // INITIALISE STATE PARAMETERS
  const [isDataLoaded, setIsDataLoaded] = useState({});
  const [isCopied, setIsCopied] = useState({});
  const [system, setSystem] = useState(null);
  const [systemValues, setSystemValues] = useState({});
  const [inputValues, setInputValues] = useState({});
  

  useEffect(() => {
    system != null &&
      recalculatePrices(
        system.id,
        system.material,
        system.colId,
        system.parent_id,
        system.value
      ) &&
      setInputValues((prevState) => ({
        ...prevState,
        [system.id]: system.value,
      }));

    setSystem(null);
  });

  // HANDEL MATERIAL DISCOUNT FORM
  const handleInputChange = async (material, e) => {
    const tempId = e.target.id;
    const splitedId = tempId.split(/_(.*)/s);
    const parent_id = splitedId[1];
    const id = splitedId[0];
    const colId = "col_" + parent_id;
    const value = e.target.value;
    recalculatePrices(id, material, colId, parent_id, value);
    setInputValues((prevState) => ({
      ...prevState,
      [tempId]: e.target.value,
    }));
  };

  // RECALCULATIONS
  async function recalculatePrices(id, material, colId, parent_id, value) {
    let blueprintMe = "";
    let buildingRig = "";
    let building = "";
    let system = "";
    let facilityTax;
    if (id === "me") {
      blueprintMe = value;
      buildingRig = document.getElementById("rig_" + parent_id).value;
      building = document.getElementById("build_" + parent_id).value;
      system = facilityTax = document.getElementById(
        "facility_" + parent_id
      ).value;
    }
    if (id === "rig") {
      blueprintMe = document.getElementById("me_" + parent_id).value;
      buildingRig = value;
      building = document.getElementById("build_" + parent_id).value;
      system = systemValues["system_" + parent_id];
      facilityTax = document.getElementById("facility_" + parent_id).value;
    }
    if (id === "build") {
      blueprintMe = document.getElementById("me_" + parent_id).value;
      buildingRig = document.getElementById("rig_" + parent_id).value;
      system = systemValues["system_" + parent_id];
      facilityTax = document.getElementById("facility_" + parent_id).value;
      building = value;
    }
    if (id === "system") {
      blueprintMe = document.getElementById("me_" + parent_id).value;
      buildingRig = document.getElementById("rig_" + parent_id).value;
      system = value;
      facilityTax = document.getElementById("facility_" + parent_id).value;
      building = document.getElementById("build_" + parent_id).value;
    }
    if (id === "facility") {
      blueprintMe = document.getElementById("me_" + parent_id).value;
      buildingRig = document.getElementById("rig_" + parent_id).value;
      system = systemValues["system_" + parent_id];
      facilityTax = value;
      building = document.getElementById("build_" + parent_id).value;
    }
    try {
      const response = await axios.post(props.backend + "type", {
        blueprintName: material.name,
        runs: material.jobsCount,
        blueprintMe: blueprintMe,
        buildingRig: buildingRig,
        building: building,
        system: system,
        facilityTax: facilityTax,
      });
      if (response.status !== 200) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
      const data = response.data;
      material.industryCosts = data.industryCosts;
      material.materialsList = data.materialsList;
      props.setMaterialsList(...[props.materialsList]);
      updateLoadedData(colId);
      material.craftPrice = craftPrice(material, "card_" + parent_id);
    } catch (error) {
      console.error("Error:", error.message);
      props.setErrorMessage(error.message);
    }
  }
  // GENERATE COPY TEXT
  function generateCopyText(material, step) {
    // Initialize an empty string to store the copy text
    let copyText = "";

    // Iterate through the material's materialsList
    if (
      Array.isArray(material.materialsList) &&
      material.isCreatable &&
      (material.copy || step == 0)
    ) {
      for (const subMaterial of material.materialsList) {
        // Recursively generate copy text for each sub-material
        copyText += generateCopyText(subMaterial, step + 1);
      }
    }
    // Construct the copy text for the current material (if it's not marked as copy)
    if (!material.copy && step != 0) {
      copyText += `${material.name} x${material.quantity} \n`;
    }

    return copyText;
  }

  // COPY FUNCTION
  async function handleMultiBuyCopy(id) {
    try {
      await navigator.clipboard.writeText(
        generateCopyText(props.initialBlueprint, 0)
      );
      console.log("Text copied");
      setIsCopied({ [id]: true });
    } catch {
      console.error("Error copying text: ", error);
      alert("Failed to copy text.");
    }
  }

  // CRAFT PRICE CALCULATIONS

  const craftPrice = (material, id) => {
    const price = material.materialsList.reduce((accumulator, mat, index) => {
      const openId = (id + "_" + mat.name + index).replaceAll(" ", "_");
      const state = props.crafitng[openId];

      return (
        accumulator +
        (state
          ? mat.craftPrice + mat.industryCosts
          : mat.sellPrice)
      );
    }, 0);
    material.craftPrice = price + material.industryCosts;
    return material.craftPrice;
  };
  // HANDLE CHECK BOX
  function handleCheck(material, colId, checkId) {
    props.setCrafting((prevState) => ({
      ...prevState,
      [checkId]: !prevState[checkId],
    }));
    props.setIsChecked((prevState) => ({
      ...prevState,
      [checkId]: !prevState[checkId],
    }));

    material.copy = !material.copy;
    getSubmatsData(material, colId);
  }
  // BACKEND CALL FOR THE SUBMATERIALS DATA
  async function getSubmatsData(material, colId) {
    if (!Array.isArray(material.materialsList)) {
      try {
        const response = await axios.post(props.backend + "type", {
          blueprintName: material.name,
          runs: material.jobsCount,
          blueprintMe: material.activityId == 11 ? 0 : 10,
          building: props.formData.building,
          buildingRig: props.formData.buildingRig,
          system: props.formData.system,
          facilityTax: props.formData.facilityTax,
        });
        if (response.status !== 200) {
          throw new Error(`Server Error: ${response.statusText}`);
        }
        const data = response.data;
        const id = colId.split(/_(.*)/s)[1];
        material.materialsList = data.materialsList;
        material.craftPrice = craftPrice(material, "cards_" + id);
        props.setMaterialsList(...[props.materialsList]);
        updateLoadedData(colId);
      } catch (error) {
        console.error("Error:", error.message);
        props.setErrorMessage(error.message);
      }
    }
  }

  // COLLABSIBLE TOGGLING
  const toggleCollapsible = (id, isCreatable) => {
    if (isCreatable) {
      props.setOpenState((prevState) => ({
        ...prevState,
        [id]: !prevState[id], // Toggle the state for the given ID
      }));
      // const checkBox = props.isChecked[id];
      // if (!checkBox) {
      //   props.setCrafting((prevState) => ({
      //     ...prevState,
      //     [id]: !prevState[id],
      //   }));
      // }
    }
  };
  // UPDATE LOADED DATA
  const updateLoadedData = (id) =>
    setIsDataLoaded((prevState) => ({
      ...prevState,
      [id]: true,
    }));

  // DISPLAY RESULT
  const displayResult = () => {
    let volumeFormat = new Intl.NumberFormat();
    return (
      <>
        {!props.initialBlueprint.materialsList && (
          <div id="start-message">
            <Alert variant="success">
              Choose blueprint or reaction formula to start.
            </Alert>
          </div>
        )}
        {props.initialBlueprint.materialsList && (
          <div id="blueprintHeader">
            <div>
              <img
                id="propimage"
                src={props.initialBlueprint.icon}
                loading="lazy"
              />{" "}
            </div>
            <div id="propvolume">
              Volume :{" "}
              {volumeFormat.format(props.initialBlueprint.volume) + " m³"}
              <p id="bpheader" />
              Crafting price:{" "}
              {craftPrice(
                props.initialBlueprint,
                "card_" + props.initialBlueprint.name
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "ISK",
                minimumFractionDigits: 2,
              })}{" "}
              <p id="bpheader" />
              Sell order :{" "}
              {props.initialBlueprint.sellPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "ISK",
                minimumFractionDigits: 2,
              })}
              <p id="bpheader" />
              Profit :{" "}
              <span
                className={
                  props.initialBlueprint.sellPrice -
                    craftPrice(
                      props.initialBlueprint,
                      "card_" + props.initialBlueprint.name
                    ) <
                  0
                    ? "negativeprice"
                    : "positiveprice"
                }
              >
                {(
                  props.initialBlueprint.sellPrice -
                  craftPrice(
                    props.initialBlueprint,
                    "card_" + props.initialBlueprint.name
                  )
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "ISK",
                  minimumFractionDigits: 2,
                })}
              </span>
              <p id="bpheader" />
              Margin :{" "}
              <span
                className={
                  props.initialBlueprint.sellPrice -
                    craftPrice(
                      props.initialBlueprint,
                      "card_" + props.initialBlueprint.name
                    ) <
                  0
                    ? "redmilcho"
                    : "greenmilcho"
                }
              >
                {(
                  ((props.initialBlueprint.sellPrice -
                    craftPrice(
                      props.initialBlueprint,
                      "card_" + props.initialBlueprint.name
                    )) /
                    props.initialBlueprint.sellPrice) *
                  100
                ).toFixed(2) + " %"}
              </span>
              <p id="bpheader" />
            </div>
            <div>
              <Button
                id="button-top"
                variant="secondary"
                onClick={() =>
                  handleMultiBuyCopy("copy_" + props.initialBlueprint.name)
                }
              >
                {!isCopied["copy_" + props.initialBlueprint.name] ? (
                  <>
                    <GiBasket /> Copy Mats
                  </>
                ) : (
                  "Copied"
                )}
              </Button>
              <p />
              <AdvancedModeToggle
                setAdvancedMode={props.setAdvancedMode}
                advancedMode={props.advancedMode}
              />
            </div>
          </div>
        )}
        {props.initialBlueprint.materialsList && (
          <div id="matsdiv">
            Input materials for creating {props.initialBlueprint.quantity}{" "}
            {props.initialBlueprint.name}.
          </div>
        )}
        {props.initialBlueprint.materialsList && (
          <Table
            bordered
            hover
            size="sm"
            key={`header_${props.initialBlueprint.name}`}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Volume m³</th>
                <th>Market Cost ISK</th>
                <th>Craft Cost ISK</th>
                <th>Excess</th>
                <th>Buy / Craft</th>
                {props.advancedMode && <th>BP ME</th>}
                {props.advancedMode && <th>Building</th>}
                {props.advancedMode && <th>Rig</th>}
                {props.advancedMode && <th>System</th>}
                {props.advancedMode && <th>Facility tax</th>}
              </tr>
            </thead>
            <tbody>
              {props.initialBlueprint.materialsList.map((mat, index) =>
                render(props.initialBlueprint.name, mat, index)
              )}
            </tbody>
          </Table>
        )}
        {props.initialBlueprint.materialsList && (
          <span> *all prices are estimate</span>
        )}
      </>
    );
  };

  // RENDER MATERIALS
  function render(parent, material, index) {
    const id = (parent + "_" + material.name + index).replaceAll(" ", "_"); // Unique ID for the card
    const openId = "card_" + id;
    const colId = "col_" + id;
    const isOpen = props.openState[openId]; // Get the open state for the card
    const isLoaded = isDataLoaded[colId];
    const trColor = index % 2 == 0 ? "huku" : "gnomo";
    let volumeFormat = new Intl.NumberFormat();
    let priceFormat = new Intl.NumberFormat("en-US");
    const isCheckable =
      (parent == props.initialBlueprint.name
        ? false
        : !props.isChecked["card_" + parent]) || !material.isCreatable;

    return (
      <>
        <tr className={trColor}>
          <td
            role={material.isCreatable ? "button" : ""}
            aria-expanded={props.openState["card_" + id]}
            aria-controls="example-collapse-text"
            onClick={() =>
              toggleCollapsible("card_" + id, material.isCreatable)
            }
          >
            <img src={material.icon} loading="lazy" />
          </td>
          <td
            role={material.isCreatable ? "button" : ""}
            aria-controls="example-collapse-text"
            aria-expanded={props.openState["card_" + id]}
            onClick={() =>
              toggleCollapsible("card_" + id, material.isCreatable)
            }
          >
            {material.name}
          </td>
          <td
            role={material.isCreatable ? "button" : ""}
            aria-expanded={props.openState["card_" + id]}
            aria-controls="example-collapse-text"
            onClick={() =>
              toggleCollapsible("card_" + id, material.isCreatable)
            }
          >
            {volumeFormat.format(material.quantity)}
          </td>
          <td
            role={material.isCreatable ? "button" : ""}
            aria-expanded={props.openState["card_" + id]}
            aria-controls="example-collapse-text"
            onClick={() =>
              toggleCollapsible("card_" + id, material.isCreatable)
            }
          >
            {volumeFormat.format(material.volume)}
          </td>
          <td
            role={material.isCreatable ? "button" : ""}
            aria-expanded={props.openState["card_" + id]}
            aria-controls="example-collapse-text"
            onClick={() =>
              toggleCollapsible("card_" + id, material.isCreatable)
            }
          >
            {priceFormat.format(material.sellPrice)}
          </td>
          <td
            role={material.isCreatable ? "button" : ""}
            aria-expanded={props.openState["card_" + id]}
            aria-controls="example-collapse-text"
            onClick={() =>
              toggleCollapsible("card_" + id, material.isCreatable)
            }
          >
            {material.craftPrice
              ? priceFormat.format(craftPrice(material, openId))
              : "-"}
          </td>
          <td>{material.excessMaterials}</td>
          <td>
            <Form.Check
              role={material.isCreatable ? "button" : ""}
              checked={props.crafitng[openId]}
              disabled={isCheckable}
              id={"check_" + id}
              key={"check_" + id}
              type="switch"
              onClick={() => handleCheck(material, "col_" + id, "card_" + id)}
            />
          </td>

          {props.advancedMode && (
            <>
              <td>
                <Form.Group controlId={`me_${id}`}>
                  <Form.Control
                    type="number"
                    disabled={
                      !material.isCreatable || material.activityId == 11
                    }
                    min={0}
                    name={`me_${id}`}
                    placeholder="0"
                    defaultValue={
                      material.activityId == 11
                        ? 0
                        : inputValues[`me_${id}`]
                        ? inputValues[`me_${id}`]
                        : 10
                    }
                    onChange={(e) => handleInputChange(material, e)}
                  />
                </Form.Group>
              </td>
              <td>
                {" "}
                <Form.Group controlId={`build_${id}`}>
                  <Form.Select
                    disabled={!material.isCreatable}
                    aria-label="Default select example"
                    defaultValue={
                      inputValues[`build_${id}`]
                        ? inputValues[`build_${id}`]
                        : material.activityId == 11
                        ? 5
                        : props.formData.building
                    }
                    onChange={(e) => handleInputChange(material, e)}
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
              </td>
              <td>
                {" "}
                <Form.Group controlId={`rig_${id}`}>
                  <Form.Select
                    disabled={!material.isCreatable}
                    aria-label="Default select example"
                    defaultValue={
                      inputValues[`rig_${id}`]
                        ? inputValues[`rig_${id}`]
                        : props.formData.buildingRig
                    }
                    onChange={(e) => handleInputChange(material, e)}
                  >
                    <option hidden>Select Building Rig</option>
                    <option value="0">No</option>
                    <option value="1">T1</option>
                    <option value="2">T2</option>
                  </Form.Select>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Typeahead
                    id={`system_${id}`}
                    disabled={!material.isCreatable}
                    minLength={2}
                    defaultInputValue={
                      inputValues[`system_${id}`]
                        ? inputValues[`system_${id}`]
                        : props.formData.system
                    }
                    onChange={(selected) => {
                      setSystemValues((prevState) => ({
                        ...prevState,
                        [`system_${id}`]: selected[0],
                      }));
                      setSystem({
                        value: selected[0],
                        id: "system_" + id,
                        material: material,
                        parent_id: id,
                        colId: "col_" + id,
                      });
                    }}
                    options={props.optionsSys}
                    placeholder="System"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId={`facility_${id}`}>
                  <Form.Control
                    disabled={!material.isCreatable}
                    step={0.1}
                    defaultValue={
                      inputValues[`facility_${id}`]
                        ? inputValues[`facility_${id}`]
                        : props.formData.facilityTax
                    }
                    type="number"
                    min={0}

                    name={`facility_${id}`}
                    placeholder="0"
                    onChange={(e) => handleInputChange(material, e)}
                  />
                </Form.Group>
              </td>
            </>
          )}
        </tr>

        <Collapse
          id={colId}
          in={isOpen}
          onEnter={() => getSubmatsData(material, colId)}
          timeout={10}
        >
          <tr>
            <td colSpan={props.advancedMode ? 13 : 8}>
              <Table
                striped
                bordered
                hover
                size="sm"
                key={`card_${id}`}
                id={`card_${id}`}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Volume m³</th>
                    <th>Market Cost ISK</th>
                    <th>Craft Cost ISK</th>
                    <th>Excess</th>
                    <th>Buy / Craft</th>
                    {props.advancedMode && <th>BP ME</th>}
                    {props.advancedMode && <th>Building</th>}
                    {props.advancedMode && <th>Rig</th>}
                    {props.advancedMode && <th>System</th>}
                    {props.advancedMode && <th>Facility tax</th>}
                  </tr>
                </thead>
                <tbody>
                  {isLoaded && Array.isArray(material.materialsList) ? (
                    material.materialsList.map((mat, index) =>
                      render(id, mat, index)
                    )
                  ) : (
                    <Spinner animation="border"></Spinner>
                  )}
                </tbody>
              </Table>
            </td>
          </tr>
        </Collapse>
      </>
    );
  }
  // END RESULT
  return (
    <>
      {props.errorMessage ? (
        <Alert>{props.errorMessage}</Alert>
      ) : (
        displayResult()
      )}
    </>
  );
}

export default Calculator;

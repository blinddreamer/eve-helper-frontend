import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Alert  from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

import { GiBasket } from "react-icons/gi";
import AdvancedModeToggle from "../AdvancedModeToggle";
import axios from "axios";
function Calculator(props){
const [isCopied, setIsCopied] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [selectAll, setSelectAll] = useState({});

    function displayCommon(){
      let volumeFormat = new Intl.NumberFormat();
      let priceFormat = new Intl.NumberFormat("en-US");
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
          <>
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
              {volumeFormat.format(props.initialBlueprint.totalVolume) + " m³"}
              <p id="bpheader" />
              Crafting price:{" "}
              {props.initialBlueprint.craftPrice
                .toLocaleString("en-US", {
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
                    props.initialBlueprint.craftPrice
                     <
                  0
                    ? "redmilcho"
                    : "greenmilcho"
                }
              >
                {(
                  props.initialBlueprint.sellPrice -
                  props.initialBlueprint.craftPrice
                  
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
                     props.initialBlueprint.craftPrice
                     
                     <
                  0
                    ? "negativeprice"
                    : "positiveprice"
                }
              >
                {(
                  ((props.initialBlueprint.sellPrice -
                   
                      props.initialBlueprint.craftPrice
                      
                    ) /
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
          {generateOutputTables()}
          {props.fuelList.length>0 && generateTable(props.fuelList, "fuelPart")}
          {props.materialsList.filter(mat=> mat.tier ==="fuelPart").length>0 && generateTable(props.materialsList.filter(mat=> mat.tier ==="fuelPart"), 6)}
        
          <Modal size="sm" className="loadingModal" centered={true} show={isLoading}><span className="d-flex justify-content-center"><Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
            <span className="loading">Loading</span></span></Modal>
       </>)}
      </>
      
    )}
    
    function generateOutputTables() {
      let index = 1;
      const tables = [];
  
      while (props.materialsList.filter(mat => mat.tier == index).length > 0) {
          tables.push(generateTable(props.materialsList.filter(mat => mat.tier == index), index+1));
          index++;
      }
        return tables;
    }

    function handleCheck(material){
      material.checked = !material.checked;
      updateMaterialStats(material);
   
 }

 async function updateMaterialStats(material){
  let request = {
        requestId: props.requestId,
        blueprintName: material.name,
        runs: material.quantity,
        blueprintMe: material.activityId === 11 ? props.formDataReaction.blueprintMe : props.formDataPart.blueprintMe,
        building: material.activityId === 11 ? props.formDataReaction.building : props.formDataPart.building,
        buildingRig: material.activityId === 11 ? props.formDataReaction.buildingRig : props.formDataPart.buildingRig,
        system: material.activityId === 11 ? props.formDataReaction.system : props.formDataPart.system,
        facilityTax: material.activityId === 11 ? props.formDataReaction.facilityTax : props.formDataPart.facilityTax,
    };
      const response = await axios.post(props.backend + "update-type", request);
      props.setMaterialsList(response.data.blueprintResult);
      props.setInitialBlueprint(response.data.blueprintResult[0]);
      console.log(response.data.blueprintResult);
 
  }


   function generateTable(materialsList, tier){
      let volumeFormat = new Intl.NumberFormat();
      let priceFormat = new Intl.NumberFormat("en-US");
      let totalVolume = 0;
      let totalBuyCost = 0;
    return( 
    <>
    <Table 
      bordered
      hover
      size="sm">
      <thead>
          <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Volume m³</th>
              <th>Market Cost ISK per unit/total</th>
              <th>Activity</th>
              <th>Excess</th>
              <th>Buy / Craft</th>
          </tr>
      </thead>
      <tbody>
          {materialsList.map((mat, index) => (
            mat.quantity > 0 &&
            (mat.totalVolume)
            &&
            (mat.totalSellPrice)
            &&
              <tr key={index}>
                  <td><img src={mat.icon} loading="lazy" alt={mat.name} /></td>
                  <td>{mat.name}</td>
                  <td>{volumeFormat.format(mat.quantity)}</td>
                  <td>{volumeFormat.format(mat.totalVolume)}</td>
                  <td>{priceFormat.format(mat.sellPrice)} / {priceFormat.format(mat.totalSellPrice)}</td>
                  <td>{mat.activityId == 1 ? "component" : mat.activityId == 11 ? "reaction":"none"}</td>
                  <td>{mat.excessMaterials}</td>
                  <td>
                  <Form.Check
              role={mat.isCreatable ? "button" : ""}
              checked={mat.checked}
              disabled={!mat.isCreatable}
              id={mat.id}
              key={"key_"+ mat.id}
              type="switch"
              onClick={()=>handleCheck(mat)}
            />
                  </td>
              </tr>
          ))}
          <tr>
            <td>#</td>
            <td colSpan={2}>Total</td>
            <td>{volumeFormat.format(totalVolume)}</td>
            <td colSpan={3}>{priceFormat.format(totalBuyCost)}</td>
            <td>
            <Form.Check
              defaultChecked={false}
              key={"key_"+ tier}
              type="switch"
              onClick={(e)=>getParts(e)}
            />
            </td>
          </tr>
      </tbody>
  </Table>
  {props.initialBlueprint.materialsList && 
  <Button id={tier} onClick={(e)=>getParts(e)}> {isLoading[tier] ? (
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
        )}</Button>}
  </>);
  }
   
  function calculateQuantity(material){
    const quantity = material.materials
    .filter(quant => quant.active)
    .reduce((accumulator, mat) => {
      return (
        accumulator + mat.neededQuantity
      );
    }, 0);
    return quantity;
  }

    async function getSubmatsData(materialsList, tier) {
      try {
        // setIsLoading((prevState) => ({
        //   ...prevState,
        //   [tier]: !prevState[tier],
        // }));
        setIsLoading(true)
          // Create a copy of the state object
          const newMatList = tier === "fuelPart" ?  props.materialsList : [];
          const newFuelList = [];
          // Map through the keys of the object (assuming each key is a material)
          for (const key of Object.keys(materialsList)) {
              const mat = materialsList[key]; // Get the material object
            if (mat.tier < tier-1){
              mat.isFuel ?
              newFuelList.push(mat) :
              newMatList.push(mat);
              continue;  
            }
            if (mat.tier == tier-1 || mat.tier === "fuel"){
              mat.isFuel ?
              newFuelList.push(mat) :
              newMatList.push(mat);
              
            if (mat.isCreatable) {
                  
                  let request = {
                    blueprintName: mat.name,
                    runs: calculateQuantity(mat),
                    blueprintMe: mat.activityId === 11 ? props.formDataReaction.blueprintMe : props.formDataPart.blueprintMe,
                    building: mat.activityId === 11 ? props.formDataReaction.building : props.formDataPart.building,
                    buildingRig: mat.activityId === 11 ? props.formDataReaction.buildingRig : props.formDataPart.buildingRig,
                    system: mat.activityId === 11 ? props.formDataReaction.system : props.formDataPart.system,
                    facilityTax: mat.activityId === 11 ? props.formDataReaction.facilityTax : props.formDataPart.facilityTax,
                };
                  const response = await axios.post(props.backend + "type", request);
  
                  const materials = response.data.materialsList.map(subMat => {
                      subMat.tier = subMat.isFuel ? "fuel" : tier;
                      subMat.checked = false;
                      let existingMaterial = null;
                      subMat.isFuel ?
                      existingMaterial = newFuelList.find((item) => item.name === subMat.name) : 
                      existingMaterial = newMatList.find((item) => item.name === subMat.name);
                      let parrentMatQuantity = {materialId: mat.name, neededQuantity: subMat.quantity, active: mat.checked}
                      if (existingMaterial) {
                          existingMaterial.materials.push(parrentMatQuantity)
                          existingMaterial.quantity= calculateQuantity(existingMaterial);
                          existingMaterial.jobsCount = Math.ceil(existingMaterial.quantity/existingMaterial.craftQuantity);
                      } else {
                      
                           let materialId = subMat.id;
                           let materialToAdd = {materialId: materialId, materials: [parrentMatQuantity], tier: tier, volume: subMat.volume, icon: subMat.icon, price: subMat.sellPrice, 
                            name:subMat.name, activityId: subMat.activityId, craftQuantity: subMat.craftQuantity, isCreatable: subMat.isCreatable, checked: false,
                          jobsCount: subMat.jobsCount}
                        
                        subMat.isFuel ?
                        newFuelList.push(materialToAdd) :
                        newMatList.push(materialToAdd);
                      }
                      return subMat;
                  });
                   // Update the materials list with the new materials
                 //mat.materialsList = materials;
                }
                 
              }
          }
  
          // Update the state with the updated object
          
          props.setMaterialsList(newMatList);
          console.log(props.materialsList);
          props.setFuelList(newFuelList);
          // All requests completed successfully
          console.log("All requests completed successfully");
      } catch (error) {
          console.error("Error:", error.message);
          props.setErrorMessage(error.message);
      } finally {
        // setIsLoading((prevState) => ({
        //   ...prevState,
        //   [tier]: !prevState[tier],
        // }));
        setIsLoading(false);
      }
  }
      
    return (
<>
      {props.errorMessage ? (
        <Alert>{props.errorMessage}</Alert>
      ) : (
        displayCommon()
        
      )}
      
      </>
    )
}
export default Calculator;
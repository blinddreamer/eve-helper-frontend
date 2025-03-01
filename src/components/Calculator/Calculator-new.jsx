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
import { a } from "framer-motion/client";
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
         {checkForFuel(props.materialsList) && generateTable(props.materialsList, 105, true)}
        
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
      let index = 0;
      const tables = [];
  
      while (props.materialsList.filter(mat => mat.tier == index).length > 0) {
          tables.push(generateTable(props.materialsList.filter(mat => mat.tier == index && mat.selectedForCraft), index+1, false));
          index++;
      }
        return tables;
    }

    function handleCheck(material){
      props.setCheckedItems(prev => ({
        ...prev,
        [material.id]: !prev[material.id] // Toggle check state
      }));
      material.checked = !material.checked;
      updateMaterialStats(material);
   
 }

 function handleMassCheck(tier){
  const materials = props.materialsList
  .filter(mat => mat.tier === tier - 1 && mat.isCreatable)   // Filter by tier
  .flatMap(mat => mat.materialsList)
  .filter(mat => mat.isCreatable && mat.activityId!==105 && (!props.checkedItems[mat.id] || props.checkedItems["all_"+tier]))
  .reduce((acc, mat) => {
    const existing = acc.find(item => item.name === mat.name);
    if (existing) {
      existing.quantity += mat.quantity; // Merge duplicates by summing quantity (if applicable)
    } else {
      acc.push({ ...mat });
    }
    return acc;
  }, []);
  props.setCheckedItems(prev => 
    materials
      .reduce((acc, mat) => {
        acc[mat.id] = !prev[mat.id]; // Toggle check state
        return acc;
      }, { ...prev }) // Preserve previous state
  );
  massUpdateMaterialStats(materials);  
  props.setCheckedItems(prev => ({
    ...prev,
    ["all_"+tier]: !prev["all_"+tier] // Toggle check state
  }));
 }

 async function updateMaterialStats(material){
  setIsLoading(true)
  let request = {
        requestId: props.requestId,
        blueprintName: material.name,
        tier: material.tier,
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
      setIsLoading(false)
 
  }

  async function massUpdateMaterialStats(materials){
    setIsLoading(true)
    let requests = materials.map(material=> ({
          requestId: props.requestId,
          blueprintName: material.name,
          tier: material.tier,
          blueprintMe: material.activityId === 11 ? props.formDataReaction.blueprintMe : props.formDataPart.blueprintMe,
          building: material.activityId === 11 ? props.formDataReaction.building : props.formDataPart.building,
          buildingRig: material.activityId === 11 ? props.formDataReaction.buildingRig : props.formDataPart.buildingRig,
          system: material.activityId === 11 ? props.formDataReaction.system : props.formDataPart.system,
          facilityTax: material.activityId === 11 ? props.formDataReaction.facilityTax : props.formDataPart.facilityTax,
      }));
        const response = await axios.post(props.backend + "mass-update-type", requests);
        props.setMaterialsList(response.data.blueprintResult);
        props.setInitialBlueprint(response.data.blueprintResult[0]);
        console.log(response.data.blueprintResult);
        setIsLoading(false)
   
    }

    function isMassUpdateClickable(tier) {
      return props.materialsList.some(mat => 
        mat.tier === tier -1 && mat.isCreatable && 
        mat.materialsList.some(subMat => subMat.isCreatable)
      );
    }

   function generateTable(materialsList, tier, isFuel){
      let volumeFormat = new Intl.NumberFormat();
      let priceFormat = new Intl.NumberFormat("en-US");
      let totalVolume = 0;
      let totalBuyCost = 0;

      const mergedMaterials = materialsList
      .flatMap(mat => 
        mat.materialsList
          .filter(subMat => isFuel ? subMat.tier==105 : subMat.tier !== 105) // Exclude tier 105 materials
          .map(subMat => ({
            ...subMat,
            parentName: mat.name,
            parentId: mat.id
          }))
      )
      .reduce((acc, mat) => {
        const existing = acc.find(m => m.name === mat.name);
        if (existing) {
          existing.quantity += mat.quantity;  // Sum up the quantities
        } else {
          acc.push({ ...mat }); // Add new material
        }
        return acc;
      }, []);
      if (materialsList.length === 0) {
        return null;  // or return undefined; based on your needs
    }
      return( 
    <>
    {!isFuel &&
    <p>
  You will need the following parts to craft:{" "}
  {props.materialsList
    .filter(mat => mat.tier === tier-1)
    .map(mat => mat.name + " x " + mat.quantity)
    .join(", ")}
</p>}
{isFuel && 
  <p>
    You will need the following Fuel {" "}
    </p>}
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
          {mergedMaterials.map((mat, index) => (
            mat.quantity > 0 &&
            
              <tr key={index}>
                  <td><img src={mat.icon} loading="lazy" alt={mat.name} /></td>
                  <td>{mat.name}</td>
                  <td>{volumeFormat.format(calculateQuantity(props.materialsList, mat.name))}</td>
                  <td>{volumeFormat.format(mat.volume*calculateQuantity(props.materialsList, mat.name))}</td>
                  <td>{priceFormat.format(mat.price)} / {priceFormat.format(mat.price*calculateQuantity(props.materialsList, mat.name))}</td>
                  <td>{mat.activityId == 1 ? "component" : mat.activityId == 11 ? "reaction": mat.activityId == 105 ? "fuel" :"none"}</td>
                  <td>{0}</td>
                  <td>
                  <Form.Check
              role={mat.isCreatable ? "button" : ""}
              defaultChecked={false}
              checked={props.checkedItems[mat.id] || false}
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
              disabled = {!isMassUpdateClickable(tier)}
              key={"key_"+ tier}
              checked={props.checkedItems["all_"+tier]}
              type="switch"
              onClick={()=>handleMassCheck(tier)}
            />
            </td>
          </tr>
      </tbody>
  </Table>
  {/* {props.initialBlueprint.materialsList && 
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
        )}</Button>} */}
  </>);
  }
   
  function calculateQuantity(originalData, blueprintName) {
    return originalData
        .filter(mat => mat.selectedForCraft && mat.materialsList.some(m => m.name === blueprintName))
        .flatMap(mat => mat.materialsList)
        .filter(m => m.name === blueprintName)
        .map(m => m.quantity)
        .reduce((sum, qty) => sum + qty, 0);
}

function checkForFuel(originalData) {
  return originalData.filter(mat=> mat.selectedForCraft)
    .some(mat => 
    mat.materialsList.some(m => m.activityId === 105)
  );
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
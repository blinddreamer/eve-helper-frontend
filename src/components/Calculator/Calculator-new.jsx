import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import { GiBasket } from "react-icons/gi";
import axios from "axios";

function Calculator(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Array.isArray(props.materialsList) || props.materialsList.length === 0)
      return;

    const newCheckedStatus = {};

    props.materialsList.forEach((mat) => {
      const isChecked = massUpdateStatus(mat.tier);
      newCheckedStatus["all_" + mat.tier] = isChecked;
    });

    props.setCheckedItems((prev) => ({ ...prev, ...newCheckedStatus }));
  }, [props.materialsList]); // Runs when materialsList changes

  // Display blueprint info window
  function displayCommon() {
    let volumeFormat = new Intl.NumberFormat();
    let priceFormat = new Intl.NumberFormat("en-US");

    return (
      <>
        {!props.initialBlueprint.materialsList && (
          <div id="start-message">
            <Alert variant="success">
              Choose blueprint or reaction formula to start. If advanced mode is
              enabled please fill the required fields for better calculations.
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
                {volumeFormat.format(props.initialBlueprint.totalVolume) +
                  " m³"}
                <p id="bpheader" />
                Crafting price:{" "}
                {props.initialBlueprint.craftPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "ISK",
                  minimumFractionDigits: 2,
                })}{" "}
                <p id="bpheader" />
                Sell order :{" "}
                {props.initialBlueprint.totalSellPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "ISK",
                  minimumFractionDigits: 2,
                })}
                <p id="bpheader" />
                Profit :{" "}
                <span
                  className={
                    props.initialBlueprint.totalSellPrice -
                      props.initialBlueprint.craftPrice <
                    0
                      ? "redmilcho"
                      : "greenmilcho"
                  }
                >
                  {(
                    props.initialBlueprint.totalSellPrice -
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
                    props.initialBlueprint.totalSellPrice -
                      props.initialBlueprint.craftPrice <
                    0
                      ? "negativeprice"
                      : "positiveprice"
                  }
                >
                  {(
                    ((props.initialBlueprint.totalSellPrice -
                      props.initialBlueprint.craftPrice) /
                      props.initialBlueprint.totalSellPrice) *
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
                  {!props.isCopied["copy_" + props.initialBlueprint.name] ? (
                    <>
                      <GiBasket /> Copy Mats
                    </>
                  ) : (
                    "Copied"
                  )}
                </Button>
                <p />
              </div>
            </div>
            {generateOutputTables()}
            {checkForFuel(props.materialsList) &&
              generateTable(props.materialsList, 105, true)}

            <Modal
              size="sm"
              className="loadingModal"
              centered={true}
              show={isLoading}
            >
              <span className="d-flex justify-content-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
                <span className="loading">Loading</span>
              </span>
            </Modal>
          </>
        )}
      </>
    );
  }

  // Generate the material tables based on how many tiers are presented
  function generateOutputTables() {
    let index = 0;
    const tables = [];

    while (props.materialsList.filter((mat) => mat.tier == index).length > 0) {
      tables.push(
        generateTable(
          props.materialsList.filter(
            (mat) => mat.tier == index && mat.selectedForCraft
          ),
          index + 1,
          false
        )
      );
      index++;
    }
    return tables;
  }

  function handleCheck(material) {
    props.setCheckedItems((prev) => ({
      ...prev,
      [material.id]: !prev[material.id], // Toggle check state
    }));
    updateMaterialStats(material);
  }

  function handleMassCheck(tier) {
    const materials = props.materialsList
      .filter((mat) => mat.tier === tier - 1 && mat.isCreatable) // Filter by tier
      .flatMap((mat) => mat.materialsList)
      .filter(
        (mat) =>
          mat.isCreatable &&
          mat.activityId !== 105 &&
          ((!props.checkedItems[mat.id] &&
            !props.checkedItems["all_" + tier]) ||
            (props.checkedItems["all_" + tier] && props.checkedItems[mat.id]))
      )
      .reduce((acc, mat) => {
        const existing = acc.find((item) => item.name === mat.name);
        if (existing) {
          existing.quantity += mat.quantity; // Merge duplicates by summing quantity (if applicable)
        } else {
          acc.push({ ...mat });
        }
        return acc;
      }, []);
    props.setCheckedItems(
      (prev) =>
        materials.reduce(
          (acc, mat) => {
            acc[mat.id] = !prev[mat.id]; // Toggle check state
            return acc;
          },
          { ...prev }
        ) // Preserve previous state
    );
    if (materials.length != 0) {
      massUpdateMaterialStats(materials);
    }
    props.setCheckedItems((prev) => ({
      ...prev,
      ["all_" + tier]: !prev["all_" + tier], // Toggle check state
    }));
  }

  // GENERATE TABLE
  function generateTable(materialsList, tier, isFuel) {
    let volumeFormat = new Intl.NumberFormat();
    let priceFormat = new Intl.NumberFormat("en-US");
    const mergedMaterials = materialsList
      .flatMap((mat) =>
        mat.materialsList
          .filter((subMat) =>
            isFuel ? subMat.tier == 105 : subMat.tier !== 105
          ) // Exclude tier 105 materials
          .map((subMat) => ({
            ...subMat,
            parentName: mat.name,
            parentId: mat.id,
          }))
      )
      .reduce((acc, mat) => {
        const existing = acc.find((m) => m.name === mat.name);
        if (existing) {
          existing.quantity += mat.quantity; // Sum up the quantities
        } else {
          acc.push({ ...mat }); // Add new material
        }
        return acc;
      }, []);
    let totalVolume = mergedMaterials
      .map(
        (mat) => mat.volume * calculateQuantity(props.materialsList, mat.name)
      )
      .reduce((sum, volume) => sum + volume, 0);
    let totalBuyCost = mergedMaterials
      .map(
        (mat) => mat.price * calculateQuantity(props.materialsList, mat.name)
      )
      .reduce((sum, price) => sum + price, 0);
    if (materialsList.length === 0) {
      return null; // or return undefined; based on your needs
    }
    return (
      <>
        {!isFuel && (
          <p>
            You will need the following parts to craft:{" "}
            {props.materialsList
              .filter((mat) => mat.tier === tier - 1 && mat.selectedForCraft)
              .map(
                (mat) =>
                  mat.name +
                  " x " +
                  calculateQuantity(props.materialsList, mat.name)
              )
              .join(", ")}
          </p>
        )}
        {isFuel && <p>You will need the following Fuel Blocks </p>}
        <Table key={"tab_" + tier} bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Volume m³</th>
              <th>Market Cost ISK per unit/total</th>
              <th>Type</th>
              <th>Excess</th>
              <th>Buy / Craft</th>
            </tr>
          </thead>
          <tbody>
            {mergedMaterials.map(
              (mat, index) =>
                mat.quantity > 0 && (
                  <tr key={"tr_" + index}>
                    <td key={"td_img" + index}>
                      <img src={mat.icon} loading="lazy" alt={mat.name} />
                    </td>
                    {props.materialsList.some((bp) => bp.name === mat.name) ? (
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Popover id={`popover-${mat.id}`}>
                            <Popover.Header as="h3">
                              Materials for {mat.name} x{" "}
                              {calculateQuantity(props.materialsList, mat.name)}
                            </Popover.Header>
                            <Popover.Body>
                              <Table striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th>Material</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>{showTooltipTableInfo(mat)}</tbody>
                              </Table>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <td key={`td_name_${index}`}>{mat.name}</td>
                      </OverlayTrigger>
                    ) : (
                      <td key={`td_name_${index}`}>{mat.name}</td>
                    )}
                    <td key={"td_quant" + index}>
                      {volumeFormat.format(
                        calculateQuantity(props.materialsList, mat.name)
                      )}
                    </td>
                    <td key={"td_vol" + index}>
                      {volumeFormat.format(
                        mat.volume *
                          calculateQuantity(props.materialsList, mat.name)
                      )}
                    </td>
                    <td key={"td_price" + index}>
                      {priceFormat.format(mat.price)} /{" "}
                      {priceFormat.format(
                        mat.price *
                          calculateQuantity(props.materialsList, mat.name)
                      )}
                    </td>
                    <td key={"td_activity" + index}>
                      {mat.activityId == 1
                        ? "component"
                        : mat.activityId == 11
                        ? "reaction"
                        : mat.activityId == 105
                        ? "fuel"
                        : "none"}
                    </td>
                    <td key={"td_excess" + index}>{getExcess(mat)}</td>
                    <td key={"td_checkBox" + index}>
                      <OverlayTrigger
                        placement="right" // Position of tooltip
                        overlay={
                          !props.isAdvancedCalc ? (
                            <Tooltip id="checkbox-tooltip">
                              Enter Advanced mode and recalculate to enable
                            </Tooltip>
                          ) : mat.isCreatable ? (
                            mat.activityId == 105 ? (
                              <Tooltip id="checkbox-tooltip">
                                Fuel support is comming soon
                              </Tooltip>
                            ) : (
                              <Tooltip id="checkbox-tooltip">
                                Click to add/remove item from crafting
                                calculations
                              </Tooltip>
                            )
                          ) : (
                            <Tooltip id="checkbox-tooltip">
                              Item not creatable
                            </Tooltip>
                          )
                        }
                      >
                        <span>
                          <Form.Check
                            role={mat.isCreatable ? "button" : ""}
                            checked={getIsChecked(mat)}
                            disabled={
                              !props.isAdvancedCalc ||
                              !mat.isCreatable ||
                              mat.tier == 105
                            }
                            id={mat.id}
                            key={"key_" + mat.id}
                            type="switch"
                            onChange={() => handleCheck(mat)}
                          />
                        </span>
                      </OverlayTrigger>
                    </td>
                  </tr>
                )
            )}
            <tr>
              <td>#</td>
              <td colSpan={2}>Total</td>
              <td>{volumeFormat.format(totalVolume) + " m³"}</td>
              <td colSpan={3}>
                {totalBuyCost.toLocaleString("en-US", {
                  style: "currency",
                  currency: "ISK",
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                <OverlayTrigger
                  placement="right" // Position of tooltip
                  overlay={
                    !props.isAdvancedCalc ? (
                      <Tooltip id="checkbox-tooltip">
                        Enter Advanced mode and recalculate to enable
                      </Tooltip>
                    ) : tier == 105 ? (
                      <Tooltip id="checkbox-tooltip">
                        Fuel support is comming soon
                      </Tooltip>
                    ) : isMassUpdateClickable(tier) ? (
                      <Tooltip id="checkbox-tooltip">
                        Click to add/remove all items from crafting calculations
                      </Tooltip>
                    ) : (
                      <Tooltip id="checkbox-tooltip">
                        No craftable materials
                      </Tooltip>
                    )
                  }
                >
                  <span>
                    <Form.Check
                      disabled={
                        !props.isAdvancedCalc ||
                        !isMassUpdateClickable(tier) ||
                        tier == 105
                      }
                      key={"key_check" + tier}
                      checked={props.checkedItems["all_" + tier]}
                      type="switch"
                      onChange={() => handleMassCheck(tier)}
                    />
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }

  // COPY FUNCTION
  function generateCopyText(materials) {
    let copyText = "";
    let visited = new Set(); // Track already copied materials

    materials.forEach((mat) => {
      copyText = checkMatsToCopyRecursive(mat.materialsList, copyText, visited);
    });

    return copyText;
  }

  function checkMatsToCopyRecursive(materials, copyText, visited) {
    materials.forEach((mat) => {
      if (visited.has(mat.name)) return; // Skip duplicates

      const skipCopy = props.materialsList.find(
        (bp) => bp.name === mat.name && bp.selectedForCraft
      );

      if (!skipCopy) {
        copyText += `${mat.name} x${calculateQuantity(
          props.materialsList,
          mat.name
        )} \n`;
        visited.add(mat.name); // Mark as copied
      } else {
        copyText = checkMatsToCopyRecursive(
          skipCopy.materialsList,
          copyText,
          visited
        );
      }
    });

    return copyText;
  }

  async function handleMultiBuyCopy(id) {
    try {
      await navigator.clipboard.writeText(
        generateCopyText(
          props.materialsList.filter((mat) => mat.selectedForCraft)
        )
      );
      console.log("Text copied");
      props.setIsCopied({ [id]: true });
    } catch {
      console.error("Error copying text: ", error);
      alert("Failed to copy text.");
    }
  }

  // HELPING FUNCTIONS
  async function updateMaterialStats(material) {
    setIsLoading(true);
    let request = {
      requestId: props.requestId,
      blueprintName: material.name,
      tier: material.tier,
      blueprintMe:
        material.activityId === 11
          ? props.formDataReaction.blueprintMe
          : props.formDataPart.blueprintMe,
      building:
        material.activityId === 11
          ? props.formDataReaction.building
          : props.formDataPart.building,
      buildingRig:
        material.activityId === 11
          ? props.formDataReaction.buildingRig
          : props.formDataPart.buildingRig,
      system:
        material.activityId === 11
          ? props.formDataReaction.system
          : props.formDataPart.system,
      facilityTax:
        material.activityId === 11
          ? props.formDataReaction.facilityTax
          : props.formDataPart.facilityTax,
    };
    try {
      const response = await axios.post(props.backend + "update-type", request);
      props.setMaterialsList(response.data.blueprintResult);
      props.setInitialBlueprint(response.data.blueprintResult[0]);
    } catch (error) {
      console.error("Error updating material stats:", error);
      navigate("/error", { state: { message: error.message } });
    } finally {
      setIsLoading(false);
    }

    // console.log(response.data.blueprintResult);
  }

  async function massUpdateMaterialStats(materials) {
    setIsLoading(true);
    let requests = materials.map((material) => ({
      requestId: props.requestId,
      blueprintName: material.name,
      tier: material.tier,
      blueprintMe:
        material.activityId === 11
          ? props.formDataReaction.blueprintMe
          : props.formDataPart.blueprintMe,
      building:
        material.activityId === 11
          ? props.formDataReaction.building
          : props.formDataPart.building,
      buildingRig:
        material.activityId === 11
          ? props.formDataReaction.buildingRig
          : props.formDataPart.buildingRig,
      system:
        material.activityId === 11
          ? props.formDataReaction.system
          : props.formDataPart.system,
      facilityTax:
        material.activityId === 11
          ? props.formDataReaction.facilityTax
          : props.formDataPart.facilityTax,
    }));
    try {
      const response = await axios.post(
        props.backend + "mass-update-type",
        requests
      );
      props.setMaterialsList(response.data.blueprintResult);
      props.setInitialBlueprint(response.data.blueprintResult[0]);
      //    console.log(response.data.blueprintResult);
    } catch {
      console.error("Error updating material stats:", error);
      navigate("/error", { state: { message: error.message } });
    } finally {
      setIsLoading(false);
    }
  }

  function isMassUpdateClickable(tier) {
    return props.materialsList.some(
      (mat) =>
        mat.tier === tier - 1 &&
        mat.isCreatable &&
        mat.materialsList.some(
          (subMat) => subMat.isCreatable && subMat.tier !== 105
        )
    );
  }

  function calculateQuantity(originalData, blueprintName) {
    return originalData
      .filter(
        (mat) =>
          mat.selectedForCraft &&
          mat.materialsList.some((m) => m.name === blueprintName)
      )
      .flatMap((mat) => mat.materialsList)
      .filter((m) => m.name === blueprintName)
      .map((m) => m.quantity)
      .reduce((sum, qty) => sum + qty, 0);
  }
  function getIsChecked(material) {
    return props.materialsList.some(
      (mat) => mat.name === material.name && mat.selectedForCraft
    );
  }

  function showTooltipTableInfo(mat) {
    const foundMaterial = props.materialsList.find(
      (bp) => bp.name === mat.name
    );

    if (!foundMaterial || !foundMaterial.materialsList?.length) {
      return (
        <tr>
          <td colSpan="2">No materials available</td>
        </tr>
      );
    }

    return foundMaterial.materialsList.map((m) => (
      <tr key={m.id}>
        <td>
          <img src={m.icon} loading="lazy" alt={m.name} />
          {m.name}
        </td>
        <td>{m.quantity}</td>
      </tr>
    ));
  }

  function massUpdateStatus(tier) {
    return props.materialsList
      .filter((mat) => mat.tier === tier - 1) // Get materials from previous tier
      .flatMap((mat) => mat.materialsList)
      .filter((mat) => mat.isCreatable) // Flatten their required materials
      .every((mat) => {
        const bp = props.materialsList.find((bp) => bp.name === mat.name);
        return bp ? bp.selectedForCraft : false; // Prevent undefined errors
      });
  }

  function getExcess(material) {
    const foundMat = props.materialsList.find(
      (mat) => mat.name === material.name && mat.selectedForCraft
    );
    if (!foundMat) return 0;

    return foundMat.craftQuantity > 1
      ? foundMat.craftQuantity * foundMat.jobsCount -
          calculateQuantity(props.materialsList, material.name)
      : 0;
  }

  function checkForFuel(originalData) {
    return originalData
      .filter((mat) => mat.selectedForCraft)
      .some((mat) => mat.materialsList.some((m) => m.activityId === 105));
  }

  return (
    <>
      {props.errorMessage ? (
        <Alert>{props.errorMessage}</Alert>
      ) : (
        displayCommon()
      )}
    </>
  );
}
export default Calculator;

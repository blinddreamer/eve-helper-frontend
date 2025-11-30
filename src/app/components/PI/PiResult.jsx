"use client";
import { useMemo } from "react";
import Table from "react-bootstrap/Table";

function PiResult(props) {
  const {
    piList,
    selectedItem,
    basicFactory,
    advancedFactory,
    specialFactory,
    volume,
  } = props;

  // Calculate the production chain
  const productionChain = useMemo(() => {
    if (!selectedItem || !piList.length) return [];

    const selectedPi = piList.find((pi) => pi.name === selectedItem);
    if (!selectedPi) return [];

    const results = [];

    // Recursive function to calculate requirements
    const calculateRequirements = (itemId, requiredQuantity, depth = 0) => {
      const item = piList.find((pi) => pi.id === itemId);
      if (!item || item.type === 0) return; // Skip planets (T0)

      // Determine factory count based on tier
      // T1 = raw materials (no factory needed, bought from market)
      // T2 = Basic factories
      // T3 = Advanced factories
      // T4/T5 = Special factories
      let factoryCount = 1;
      if (item.type === 2) factoryCount = basicFactory || 1;
      else if (item.type === 3) factoryCount = advancedFactory || 1;
      else if (item.type === 4) factoryCount = specialFactory || 1;

      // Calculate production cycles needed
      const outputPerCycle = item.quantity || 1;
      const cyclesNeeded = Math.ceil(requiredQuantity / outputPerCycle);

      // Calculate time (cycles run in parallel across factories)
      // Each factory handles its portion of cycles
      const cyclesPerFactory = Math.ceil(cyclesNeeded / factoryCount);
      const totalTime = item.cycleTime ? cyclesPerFactory * item.cycleTime : 0;

      // Calculate actual output (might be more than required due to rounding)
      const actualOutput = cyclesNeeded * outputPerCycle;

      // Calculate total price for all items
      const totalPrice = (item.price || 0) * requiredQuantity;

      results.push({
        id: item.id,
        name: item.name,
        tier: item.type,
        icon: item.icon,
        requiredQuantity,
        actualOutput,
        cycleTime: item.cycleTime || 0,
        cyclesNeeded,
        factoryCount,
        cyclesPerFactory,
        totalTime,
        depth,
        price: item.price || 0,
        totalPrice,
      });

      // Process dependencies
      if (item.dependencies && item.dependencies.length > 0) {
        item.dependencies.forEach((dep) => {
          if (dep.isInput && dep.quantity) {
            // Calculate how much of this dependency we need
            const depQuantityNeeded = dep.quantity * cyclesNeeded;
            calculateRequirements(dep.typeID, depQuantityNeeded, depth + 1);
          }
        });
      }
    };

    calculateRequirements(selectedPi.id, volume);

    // Sort by tier (type) in descending order (T4 -> T3 -> T2 -> T1)
    return results.sort((a, b) => b.tier - a.tier);
  }, [
    selectedItem,
    piList,
    volume,
    basicFactory,
    advancedFactory,
    specialFactory,
  ]);

  // Format time from seconds to readable format
  const formatTime = (seconds) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const getTierName = (type) => {
    const tiers = ["T0", "T1", "T2", "T3", "T4"];
    return tiers[type] || "Unknown";
  };

  const getFactoryType = (tier) => {
    if (tier === 1) return "N/A"; // T1 is raw materials, no factory
    if (tier === 2) return "Basic";
    if (tier === 3) return "Advanced";
    if (tier === 4) return "Special";
    return "N/A";
  };

  // Calculate total T1 cost (must be before early returns)
  const totalT1Cost = useMemo(() => {
    return productionChain
      .filter((item) => item.tier === 1)
      .reduce((sum, item) => sum + item.totalPrice, 0);
  }, [productionChain]);

  // Calculate total build time by summing up each tier's total time
  const totalBuildTime = useMemo(() => {
    if (productionChain.length === 0) return 0;

    // Group by tier and sum times within each tier
    const tierTimes = {};
    productionChain.forEach((item) => {
      if (!tierTimes[item.tier]) {
        tierTimes[item.tier] = 0;
      }
      tierTimes[item.tier] += item.totalTime;
    });

    // Sum all tier times
    return Object.values(tierTimes).reduce((sum, time) => sum + time, 0);
  }, [productionChain]);

  if (!selectedItem) {
    return (
      <div
        role="alert"
        class="fade alert alert-success show"
        id="piResult"
        style={{ marginTop: "20px", fontSize: "1rem" }}
      >
        <span>Select an end material to see production requirements</span>
      </div>
    );
  }

  if (productionChain.length === 0) {
    return (
      <div id="piResult" style={{ marginTop: "20px" }}>
        <p>No production data available for selected material</p>
      </div>
    );
  }

  const formatISK = (amount) => {
    return (
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) + " ISK"
    );
  };

  return (
    <div id="piResult" style={{ marginTop: "20px" }}>
      {totalT1Cost > 0 && (
        <div id="gnomagpt">
          <span id="gnomagps1">
            <strong>Total T1 Material Cost: {formatISK(totalT1Cost)}</strong>
          </span>
          <span id="gnomagps1">
            <strong>Total Build Time: {formatTime(totalBuildTime)}</strong>
          </span>
        </div>
      )}

      <span id="bakteria">Production Requirements for {selectedItem}</span>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Material</th>
            <th>Tier</th>
            <th>Factory Type</th>
            <th>Required Qty</th>
            <th>Actual Output</th>
            <th>Cycles Needed</th>
            <th>Factory Count</th>
            <th>Cycles/Factory</th>
            <th>Cycle Time</th>
            <th>Total Time</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            const rows = [];
            let currentTier = null;

            productionChain.forEach((item, index) => {
              // Add separator row BEFORE starting a new tier (showing what's needed to build this tier)
              if (currentTier !== item.tier) {
                // Calculate totals for the NEW tier we're about to show
                const tierItemsPrice = productionChain.filter(
                  (i) => i.tier === item.tier - 1
                );
                const tierItemsTime = productionChain.filter(
                  (i) => i.tier === item.tier
                );
                const tierTotalPrice = tierItemsPrice.reduce(
                  (sum, i) => sum + i.totalPrice,
                  0
                );
                // Total build time = sum of all individual times (sequential production with given factories)
                let factoryCount = 1;
                if (item.tier === 2) factoryCount = basicFactory || 1;
                else if (item.tier === 3) factoryCount = advancedFactory || 1;
                else if (item.tier === 4) factoryCount = specialFactory || 1;
                const availableCyclePerJob = Math.ceil(
                  tierItemsTime.reduce((sum, i) => sum + i.cyclesNeeded, 0) /
                    factoryCount
                );
                const tierTotalTime = availableCyclePerJob * item.cycleTime;

                rows.push(
                  <tr
                    key={`separator-${item.tier}`}
                    style={{
                      backgroundColor: "var(--bs-warning)",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    <td colSpan="11" style={{ padding: "10px 15px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <strong>
                          Total {getTierName(item.tier - 1)} Material Cost:{" "}
                          {tierTotalPrice > 0 ? formatISK(tierTotalPrice) : "-"}
                        </strong>
                        <strong>
                          Total {getTierName(item.tier)} Build Time:{" "}
                          {formatTime(tierTotalTime)}
                        </strong>
                      </div>
                    </td>
                  </tr>
                );

                currentTier = item.tier;
              }

              // Add the item row
              rows.push(
                <tr key={`${item.id}-${index}`}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        style={{ width: "24px" }}
                      />
                      <span style={{ paddingLeft: `${item.depth * 20}px` }}>
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td>{getTierName(item.tier)}</td>
                  <td>{getFactoryType(item.tier)}</td>
                  <td>{item.requiredQuantity.toLocaleString()}</td>
                  <td>{item.actualOutput.toLocaleString()}</td>
                  <td>{item.cyclesNeeded}</td>
                  <td>{item.factoryCount}</td>
                  <td>{item.cyclesPerFactory}</td>
                  <td>{formatTime(item.cycleTime)}</td>
                  <td>{formatTime(item.totalTime)}</td>
                  <td>
                    {item.totalPrice > 0 ? (
                      <strong>{formatISK(item.totalPrice)}</strong>
                    ) : (
                      <span style={{ color: "#6c757d" }}>-</span>
                    )}
                  </td>
                </tr>
              );
            });

            return rows;
          })()}
        </tbody>
      </Table>
    </div>
  );
}

export default PiResult;

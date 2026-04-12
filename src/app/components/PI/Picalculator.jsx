"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import PiForm from "./PiForm";
import PiResult from "./PiResult";

export default function Picalculator() {
  const [piList, setPiList] = useState([]);
  const [hoveredResource, setHoveredResource] = useState(null);
  const [hoveredDependencies, setHoveredDependencies] = useState(new Set());
  const [hoveredDependents, setHoveredDependents] = useState(new Set());
  const [selectedItem, setSelectedItem] = useState(null);
  const [volume, setVolume] = useState(1);
  const [basicFactory, setBasicFactory] = useState(1);
  const [advancedFactory, setAdvancedFactory] = useState(1);
  const [specialFactory, setSpecialFactory] = useState(1);
  const [selectedPi, setSelectedPi] = useState(null);

  const backend = process.env.NEXT_PUBLIC_API_URL;

  // Update chain highlighting when selectedItem changes
  useEffect(() => {
    if (selectedItem && piList.length > 0) {
      const selected = piList.find((pi) => pi.name === selectedItem);
      if (selected) {
        const dependencies = new Set();
        const dependents = new Set();
        findAllDependencies(selected.id, dependencies);
        findAllDependents(selected.id, dependents);
        setHoveredDependencies(dependencies);
        setHoveredDependents(dependents);
      }
    } else {
      setHoveredDependencies(new Set());
      setHoveredDependents(new Set());
    }
  }, [selectedItem, piList]);

  const categories = ["T1", "T2", "T3", "T4", "T5"];

  useEffect(() => {
    const fetchPiData = async () => {
      try {
        const response = await axios.get(backend + "pi");
        if (response.status === 200) {
          setPiList(response.data);
        } else {
          throw new Error(`Server Error: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchPiData();
  }, []);

  const findAllDependencies = (itemId, visited = new Set()) => {
    if (visited.has(itemId)) return;
    visited.add(itemId);

    const item = piList.find((pi) => pi.id === itemId);
    if (item && item.dependencies) {
      item.dependencies.forEach((dep) =>
        findAllDependencies(dep.typeID, visited)
      );
    }
  };

  const findAllDependents = (itemId, visited = new Set()) => {
    if (visited.has(itemId)) return;
    visited.add(itemId);

    piList.forEach((pi) => {
      if (
        pi.dependencies &&
        pi.dependencies.some((dep) => dep.typeID === itemId)
      ) {
        findAllDependents(pi.id, visited);
      }
    });
  };

  const handleHover = (hovered) => {
    // Only allow hover effects if nothing is selected
    if (selectedItem) return;

    setHoveredResource(hovered);
    if (hovered) {
      const dependencies = new Set();
      const dependents = new Set();
      findAllDependencies(hovered, dependencies);
      findAllDependents(hovered, dependents);
      setHoveredDependencies(dependencies);
      setHoveredDependents(dependents);
    } else {
      setHoveredDependencies(new Set());
      setHoveredDependents(new Set());
    }
  };

  const handleSelection = (pi) => {
    if (pi.type <= 1) return; // Only T2+ can be selected

    if (selectedItem === pi.name) {
      // Deselect
      setSelectedItem(null);
      setHoveredDependencies(new Set());
      setHoveredDependents(new Set());
    } else {
      // Select and highlight chain
      setSelectedItem(pi.name);
      const dependencies = new Set();
      const dependents = new Set();
      findAllDependencies(pi.id, dependencies);
      findAllDependents(pi.id, dependents);
      setHoveredDependencies(dependencies);
      setHoveredDependents(dependents);
    }
  };

  return (
    <div id="pi-diagram">
      <h2>PI CALCULATOR</h2>
      <div id="picalculator">
        <h2 id="diagram-label"></h2>
        <div id="picalculatorleft">
          <PiForm
            piList={piList}
            setPiList={setPiList}
            setAdvancedFactory={setAdvancedFactory}
            setVolume={setVolume}
            setBasicFactory={setBasicFactory}
            setSpecialFactory={setSpecialFactory}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            volume={volume}
            basicFactory={basicFactory}
            advancedFactory={advancedFactory}
            specialFactory={specialFactory}
          />
        </div>
        <div id="picalculatorright">
          <PiResult
            piList={piList}
            selectedItem={selectedItem}
            basicFactory={basicFactory}
            advancedFactory={advancedFactory}
            specialFactory={specialFactory}
            volume={volume}
          />
        </div>
      </div>
      <h2 id="diagram-label">PLANET DIAGRAM</h2>

      {/* PI Categories */}
      <div
        id="pi-columns"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          textAlign: "left",
        }}
      >
        {categories.map((category, index) => {
          const filteredData = piList.filter((pi) => pi.type === index + 1);
          return (
            <div
              key={category}
              id={category.toLowerCase()}
              style={{ flex: 1, padding: "2px" }}
            >
              <div class="picategory">
                <h3>{category}</h3>
              </div>
              {filteredData.map((pi) => {
                const isSelected = selectedItem === pi.name;
                const isInChain =
                  hoveredDependencies.has(pi.id) ||
                  hoveredDependents.has(pi.id);
                const isHovered = hoveredResource === pi.id;

                return (
                  <div
                    key={pi.id}
                    onMouseEnter={() => handleHover(pi.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => handleSelection(pi)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: isSelected
                        ? "#0d6efd"
                        : isInChain || isHovered
                        ? "#444"
                        : "#6c757d",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color: "white",
                      fontSize: "14px",
                      marginBottom: "5px",
                      cursor: pi.type > 1 ? "pointer" : "default",
                      border: isSelected
                        ? "2px solid #ffc107"
                        : isInChain && selectedItem
                        ? "2px solid rgba(255, 193, 7, 0.6)"
                        : "2px solid transparent",
                      boxShadow: isSelected
                        ? "0 0 10px rgba(255, 193, 7, 0.5)"
                        : isInChain && selectedItem
                        ? "0 0 8px rgba(255, 193, 7, 0.3)"
                        : "none",
                      transition: "all 0.2s ease",
                      opacity:
                        selectedItem && !isSelected && !isInChain ? 0.5 : 1,
                    }}
                  >
                    <img
                      src={pi.icon}
                      alt={pi.name}
                      style={{ width: "20px", marginRight: "6px" }}
                    />
                    {pi.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Planets Section */}
      <div id="planets" style={{ marginTop: "20px", textAlign: "center" }}>
        <span id="pipanetstext">PLANETS</span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {piList
            .filter((pi) => pi.type === 0) // Filter planets (type 0)
            .map((planet) => {
              const isInChain =
                hoveredDependencies.has(planet.id) ||
                hoveredDependents.has(planet.id);
              const isHovered = hoveredResource === planet.id;

              return (
                <span
                  key={planet.id}
                  onMouseEnter={() => handleHover(planet.id)}
                  onMouseLeave={() => handleHover(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      isInChain || isHovered ? "#444" : "#6c757d",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "14px",
                    minWidth: "100px",
                    justifyContent: "center",
                    cursor: "pointer",
                    border:
                      isInChain && selectedItem
                        ? "2px solid rgba(255, 193, 7, 0.6)"
                        : "2px solid transparent",
                    boxShadow:
                      isInChain && selectedItem
                        ? "0 0 8px rgba(255, 193, 7, 0.3)"
                        : "none",
                    transition: "all 0.2s ease",
                    opacity: selectedItem && !isInChain ? 0.5 : 1,
                  }}
                >
                  <img
                    src={planet.icon}
                    alt={planet.name}
                    style={{ width: "20px", marginRight: "6px" }}
                  />
                  {planet.name}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}

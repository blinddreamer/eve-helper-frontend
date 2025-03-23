"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

export default function Picalculator() {
  const [piList, setPiList] = useState([]);
  const [hoveredResource, setHoveredResource] = useState(null);
  const [hoveredDependencies, setHoveredDependencies] = useState(new Set());
  const [hoveredDependents, setHoveredDependents] = useState(new Set());
  const backend = process.env.NEXT_PUBLIC_API_URL;

  const categories = ["RAW", "T1", "T2", "T3", "T4"];

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

  return (
    <div id="pi-diagram">
      <Alert variant="warning">UNDER CONSTRUCTION!</Alert>
      <h2 id="diagram-label">DIAGRAM</h2>

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
              {filteredData.map((pi) => (
                <div
                  key={pi.id}
                  onMouseEnter={() => handleHover(pi.id)}
                  onMouseLeave={() => handleHover(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      hoveredResource === pi.id ||
                      hoveredDependencies.has(pi.id) ||
                      hoveredDependents.has(pi.id)
                        ? "#444"
                        : "#6c757d",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "14px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={pi.icon}
                    alt={pi.name}
                    style={{ width: "20px", marginRight: "6px" }}
                  />
                  {pi.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Planets Section */}
      <div id="planets" style={{ marginTop: "20px", textAlign: "center" }}>
        <span id="pipanetstext" style={{ color: "white" }}>
          PLANETS
        </span>
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
            .map((planet) => (
              <span
                key={planet.id}
                onMouseEnter={() => handleHover(planet.id)}
                onMouseLeave={() => handleHover(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    hoveredDependencies.has(planet.id) ||
                    hoveredDependents.has(planet.id)
                      ? "#444"
                      : "#6c757d",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "14px",
                  minWidth: "100px",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={planet.icon}
                  alt={planet.name}
                  style={{ width: "20px", marginRight: "6px" }}
                />
                {planet.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

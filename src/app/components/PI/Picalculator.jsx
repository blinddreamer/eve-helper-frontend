"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Picalculator() {
  const [piList, setPiList] = useState([]);
  const [hoveredResource, setHoveredResource] = useState(null);
  const [hoveredDependencies, setHoveredDependencies] = useState(new Set());
  const backend = process.env.NEXT_PUBLIC_API_URL;

  const categories = ["Raw", "Basic", "Refined", "Specialized", "Advanced"];

  const planets = [
    { id: 1, name: "Barren", src: "/assets/barren.png" },
    { id: 2, name: "Gas", src: "/assets/gas.png" },
    { id: 3, name: "Ice", src: "/assets/ice.png" },
    { id: 4, name: "Lava", src: "/assets/lava.png" },
    { id: 5, name: "Oceanic", src: "/assets/oceanic.png" },
    { id: 6, name: "Plasma", src: "/assets/plasma.png" },
    { id: 7, name: "Storm", src: "/assets/storm.png" },
    { id: 8, name: "Temperate", src: "/assets/temperate.png" },
  ];

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
    if (item && item.dependencies.length > 0) {
      item.dependencies.forEach((dep) =>
        findAllDependencies(dep.typeID, visited)
      );
    }
  };

  const drawOnCanvas = (canvasId, data) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgSize = 25;
    const padding = 4;
    const textPadding = 8;
    const boxHeight = imgSize + padding * 2;
    const cornerRadius = 4;
    const verticalSpacing = 8;

    let maxTextWidth = Math.max(
      ...data.map((pi) => ctx.measureText(pi.name).width)
    );
    let boxWidth = imgSize + maxTextWidth + textPadding + padding * 2;
    let totalHeight = data.length * (boxHeight + verticalSpacing) + padding * 2;

    canvas.width = boxWidth + 20;
    canvas.height = totalHeight;

    let yPosition = 10;
    const resourcePositions = new Map();

    data.forEach((pi) => {
      const xPosition = 10;
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = "#6c757d";
        if (hoveredResource === pi.id || hoveredDependencies.has(pi.id)) {
          ctx.fillStyle = "#444";
        }
        drawRoundedRect(
          ctx,
          xPosition - padding,
          yPosition - padding,
          boxWidth,
          boxHeight,
          cornerRadius
        );
        ctx.fill();

        ctx.drawImage(img, xPosition, yPosition, imgSize, imgSize);
        ctx.fillStyle = "white";
        ctx.fillText(
          pi.name,
          xPosition + imgSize + textPadding,
          yPosition + imgSize / 2 + 4
        );

        resourcePositions.set(pi.id, {
          x: xPosition,
          y: yPosition,
          width: boxWidth,
          height: boxHeight,
        });

        yPosition += boxHeight + verticalSpacing;
      };
      img.src = pi.icon;
    });

    canvas.onmousemove = (e) => {
      const { left, top } = canvas.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      let hovered = null;

      resourcePositions.forEach((pos, id) => {
        if (
          mouseX >= pos.x &&
          mouseX <= pos.x + pos.width &&
          mouseY >= pos.y &&
          mouseY <= pos.y + pos.height
        ) {
          hovered = id;
        }
      });

      if (hovered !== hoveredResource) {
        setHoveredResource(hovered);
        if (hovered) {
          const dependencies = new Set();
          findAllDependencies(hovered, dependencies);
          setHoveredDependencies(dependencies);
        } else {
          setHoveredDependencies(new Set());
        }
      }
    };

    canvas.onmouseleave = () => {
      setHoveredResource(null);
      setHoveredDependencies(new Set());
    };
  };

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  };

  useEffect(() => {
    if (piList.length) {
      categories.forEach((category, index) => {
        const filteredData = piList.filter((pi) => pi.type === index);
        if (filteredData.length) {
          drawOnCanvas(`${category.toLowerCase()}-canvas`, filteredData);
        }
      });
    }
  }, [piList, hoveredResource, hoveredDependencies]);

  return (
    <div id="pi-diagram">
      <h2 id="diagram-label">PI DIAGRAM</h2>
      <div
        id="pi-columns"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {categories.map((category) => (
          <div
            key={category}
            id={category.toLowerCase()}
            style={{ flex: 1, padding: "2px", position: "relative" }}
          >
            <h3>{category}</h3>
            <canvas id={`${category.toLowerCase()}-canvas`}></canvas>
          </div>
        ))}
      </div>

      <div id="planets" style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ color: "white" }}>Planets:</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {planets.map((planet) => (
            <span
              key={planet.id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: hoveredDependencies.has(planet.id)
                  ? "#444"
                  : "#6c757d",
                padding: "4px 8px",
                borderRadius: "4px",
                color: "white",
                fontSize: "14px",
                minWidth: "100px",
                justifyContent: "center",
              }}
            >
              <img
                src={planet.src}
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

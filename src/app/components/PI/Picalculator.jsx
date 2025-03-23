"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Picalculator() {
  const [piList, setPiList] = useState([]);
  const [onStart, setOnstart] = useState(true);
  const [hoveredResource, setHoveredResource] = useState(null); // Track hovered resource
  const backend = process.env.NEXT_PUBLIC_API_URL;

  const categories = ["Raw", "Basic", "Refined", "Specialized", "Advanced"];

  // Dependencies between resources
  const resourceDependencies = {
    "Noble Gas": ["Oxygen"],
    Oxygen: ["Synthetic Oil"],
    // Add more dependencies as needed
  };

  useEffect(() => {
    if (!onStart) return;

    const fetchPiData = async () => {
      try {
        const response = await axios.get(backend + "pi");
        if (response.status !== 200) {
          throw new Error(`Server Error: ${response.statusText}`);
        }
        setPiList(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchPiData();
    setOnstart(false);
  }, [onStart]);

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
    const resourcePositions = [];

    // Iterate over resources and draw them
    data.forEach((pi, index) => {
      const xPosition = 10;
      const img = new Image();
      img.onload = () => {
        // Draw background for the resource box
        ctx.fillStyle = "#6c757d";
        if (
          hoveredResource === pi.name ||
          resourceDependencies[pi.name]?.includes(hoveredResource)
        ) {
          ctx.fillStyle = "#444"; // Darker background on hover
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

        // Draw icon
        ctx.drawImage(img, xPosition, yPosition, imgSize, imgSize);

        // Draw text
        ctx.fillStyle = "white";
        ctx.fillText(
          pi.name,
          xPosition + imgSize + textPadding,
          yPosition + imgSize / 2 + 4
        );

        // Track the position of each resource
        resourcePositions.push({
          name: pi.name,
          x: xPosition,
          y: yPosition,
          width: boxWidth,
          height: boxHeight,
        });

        yPosition += boxHeight + verticalSpacing;
      };
      img.src = pi.icon;

      // Draw arrows for dependencies on hover
      if (hoveredResource === pi.name) {
        const dependentResources = resourceDependencies[pi.name];
        if (dependentResources) {
          dependentResources.forEach((depResource) => {
            const depResourceObj = data.find(
              (item) => item.name === depResource
            );
            if (depResourceObj) {
              const depYPosition = data.indexOf(depResourceObj) * 100 + 10;
              drawArrow(
                ctx,
                10 + 50,
                yPosition - 50,
                10 + 50,
                depYPosition + 50
              );
            }
          });
        }
      }

      // Draw arrows pointing back to the hovered resource (if it is a dependent resource)
      if (
        resourceDependencies[pi.name] &&
        hoveredResource &&
        resourceDependencies[pi.name].includes(hoveredResource)
      ) {
        const dependentResourceObj = data.find((item) => item.name === pi.name);
        if (dependentResourceObj) {
          const depYPosition = data.indexOf(dependentResourceObj) * 100 + 10;
          drawArrow(ctx, 10 + 50, depYPosition + 50, 10 + 50, yPosition - 50);
        }
      }
    });

    // Detect hover on canvas
    canvas.addEventListener("mousemove", (e) => {
      const canvasRect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      let hovered = null;

      // Check if mouse is inside any resource box
      resourcePositions.forEach((resource) => {
        if (
          mouseX >= resource.x &&
          mouseX <= resource.x + resource.width &&
          mouseY >= resource.y &&
          mouseY <= resource.y + resource.height
        ) {
          hovered = resource.name;
        }
      });

      setHoveredResource(hovered);
    });

    // Reset hover state when mouse leaves the canvas
    canvas.addEventListener("mouseleave", () => {
      setHoveredResource(null);
    });
  };

  const drawArrow = (ctx, x1, y1, x2, y2) => {
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headlen * Math.cos(angle - Math.PI / 6),
      y2 - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - headlen * Math.cos(angle + Math.PI / 6),
      y2 - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = "#000";
    ctx.fill();
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
  }, [piList, hoveredResource]);

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

      {/* PLANETS SECTION */}
      <div
        id="planets"
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "white" }}>Planets:</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {[
            { id: 1, name: "Barren", src: "/assets/barren.png" },
            { id: 2, name: "Gas", src: "/assets/gas.png" },
            { id: 3, name: "Ice", src: "/assets/ice.png" },
            { id: 4, name: "Lava", src: "/assets/lava.png" },
            { id: 5, name: "Oceanic", src: "/assets/oceanic.png" },
            { id: 6, name: "Plasma", src: "/assets/plasma.png" },
            { id: 7, name: "Storm", src: "/assets/storm.png" },
            { id: 8, name: "Temperate", src: "/assets/temperate.png" },
          ].map((planet) => (
            <span
              key={planet.id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#6c757d",
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

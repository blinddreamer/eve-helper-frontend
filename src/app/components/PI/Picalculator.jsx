"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Picalculator() {
  const [piList, setPiList] = useState([]);
  const [onStart, setOnstart] = useState(true);
  const backend = process.env.NEXT_PUBLIC_API_URL;

  const categories = ["Raw", "Basic", "Refined", "Specialized", "Advanced"];

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

    // **1. Calculate the widest text in this column**
    ctx.font = "12px Arial";
    let maxTextWidth = Math.max(
      ...data.map((pi) => ctx.measureText(pi.name).width)
    );
    let boxWidth = imgSize + maxTextWidth + textPadding + padding * 2;

    // **2. Calculate the total required height**
    let totalHeight = data.length * (boxHeight + verticalSpacing) + padding * 2;
    canvas.width = boxWidth + 20;
    canvas.height = totalHeight;

    let yPosition = 10;
    data.forEach((pi) => {
      const xPosition = 10;
      const img = new Image();
      img.onload = () => {
        // **Draw background**
        ctx.fillStyle = "#6c757d";
        drawRoundedRect(
          ctx,
          xPosition - padding,
          yPosition - padding,
          boxWidth,
          boxHeight,
          cornerRadius
        );
        ctx.fill();

        // **Draw icon**
        ctx.drawImage(img, xPosition, yPosition, imgSize, imgSize);

        // **Draw text**
        ctx.fillStyle = "white";
        ctx.fillText(
          pi.name,
          xPosition + imgSize + textPadding,
          yPosition + imgSize / 2 + 4
        );

        yPosition += boxHeight + verticalSpacing;
      };
      img.src = pi.icon;
    });
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
  }, [piList]);

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
            style={{ flex: 1, padding: "2px" }}
          >
            <h3>{category}</h3>
            <canvas id={`${category.toLowerCase()}-canvas`}></canvas>
          </div>
        ))}
      </div>

      {/* PLANETS SECTION */}
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

"use client";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RANGES = [
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1y", days: 365 },
  { label: "All", days: null },
];

function formatISK(value) {
  if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";
  return value?.toFixed(2) ?? "0";
}

function MarketHistory({ history }) {
  const [range, setRange] = useState(30);

  if (!history || history.length === 0) return null;

  const data = (range ? history.slice(-range) : history).map((d) => ({
    date: d.date,
    average: d.average,
    highest: d.highest,
    lowest: d.lowest,
    volume: d.volume,
  }));

  return (
    <div
      style={{
        background: "rgba(var(--bs-body-color-rgb), 0.03)",
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ fontSize: "0.9rem" }}>Price History</span>
        <div className="btn-group btn-group-sm">
          {RANGES.map((r) => (
            <button
              key={r.label}
              className={`btn btn-secondary ${range === r.days ? "active" : ""}`}
              onClick={() => setRange(r.days)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={data} margin={{ top: 4, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3C3C3C" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#858585" }}
            tickFormatter={(d) => d.slice(5)}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="price"
            tick={{ fontSize: 10, fill: "#858585" }}
            tickFormatter={formatISK}
            width={65}
          />
          <YAxis
            yAxisId="volume"
            orientation="right"
            tick={{ fontSize: 10, fill: "#858585" }}
            tickFormatter={formatISK}
            width={65}
          />
          <Tooltip
            formatter={(value, name) => [formatISK(value) + " ISK", name]}
            contentStyle={{
              background: "#252526",
              border: "1px solid #454545",
              borderRadius: 4,
              fontSize: 11,
            }}
            labelStyle={{ color: "#D4D4D4" }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Bar
            yAxisId="volume"
            dataKey="volume"
            fill="#3C3C3C"
            opacity={0.7}
            name="Volume"
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="highest"
            stroke="#e1b489"
            dot={false}
            name="High"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="lowest"
            stroke="#83cfcf"
            dot={false}
            name="Low"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="average"
            stroke="#9CDCFE"
            dot={false}
            name="Avg"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MarketHistory;

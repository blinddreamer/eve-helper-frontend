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
          <CartesianGrid strokeDasharray="3 3" stroke="var(--market-grid-line)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "var(--market-text-dim)" }}
            tickFormatter={(d) => d.slice(5)}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="price"
            tick={{ fontSize: 10, fill: "var(--market-text-dim)" }}
            tickFormatter={formatISK}
            width={65}
          />
          <YAxis
            yAxisId="volume"
            orientation="right"
            tick={{ fontSize: 10, fill: "var(--market-text-dim)" }}
            tickFormatter={formatISK}
            width={65}
          />
          <Tooltip
            formatter={(value, name) => [
              name === "Volume" ? formatISK(value) : formatISK(value) + " ISK",
              name,
            ]}
            contentStyle={{
              background: "var(--market-chart-bg)",
              border: "1px solid var(--market-border)",
              borderRadius: 4,
              fontSize: 11,
            }}
            labelStyle={{ color: "var(--market-text)" }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Bar
            yAxisId="volume"
            dataKey="volume"
            fill="var(--market-bar-fill)"
            opacity={0.7}
            name="Volume"
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="highest"
            stroke="var(--market-sell)"
            dot={false}
            name="High"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="lowest"
            stroke="var(--market-buy)"
            dot={false}
            name="Low"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="average"
            stroke="var(--market-accent-alt)"
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

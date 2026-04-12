import React from "react";
import { Table } from "react-bootstrap";
import MarketHistory from "./MarketHistory";

function formatISK(value) {
  if (value == null) return "—";
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatVol(value) {
  if (value == null || value === 0) return "—";
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
  return value.toLocaleString();
}

function OrderTable({ title, orders, isBuy }) {
  const color = isBuy ? "#83cfcf" : "#e1b489";
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="market-orders-title" style={{ color }}>
        {title}
        <span className="text-muted" style={{ fontSize: "0.72rem", marginLeft: 6, color: "#858585" }}>
          {orders.length} orders
        </span>
      </div>
      <Table striped hover size="sm" responsive className="market-orders-table">
        <thead>
          <tr>
            <th>Price (ISK)</th>
            <th>Qty Remain</th>
            <th>Min Vol</th>
            <th>Issued</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 15).map((o) => (
            <tr key={o.order_id}>
              <td style={{ color }}>{formatISK(o.price)}</td>
              <td>
                {o.volume_remain.toLocaleString()}
                <span className="text-muted"> /{o.volume_total.toLocaleString()}</span>
              </td>
              <td>{o.min_volume.toLocaleString()}</td>
              <td>{new Date(o.issued).toLocaleDateString()}</td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">No orders</td>
            </tr>
          )}
        </tbody>
      </Table>
      {orders.length > 15 && (
        <div style={{ fontSize: "0.7rem", color: "#555", marginTop: -6 }}>
          Showing top 15 of {orders.length}
        </div>
      )}
    </div>
  );
}

function MarketOrders({ regions, regionData, expandedRegion, onRegionExpand, history, historyLoading }) {
  return (
    <div className="mt-2">

      {/* ── All-region summary table ── */}
      <Table hover size="sm" className="market-region-summary">
        <thead>
          <tr>
            <th>Region</th>
            <th style={{ color: "#e1b489" }}>Best Sell</th>
            <th>Sell Vol</th>
            <th style={{ color: "#83cfcf" }}>Best Buy</th>
            <th>Buy Vol</th>
            <th>Spread</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => {
            const d = regionData[region.id] || { buy: [], sell: [], loading: true };
            const bestSell  = d.sell[0]?.price;
            const bestBuy   = d.buy[0]?.price;
            const sellVol   = d.sell.reduce((s, o) => s + o.volume_remain, 0);
            const buyVol    = d.buy.reduce((s,  o) => s + o.volume_remain, 0);
            const spread    = bestSell && bestBuy
              ? (((bestSell - bestBuy) / bestSell) * 100).toFixed(1) + "%"
              : "—";
            const isExpanded = expandedRegion === region.id;

            return (
              <tr
                key={region.id}
                className={`market-region-row ${isExpanded ? "expanded" : ""}`}
                onClick={() => onRegionExpand(region.id)}
              >
                <td>
                  <span className="market-region-arrow">{isExpanded ? "−" : "+"}</span>
                  <strong>{region.name}</strong>
                  <span className="text-muted" style={{ fontSize: "0.7rem", marginLeft: 4 }}>
                    {region.full}
                  </span>
                </td>
                <td style={{ color: "#e1b489" }}>
                  {d.loading
                    ? <span className="spinner-border spinner-border-sm" style={{ width: 10, height: 10 }} />
                    : formatISK(bestSell)}
                </td>
                <td className="text-muted">{d.loading ? "—" : formatVol(sellVol)}</td>
                <td style={{ color: "#83cfcf" }}>
                  {d.loading
                    ? <span className="spinner-border spinner-border-sm" style={{ width: 10, height: 10 }} />
                    : formatISK(bestBuy)}
                </td>
                <td className="text-muted">{d.loading ? "—" : formatVol(buyVol)}</td>
                <td style={{ color: "#b778bf" }}>{d.loading ? "—" : spread}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* ── Expanded region detail ── */}
      {expandedRegion && regionData[expandedRegion] && !regionData[expandedRegion].loading && (
        <div className="market-region-detail">
          <div className="market-region-detail-title">
            {regions.find((r) => r.id === expandedRegion)?.name} — Order Book
          </div>

          {/* Price history */}
          {historyLoading && (
            <div style={{ padding: "12px 0", color: "#858585", fontSize: "0.8rem" }}>
              <span className="spinner-border spinner-border-sm me-2" style={{ width: 12, height: 12 }} />
              Loading price history...
            </div>
          )}
          {!historyLoading && <MarketHistory history={history} />}

          {/* Buy / Sell tables */}
          <div className="d-flex gap-4 mt-3">
            <OrderTable title="Sell Orders" orders={regionData[expandedRegion].sell} isBuy={false} />
            <OrderTable title="Buy Orders"  orders={regionData[expandedRegion].buy}  isBuy={true}  />
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketOrders;

import React from "react";
import { Table } from "react-bootstrap";
import MarketHistory from "./MarketHistory";
import { formatCompact, formatIsk as formatISK, formatNumber } from "../../utils/format";

const formatVol = (value) => (value ? formatCompact(value) : "—");

function OrderTable({ title, orders, isBuy }) {
  const color = isBuy ? "var(--market-buy)" : "var(--market-sell)";
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="market-orders-title" style={{ color }}>
        {title}
        <span className="text-muted" style={{ fontSize: "0.72rem", marginLeft: 6 }}>
          {orders.length} orders
        </span>
      </div>
      <Table striped hover size="sm" responsive className="market-orders-table">
        <thead>
          <tr>
            <th className="num">Price (ISK)</th>
            <th className="num">Qty Remain</th>
            <th className="num">Min Vol</th>
            <th>Issued</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 15).map((o) => (
            <tr key={o.order_id}>
              <td className="num" style={{ color }}>{formatISK(o.price)}</td>
              <td className="num">
                {formatNumber(o.volume_remain)}
                <span className="text-muted"> /{formatNumber(o.volume_total)}</span>
              </td>
              <td className="num">{formatNumber(o.min_volume)}</td>
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
        <div style={{ fontSize: "0.7rem", color: "var(--market-text-dim)", marginTop: -6 }}>
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
      <Table hover size="sm" responsive className="market-region-summary">
        <thead>
          <tr>
            <th>Region</th>
            <th className="num" style={{ color: "var(--market-sell)" }}>Best Sell</th>
            <th className="num">Sell Vol</th>
            <th className="num" style={{ color: "var(--market-buy)" }}>Best Buy</th>
            <th className="num">Buy Vol</th>
            <th className="num">Spread</th>
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
                <td className="num" style={{ color: "var(--market-sell)" }}>
                  {d.loading
                    ? <span className="spinner-border spinner-border-sm" style={{ width: 10, height: 10 }} />
                    : formatISK(bestSell)}
                </td>
                <td className="num text-muted">{d.loading ? "—" : formatVol(sellVol)}</td>
                <td className="num" style={{ color: "var(--market-buy)" }}>
                  {d.loading
                    ? <span className="spinner-border spinner-border-sm" style={{ width: 10, height: 10 }} />
                    : formatISK(bestBuy)}
                </td>
                <td className="num text-muted">{d.loading ? "—" : formatVol(buyVol)}</td>
                <td className="num" style={{ color: "var(--market-spread)" }}>{d.loading ? "—" : spread}</td>
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
            <div style={{ padding: "12px 0", color: "var(--market-text-dim)", fontSize: "0.8rem" }}>
              <span className="spinner-border spinner-border-sm me-2" style={{ width: 12, height: 12 }} />
              Loading price history...
            </div>
          )}
          {!historyLoading && <MarketHistory history={history} />}

          {/* Buy / Sell tables */}
          <div className="market-order-tables mt-3">
            <OrderTable title="Sell Orders" orders={regionData[expandedRegion].sell} isBuy={false} />
            <OrderTable title="Buy Orders"  orders={regionData[expandedRegion].buy}  isBuy={true}  />
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketOrders;

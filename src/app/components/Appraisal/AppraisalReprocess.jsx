"use client";
import { useState } from "react";
import { Table, Button, Spinner, Form } from "react-bootstrap";

function AppraisalReprocess({ reprocessData, reprocessLoading, loadReprocess, uuid }) {
  const [efficiency, setEfficiency] = useState(87.5);
  const volumeFormat = new Intl.NumberFormat();
  const priceFormat  = new Intl.NumberFormat("en-US");

  function formatPrice(price) {
    if (!price) return "0";
    if (price >= 1e9) return (price / 1e9).toFixed(1) + "B";
    if (price >= 1e6) return (price / 1e6).toFixed(1) + "M";
    if (price >= 1e3) return (price / 1e3).toFixed(1) + "K";
    return price.toFixed(0);
  }

  if (!uuid) {
    return <div className="appr-tab-empty">Submit an appraisal first to see reprocess values.</div>;
  }

  return (
    <div className="appr-tab-content">
      {/* Controls */}
      <div className="appr-reprocess-controls">
        <Form.Group className="d-flex align-items-center gap-2">
          <Form.Label className="mb-0" style={{ whiteSpace: "nowrap", fontSize: "0.72rem", color: "var(--bs-secondary-color)" }}>
            Efficiency %
          </Form.Label>
          <Form.Control
            type="number" min={1} max={100} step={0.5}
            value={efficiency}
            onChange={(e) => setEfficiency(parseFloat(e.target.value))}
            style={{ width: 80 }}
          />
        </Form.Group>
        <Button variant="secondary" size="sm" onClick={() => loadReprocess(efficiency / 100)} disabled={reprocessLoading}>
          {reprocessLoading
            ? <><Spinner as="span" animation="border" size="sm" /> Calculating…</>
            : reprocessData ? "Recalculate" : "Calculate"}
        </Button>
      </div>

      {reprocessData && reprocessData.materials.length === 0 && (
        <div className="appr-tab-empty">No reprocess data — make sure invTypeMaterials SDE table is populated.</div>
      )}

      {reprocessData && reprocessData.materials.length > 0 && (
        <>
          {/* Summary */}
          <div className="appr-stat-cards mb-3">
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Sell Value</div>
              <div className="appr-stat-card-value appr-sell">{formatPrice(reprocessData.totalSell)}</div>
            </div>
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Split Value</div>
              <div className="appr-stat-card-value appr-split">{formatPrice(reprocessData.totalSplit)}</div>
            </div>
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Buy Value</div>
              <div className="appr-stat-card-value appr-buy">{formatPrice(reprocessData.totalBuy)}</div>
            </div>
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Efficiency</div>
              <div className="appr-stat-card-value">{(reprocessData.efficiency * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table bordered hover size="sm" className="appr-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Material</th>
                  <th>Quantity</th>
                  <th>Sell / unit</th>
                  <th>Buy / unit</th>
                  <th>Total Sell</th>
                  <th>Total Buy</th>
                </tr>
              </thead>
              <tbody>
                {reprocessData.materials.map((mat, i) => (
                  <tr key={i}>
                    <td><img src={mat.icon} loading="lazy" alt={mat.name} /></td>
                    <td>{mat.name}</td>
                    <td>{volumeFormat.format(mat.quantity)}</td>
                    <td>{priceFormat.format(mat.sellPrice)}</td>
                    <td>{priceFormat.format(mat.buyPrice)}</td>
                    <td className="appr-sell">{priceFormat.format(mat.totalSell)}</td>
                    <td className="appr-buy">{priceFormat.format(mat.totalBuy)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
export default AppraisalReprocess;

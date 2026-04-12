"use client";
import { Table, Button, Spinner } from "react-bootstrap";

function AppraisalCompress({ compressData, compressLoading, loadCompress, uuid }) {
  const volumeFormat = new Intl.NumberFormat();
  const priceFormat  = new Intl.NumberFormat("en-US");

  function formatVol(v) {
    if (!v) return "0";
    if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
    if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
    if (v >= 1e3) return (v / 1e3).toFixed(1) + "K";
    return v.toFixed(0);
  }

  if (!uuid) {
    return <div className="appr-tab-empty">Submit an appraisal first to see compression options.</div>;
  }

  return (
    <div className="appr-tab-content">
      {!compressData && (
        <div className="appr-tab-empty">
          <Button variant="secondary" onClick={loadCompress} disabled={compressLoading}>
            {compressLoading
              ? <><Spinner as="span" animation="border" size="sm" /> Calculating…</>
              : "Calculate Compression"}
          </Button>
        </div>
      )}

      {compressData && compressData.items.length === 0 && (
        <div className="appr-tab-empty">No compressible items found in this appraisal.</div>
      )}

      {compressData && compressData.items.length > 0 && (
        <>
          {/* Volume summary */}
          <div className="appr-stat-cards mb-3">
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Original Volume</div>
              <div className="appr-stat-card-value">{formatVol(compressData.totalOriginalVolume)} m³</div>
            </div>
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Compressed Volume</div>
              <div className="appr-stat-card-value appr-buy">{formatVol(compressData.totalCompressedVolume)} m³</div>
            </div>
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Volume Saved</div>
              <div className="appr-stat-card-value appr-sell">{formatVol(compressData.totalVolumeSaved)} m³</div>
            </div>
            <div className="appr-stat-card">
              <div className="appr-stat-card-label">Reduction</div>
              <div className="appr-stat-card-value appr-split">
                {compressData.totalOriginalVolume > 0
                  ? ((compressData.totalVolumeSaved / compressData.totalOriginalVolume) * 100).toFixed(1) + "%"
                  : "—"}
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table bordered hover size="sm" className="appr-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Compressed Item</th>
                  <th>Qty</th>
                  <th>Remainder</th>
                  <th>Volume Saved</th>
                  <th>Sell</th>
                  <th>Buy</th>
                </tr>
              </thead>
              <tbody>
                {compressData.items.map((item, i) => (
                  <tr key={i}>
                    <td><img src={item.compressedIcon} loading="lazy" alt={item.compressedName} /></td>
                    <td>
                      <div>{item.compressedName}</div>
                      <div style={{ fontSize: "0.65rem", color: "var(--bs-secondary-color)" }}>
                        from {volumeFormat.format(item.originalQuantity)} {item.originalName}
                      </div>
                    </td>
                    <td>{volumeFormat.format(item.compressedQuantity)}</td>
                    <td style={{ color: item.remainder > 0 ? "var(--bs-secondary-color)" : "inherit" }}>
                      {item.remainder > 0 ? `${volumeFormat.format(item.remainder)} uncompressed` : "—"}
                    </td>
                    <td className="appr-sell">{formatVol(item.volumeSaved)} m³</td>
                    <td>{priceFormat.format(item.compressedSellPrice)}</td>
                    <td>{priceFormat.format(item.compressedBuyPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Button variant="outline-secondary" size="sm" className="mt-2" onClick={loadCompress} disabled={compressLoading}>
            {compressLoading ? <Spinner as="span" animation="border" size="sm" /> : "Refresh"}
          </Button>
        </>
      )}
    </div>
  );
}
export default AppraisalCompress;

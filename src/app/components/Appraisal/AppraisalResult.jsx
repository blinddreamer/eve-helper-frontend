import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import AppraisalReprocess from "./AppraisalReprocess";
import AppraisalCompress from "./AppraisalCompress";

const TABS = ["Appraisal", "Reprocess", "Compress"];

function AppraisalResult(props) {
  const [activeTab, setActiveTab] = useState("Appraisal");
  const { appraisalResult } = props.appraisal;
  const pct = (props.pricePercentage || 100) / 100;
  const volumeFormat = new Intl.NumberFormat();
  const priceFormat  = new Intl.NumberFormat("en-US");

  function formatPrice(price) {
    if (!price || isNaN(price)) return "0";
    if (price >= 1e9) return (price / 1e9).toFixed(1) + "B";
    if (price >= 1e6) return (price / 1e6).toFixed(1) + "M";
    if (price >= 1e3) return (price / 1e3).toFixed(1) + "K";
    return price.toFixed(0);
  }

  const buy   = appraisalResult.estimateTotalBuy   * pct;
  const split = appraisalResult.estimateTotalSplit  * pct;
  const sell  = appraisalResult.estimateTotalSell   * pct;
  const vol   = appraisalResult.totalVolume;

  function handleTabClick(tab) {
    setActiveTab(tab);
    if (tab === "Reprocess" && !props.reprocessData) props.loadReprocess();
    if (tab === "Compress"  && !props.compressData)  props.loadCompress();
  }

  return (
    <div className="appr-result">
      {/* Header: meta info + copy button */}
      <div className="appr-result-header">
        <span className="appr-result-meta">
          {props.appraisal.pricePercentage}% &middot; {props.getMarketName(props.appraisal.market)} &middot; {props.appraisal.transactionType}
          {props.appraisal.system ? ` · ${props.appraisal.system}` : ""}
        </span>
        <Button variant="secondary" size="sm" disabled={!props.uuid} onClick={props.handleCopy}>
          <Clipboard className="me-1" /> Copy URL
        </Button>
      </div>

      {/* Stat cards */}
      <div className="appr-stat-cards">
        <div className="appr-stat-card">
          <div className="appr-stat-card-label">Buy</div>
          <div className="appr-stat-card-value appr-buy">{formatPrice(buy)}</div>
          <div className="appr-stat-card-sub">{vol > 0 ? `${formatPrice(buy / vol)} / m³` : "—"}</div>
        </div>
        <div className="appr-stat-card">
          <div className="appr-stat-card-label">Split</div>
          <div className="appr-stat-card-value appr-split">{formatPrice(split)}</div>
          <div className="appr-stat-card-sub">{vol > 0 ? `${formatPrice(split / vol)} / m³` : "—"}</div>
        </div>
        <div className="appr-stat-card">
          <div className="appr-stat-card-label">Sell</div>
          <div className="appr-stat-card-value appr-sell">{formatPrice(sell)}</div>
          <div className="appr-stat-card-sub">{vol > 0 ? `${formatPrice(sell / vol)} / m³` : "—"}</div>
        </div>
        <div className="appr-stat-card">
          <div className="appr-stat-card-label">Volume</div>
          <div className="appr-stat-card-value">{formatPrice(vol)} m³</div>
          <div className="appr-stat-card-sub">{volumeFormat.format(appraisalResult.appraisals.length)} items</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="appr-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`appr-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Appraisal" && (
        <div style={{ overflowX: "auto" }}>
          {appraisalResult.appraisals.filter(ap => ap != null).length === 0 && (
            <div className="appr-tab-empty">No recognised items — check that item names match exactly (case-sensitive).</div>
          )}
          <Table bordered hover size="sm" className="appr-table mt-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Volume</th>
                <th>Sell</th>
                <th>Buy</th>
                <th>Split</th>
              </tr>
            </thead>
            <tbody>
              {appraisalResult.appraisals.filter(ap => ap != null).map((ap, index) => (
                <tr key={index}>
                  <td><img src={ap.icon} loading="lazy" alt={ap.item} /></td>
                  <td>{ap.item}</td>
                  <td>{volumeFormat.format(ap.quantity)}</td>
                  <td>{volumeFormat.format(ap.quantity * (ap.volume || 0))} m³</td>
                  <td>{priceFormat.format(ap.quantity * (ap.sellOrderPrice || 0) * pct)}</td>
                  <td>{priceFormat.format(ap.quantity * (ap.buyOrderPrice || 0) * pct)}</td>
                  <td>{priceFormat.format(ap.quantity * (ap.splitPrice || 0) * pct)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <span className="text-muted" style={{ fontSize: "0.7rem" }}>* all prices are estimates</span>
        </div>
      )}

      {activeTab === "Reprocess" && (
        <AppraisalReprocess
          uuid={props.uuid}
          reprocessData={props.reprocessData}
          reprocessLoading={props.reprocessLoading}
          loadReprocess={props.loadReprocess}
        />
      )}

      {activeTab === "Compress" && (
        <AppraisalCompress
          uuid={props.uuid}
          compressData={props.compressData}
          compressLoading={props.compressLoading}
          loadCompress={props.loadCompress}
        />
      )}
    </div>
  );
}
export default AppraisalResult;

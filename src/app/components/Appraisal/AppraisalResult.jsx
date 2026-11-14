import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import AppraisalReprocess from "./AppraisalReprocess";
import AppraisalCompress from "./AppraisalCompress";
import { formatCompact, formatIsk, formatNumber } from "../../utils/format";

const TABS = ["Appraisal", "Reprocess", "Compress"];

function AppraisalResult(props) {
  const [activeTab, setActiveTab] = useState("Appraisal");
  const { appraisalResult } = props.appraisal;
  const pct = (props.pricePercentage || 100) / 100;
  const formatPrice = (price) => formatCompact(price || 0);
  const missingItems = appraisalResult.missingItems || [];

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
          <div className="appr-stat-card-sub">{formatNumber(appraisalResult.appraisals.length)} items</div>
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
            <div className="appr-tab-empty">No recognised items — check the item names.</div>
          )}
          <Table bordered hover size="sm" className="appr-table mt-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th className="num">Qty</th>
                <th className="num">Volume</th>
                <th className="num">Sell</th>
                <th className="num">Buy</th>
                <th className="num">Split</th>
              </tr>
            </thead>
            <tbody>
              {appraisalResult.appraisals.filter(ap => ap != null).map((ap, index) => (
                <tr key={index}>
                  <td><img src={ap.icon} loading="lazy" alt={ap.item} /></td>
                  <td>{ap.item}</td>
                  <td className="num">{formatNumber(ap.quantity)}</td>
                  <td className="num">{formatNumber(ap.quantity * (ap.volume || 0))} m³</td>
                  <td className="num">{formatIsk(ap.quantity * (ap.sellOrderPrice || 0) * pct)}</td>
                  <td className="num">{formatIsk(ap.quantity * (ap.buyOrderPrice || 0) * pct)}</td>
                  <td className="num">{formatIsk(ap.quantity * (ap.splitPrice || 0) * pct)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {missingItems.length > 0 && (
            <div className="appr-missing" role="status">
              <strong>Not recognised, not priced ({missingItems.length}):</strong> {missingItems.join(", ")}
            </div>
          )}
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

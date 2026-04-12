"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import MarketSearch from "./MarketSearch";
import MarketCategoryTree from "./MarketCategoryTree";
import MarketOrders from "./MarketOrders";
import MarketHistory from "./MarketHistory";
import Animated from "../Animated";

const ESI     = "https://esi.evetech.net/latest";
const BACKEND = process.env.NEXT_PUBLIC_API_URL;

export const REGIONS = [
  { id: 10000002, name: "Jita",    full: "The Forge"     },
  { id: 10000043, name: "Amarr",   full: "Domain"        },
  { id: 10000030, name: "Rens",    full: "Heimatar"      },
  { id: 10000032, name: "Dodixie", full: "Sinq Laison"   },
  { id: 10000042, name: "Hek",     full: "Metropolis"    },
];

function MarketHome() {
  const [selectedItem,    setSelectedItem]    = useState(null);
  const [typeInfo,        setTypeInfo]        = useState(null);
  const [regionData,      setRegionData]      = useState({});   // regionId → { buy, sell, loading, error }
  const [expandedRegion,  setExpandedRegion]  = useState(null); // regionId
  const [history,         setHistory]         = useState([]);
  const [historyLoading,  setHistoryLoading]  = useState(false);

  // Fetch orders for all 5 regions in parallel — served from backend DB (15-min cache)
  const loadAllRegions = useCallback(async (typeId) => {
    const initial = {};
    REGIONS.forEach((r) => { initial[r.id] = { buy: [], sell: [], loading: true, error: null }; });
    setRegionData(initial);

    // Fetch EVE type info (description, volume, mass) directly from ESI — no DB for this
    axios
      .get(`${ESI}/universe/types/${typeId}/`, { params: { datasource: "tranquility" } })
      .then((res) => setTypeInfo(res.data))
      .catch(() => {});

    // Fetch each region independently so they render as they arrive
    REGIONS.forEach(async (region) => {
      try {
        const res = await axios.get(`${BACKEND}market/orders`, {
          params: { typeId, regionId: region.id },
        });
        const all = res.data;
        setRegionData((prev) => ({
          ...prev,
          [region.id]: {
            buy:     all.filter((o) =>  o.is_buy_order).sort((a, b) => b.price - a.price),
            sell:    all.filter((o) => !o.is_buy_order).sort((a, b) => a.price - b.price),
            loading: false,
            error:   null,
          },
        }));
      } catch {
        setRegionData((prev) => ({
          ...prev,
          [region.id]: { buy: [], sell: [], loading: false, error: "No data" },
        }));
      }
    });
  }, []);

  // Fetch price history from backend DB (backfills ~13 months on first request, then grows daily)
  const loadHistory = useCallback(async (typeId, regionId) => {
    setHistoryLoading(true);
    setHistory([]);
    try {
      const res = await axios.get(`${BACKEND}market/history`, {
        params: { typeId, regionId },
      });
      setHistory(res.data);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const handleTypeSelect = useCallback(
    (item) => {
      setSelectedItem(item);
      setTypeInfo(null);
      setExpandedRegion(null);
      setHistory([]);
      loadAllRegions(item.typeId);
    },
    [loadAllRegions]
  );

  const handleRegionExpand = useCallback(
    (regionId) => {
      if (expandedRegion === regionId) {
        setExpandedRegion(null);
        setHistory([]);
        return;
      }
      setExpandedRegion(regionId);
      if (selectedItem) loadHistory(selectedItem.typeId, regionId);
    },
    [expandedRegion, selectedItem, loadHistory]
  );

  return (
    <Animated>
      <div id="market-browser">

        {/* ── Left panel ── */}
        <div id="market-left-panel">
          <div id="market-panel-header">Browse</div>
          <MarketSearch onItemSelect={handleTypeSelect} />
          <MarketCategoryTree
            onTypeSelect={handleTypeSelect}
            selectedTypeId={selectedItem?.typeId}
          />
        </div>

        {/* ── Right panel ── */}
        <div id="market-right-panel">

          {/* Item header */}
          {typeInfo && (
            <div id="market-item-header">
              <img
                src={`https://images.evetech.net/types/${typeInfo.type_id}/icon?size=64`}
                alt={typeInfo.name}
                width={52}
                height={52}
                style={{ borderRadius: 3, border: "1px solid #454545", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 600 }}>{typeInfo.name}</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {typeInfo.volume         != null && <>Vol: {typeInfo.volume.toFixed(2)} m³</>}
                  {typeInfo.packaged_volume != null && <> · Packaged: {typeInfo.packaged_volume.toFixed(2)} m³</>}
                  {typeInfo.mass           != null && <> · Mass: {typeInfo.mass.toLocaleString()} kg</>}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder */}
          {!selectedItem && (
            <Alert variant="success" style={{ marginTop: 20, fontSize: "1rem" }}>
              Select an item from the category tree or search to view market data.
            </Alert>
          )}

          {/* All-region summary + expanded detail */}
          {selectedItem && (
            <MarketOrders
              regions={REGIONS}
              regionData={regionData}
              expandedRegion={expandedRegion}
              onRegionExpand={handleRegionExpand}
              history={history}
              historyLoading={historyLoading}
            />
          )}
        </div>
      </div>
    </Animated>
  );
}

export default MarketHome;

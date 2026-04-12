"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_API_URL;

async function buildTypeIndex() {
  const res = await axios.get(`${BACKEND}market/types`);
  // backend returns [{ typeId, name }, ...]
  return res.data;
}

function MarketSearch({ onItemSelect }) {
  const [types,     setTypes]     = useState([]);   // full index
  const [status,    setStatus]    = useState("loading"); // loading | ready
  const [query,     setQuery]     = useState("");
  const [results,   setResults]   = useState([]);
  const [open,      setOpen]      = useState(false);
  const inputRef    = useRef(null);
  const wrapperRef  = useRef(null);

  // Load type index from backend (cached globally server-side)
  useEffect(() => {
    setStatus("loading");
    buildTypeIndex()
      .then((index) => {
        setTypes(index);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  // Filter as user types
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const matches = types
      .filter((t) => t.name.toLowerCase().includes(q))
      .slice(0, 20);
    setResults(matches);
    setOpen(matches.length > 0);
  }, [query, types]);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = useCallback(
    (item) => {
      setQuery(item.name);
      setOpen(false);
      onItemSelect(item);
    },
    [onItemSelect]
  );

  return (
    <div id="market-search-box" ref={wrapperRef} style={{ position: "relative" }}>
      <input
        ref={inputRef}
        className="form-control form-control-sm"
        placeholder={
          status === "loading" ? "Building index..." :
          status === "error"   ? "Search unavailable" :
          "Search items..."
        }
        disabled={status !== "ready"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        style={{ fontSize: "0.75rem", background: "#3C3C3C", borderColor: "#454545", color: "#D4D4D4" }}
        autoComplete="off"
      />
      {status === "loading" && (
        <span
          className="spinner-border spinner-border-sm"
          style={{ position: "absolute", right: 8, top: 7, width: 12, height: 12, color: "#858585" }}
        />
      )}
      {open && (
        <ul className="market-search-dropdown">
          {results.map((item) => (
            <li
              key={item.typeId}
              className="market-search-option"
              onMouseDown={() => handleSelect(item)}
            >
              <img
                src={`https://images.evetech.net/types/${item.typeId}/icon?size=32`}
                alt=""
                width={18}
                height={18}
                style={{ borderRadius: 2, marginRight: 6, flexShrink: 0 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MarketSearch;

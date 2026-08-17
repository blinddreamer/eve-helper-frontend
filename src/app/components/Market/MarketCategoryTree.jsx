"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

const BACKEND = process.env.NEXT_PUBLIC_API_URL;
const IMGS    = "https://images.evetech.net";

function typeIconEndpoint(name) {
  if (name && name.endsWith(" Blueprint Copy")) return "bpc";
  if (name && name.endsWith(" Blueprint")) return "bp";
  return "icon";
}

function GroupIcon({ expanded }) {
  return expanded
    ? <FaFolderOpen size={13} style={{ marginRight: 6, color: "var(--market-accent-alt)", flexShrink: 0 }} />
    : <FaFolder     size={13} style={{ marginRight: 6, color: "var(--market-text-dim)", flexShrink: 0 }} />;
}

function TypeIcon({ typeId, name }) {
  return (
    <img
      src={`${IMGS}/types/${typeId}/${typeIconEndpoint(name)}?size=32`}
      alt=""
      width={16}
      height={16}
      style={{ marginRight: 6, borderRadius: 2, flexShrink: 0, opacity: 0.85 }}
      onError={(e) => { e.target.style.display = "none"; }}
    />
  );
}

// One node of the in-game market group tree (mirrors the EVE client's Market browser).
function GroupNode({ group, childrenByParent, typesByGroup, loadingTypes, expanded, onToggle, onTypeSelect, selectedTypeId, depth }) {
  const isExpanded = expanded.has(group.marketGroupId);
  const children = childrenByParent.get(group.marketGroupId) || [];
  const types = typesByGroup[group.marketGroupId];

  return (
    <div>
      <div
        className={depth === 0 ? "market-tree-category" : "market-tree-group"}
        onClick={() => onToggle(group)}
      >
        <GroupIcon expanded={isExpanded} />
        <span className="market-tree-label" title={group.marketGroupName}>{group.marketGroupName}</span>
        {loadingTypes.has(group.marketGroupId) && (
          <span className="spinner-border spinner-border-sm ms-1" style={{ width: 10, height: 10 }} />
        )}
      </div>

      {isExpanded && (
        <div className="market-tree-groups">
          {children.map((child) => (
            <GroupNode
              key={child.marketGroupId}
              group={child}
              childrenByParent={childrenByParent}
              typesByGroup={typesByGroup}
              loadingTypes={loadingTypes}
              expanded={expanded}
              onToggle={onToggle}
              onTypeSelect={onTypeSelect}
              selectedTypeId={selectedTypeId}
              depth={depth + 1}
            />
          ))}

          {group.hasTypes && types && (
            <div className="market-tree-types">
              {types.length === 0 && <div className="market-tree-type text-muted">No items</div>}
              {types.map((type) => (
                <div
                  key={type.typeId}
                  className={`market-tree-type ${selectedTypeId === type.typeId ? "active" : ""}`}
                  onClick={() => onTypeSelect(type)}
                >
                  <TypeIcon typeId={type.typeId} name={type.name} />
                  <span className="market-tree-label" title={type.name}>{type.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MarketCategoryTree({ onTypeSelect, selectedTypeId }) {
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [expanded, setExpanded] = useState(new Set());
  const [typesByGroup, setTypesByGroup] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(new Set());

  useEffect(() => {
    axios
      .get(`${BACKEND}market/groups`)
      .then((res) => setGroups(res.data))
      .catch(() => {})
      .finally(() => setLoadingGroups(false));
  }, []);

  const roots = useMemo(
    () => groups.filter((g) => !g.parentGroupId).sort((a, b) => a.marketGroupName.localeCompare(b.marketGroupName)),
    [groups]
  );

  const childrenByParent = useMemo(() => {
    const map = new Map();
    for (const g of groups) {
      if (!g.parentGroupId) continue;
      if (!map.has(g.parentGroupId)) map.set(g.parentGroupId, []);
      map.get(g.parentGroupId).push(g);
    }
    for (const list of map.values()) list.sort((a, b) => a.marketGroupName.localeCompare(b.marketGroupName));
    return map;
  }, [groups]);

  const toggle = useCallback(
    (group) => {
      const id = group.marketGroupId;
      setExpanded((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

      if (group.hasTypes && !typesByGroup[id] && !loadingTypes.has(id)) {
        setLoadingTypes((prev) => new Set(prev).add(id));
        axios
          .get(`${BACKEND}market/groups/${id}/types`)
          .then((res) => setTypesByGroup((prev) => ({ ...prev, [id]: res.data })))
          .catch(() => setTypesByGroup((prev) => ({ ...prev, [id]: [] })))
          .finally(() =>
            setLoadingTypes((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            })
          );
      }
    },
    [typesByGroup, loadingTypes]
  );

  if (loadingGroups) {
    return (
      <div className="market-tree-loading">
        <div className="spinner-border spinner-border-sm" role="status" />
        <span> Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="market-category-tree">
      {roots.map((group) => (
        <GroupNode
          key={group.marketGroupId}
          group={group}
          childrenByParent={childrenByParent}
          typesByGroup={typesByGroup}
          loadingTypes={loadingTypes}
          expanded={expanded}
          onToggle={toggle}
          onTypeSelect={onTypeSelect}
          selectedTypeId={selectedTypeId}
          depth={0}
        />
      ))}
    </div>
  );
}

export default MarketCategoryTree;

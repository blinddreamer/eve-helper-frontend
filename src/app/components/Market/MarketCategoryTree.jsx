"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

const ESI   = "https://esi.evetech.net/latest";
const IMGS  = "https://images.evetech.net";

// Whitelist of player-visible market categories.
// Excludes non-item categories like Celestial (space objects), Asteroid (raw rocks),
// Planetary Resources / Colony Resources (raw surface resources), and Personalization (cosmetics).
const PLAYER_CATEGORY_IDS = new Set([
  4,    // Material
  5,    // Accessories
  6,    // Ship
  7,    // Module
  8,    // Charge
  9,    // Blueprint
  16,   // Skill
  17,   // Commodity
  18,   // Drone
  20,   // Implant
  22,   // Deployable
  23,   // Starbase
  24,   // Reaction
  30,   // Apparel
  32,   // Subsystem
  34,   // Ancient Relics
  35,   // Decryptors
  39,   // Infrastructure Upgrades
  40,   // Sovereignty Structures
  41,   // Planetary Industry
  43,   // Planetary Commodities
  46,   // Orbitals
  63,   // Special Edition Assets
  87,   // Fighter
  91,   // SKINs
  2100, // Expert Systems
]);

function isDevItem(name) {
  return (
    name.startsWith("QA ") ||
    name.includes("DO NOT") ||
    name.includes("Test Server") ||
    name.includes("UNUSED") ||
    name.includes("Abyssal")
  );
}

async function esiGet(path, params = {}) {
  const res = await axios.get(`${ESI}${path}`, { params: { datasource: "tranquility", ...params } });
  return res.data;
}

function CatIcon({ categoryId, expanded }) {
  return (
    <img
      src={`${IMGS}/categories/${categoryId}/icon?size=32`}
      alt=""
      width={18}
      height={18}
      style={{ marginRight: 6, borderRadius: 2, flexShrink: 0, opacity: expanded ? 1 : 0.75 }}
      onError={(e) => { e.target.style.display = "none"; }}
    />
  );
}

function GroupIcon({ expanded }) {
  return expanded
    ? <FaFolderOpen size={13} style={{ marginRight: 6, color: "#9CDCFE", flexShrink: 0 }} />
    : <FaFolder     size={13} style={{ marginRight: 6, color: "#858585", flexShrink: 0 }} />;
}

function typeIconEndpoint(name) {
  if (name && name.endsWith(" Blueprint Copy")) return "bpc";
  if (name && name.endsWith(" Blueprint")) return "bp";
  return "icon";
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

function MarketCategoryTree({ onTypeSelect, selectedTypeId }) {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [groupsMap, setGroupsMap] = useState({});   // categoryId → [{ id, name, types }]
  const [typesMap, setTypesMap] = useState({});     // groupId → [{ typeId, name }]
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(new Set());
  const [loadingTypes, setLoadingTypes] = useState(new Set());

  // Load all published categories on mount
  useEffect(() => {
    async function load() {
      try {
        const ids = await esiGet("/universe/categories/");
        const all = await Promise.all(ids.map((id) => esiGet(`/universe/categories/${id}/`)));
        const published = all
          .filter((c) => c.published && PLAYER_CATEGORY_IDS.has(c.category_id))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCategories(published);
      } catch {
        // silently fail
      } finally {
        setLoadingCategories(false);
      }
    }
    load();
  }, []);

  const toggleCategory = useCallback(
    async (category) => {
      const id = category.category_id;
      const isExpanded = expandedCategories.has(id);

      setExpandedCategories((prev) => {
        const next = new Set(prev);
        isExpanded ? next.delete(id) : next.add(id);
        return next;
      });

      if (!isExpanded && !groupsMap[id]) {
        setLoadingGroups((prev) => new Set(prev).add(id));
        try {
          const groups = await Promise.all(
            category.groups.map((gid) => esiGet(`/universe/groups/${gid}/`))
          );
          const published = groups
            .filter((g) => g.published)
            .sort((a, b) => a.name.localeCompare(b.name));
          setGroupsMap((prev) => ({ ...prev, [id]: published }));
        } catch {
          // silently fail
        } finally {
          setLoadingGroups((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }
      }
    },
    [expandedCategories, groupsMap]
  );

  const toggleGroup = useCallback(
    async (group) => {
      const id = group.group_id;
      const isExpanded = expandedGroups.has(id);

      setExpandedGroups((prev) => {
        const next = new Set(prev);
        isExpanded ? next.delete(id) : next.add(id);
        return next;
      });

      if (!isExpanded && !typesMap[id]) {
        setLoadingTypes((prev) => new Set(prev).add(id));
        try {
          const typeIds = group.types.slice(0, 100);
          if (typeIds.length === 0) {
            setTypesMap((prev) => ({ ...prev, [id]: [] }));
            return;
          }
          const namesRes = await axios.post(
            `${ESI}/universe/names/?datasource=tranquility`,
            typeIds
          );
          const sorted = namesRes.data
            .filter((t) => t.category === "inventory_type")
            .filter((t) => !isDevItem(t.name))
            .sort((a, b) => a.name.localeCompare(b.name));
          setTypesMap((prev) => ({
            ...prev,
            [id]: sorted.map((t) => ({ typeId: t.id, name: t.name })),
          }));
        } catch {
          setTypesMap((prev) => ({ ...prev, [id]: [] }));
        } finally {
          setLoadingTypes((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }
      }
    },
    [expandedGroups, typesMap]
  );

  if (loadingCategories) {
    return (
      <div className="market-tree-loading">
        <div className="spinner-border spinner-border-sm" role="status" />
        <span> Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="market-category-tree">
      {categories.map((cat) => {
        const catExpanded = expandedCategories.has(cat.category_id);
        return (
          <div key={cat.category_id}>
            {/* Category row */}
            <div
              className="market-tree-category"
              onClick={() => toggleCategory(cat)}
            >
              <CatIcon categoryId={cat.category_id} expanded={catExpanded} />
              {cat.name}
              {loadingGroups.has(cat.category_id) && (
                <span className="spinner-border spinner-border-sm ms-1" style={{ width: 10, height: 10 }} />
              )}
            </div>

            {/* Groups */}
            {catExpanded && groupsMap[cat.category_id] && (
              <div className="market-tree-groups">
                {groupsMap[cat.category_id].map((group) => {
                  const groupExpanded = expandedGroups.has(group.group_id);
                  return (
                    <div key={group.group_id}>
                      {/* Group row */}
                      <div
                        className="market-tree-group"
                        onClick={() => toggleGroup(group)}
                      >
                        <GroupIcon expanded={groupExpanded} />
                        {group.name}
                        {loadingTypes.has(group.group_id) && (
                          <span className="spinner-border spinner-border-sm ms-1" style={{ width: 10, height: 10 }} />
                        )}
                      </div>

                      {/* Types */}
                      {groupExpanded && typesMap[group.group_id] && (
                        <div className="market-tree-types">
                          {typesMap[group.group_id].length === 0 && (
                            <div className="market-tree-type text-muted">No items</div>
                          )}
                          {typesMap[group.group_id].map((type) => (
                            <div
                              key={type.typeId}
                              className={`market-tree-type ${selectedTypeId === type.typeId ? "active" : ""}`}
                              onClick={() => onTypeSelect(type)}
                            >
                              <TypeIcon typeId={type.typeId} name={type.name} />
                              {type.name}
                            </div>
                          ))}
                          {group.types.length > 100 && (
                            <div className="market-tree-type text-muted" style={{ fontStyle: "italic", cursor: "default" }}>
                              Showing 100 of {group.types.length} — use search for more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MarketCategoryTree;

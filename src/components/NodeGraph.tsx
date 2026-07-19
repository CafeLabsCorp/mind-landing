"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { graphEdges, type GraphNode } from "@/lib/graph-data";

type NodeGraphProps = {
  nodes: GraphNode[];
  onSelect: (node: GraphNode, trigger: HTMLElement) => void;
};

/**
 * The SVG below is purely decorative (`aria-hidden`, `focusable="false"`) —
 * the real interaction happens on transparent HTML buttons stacked at the
 * same coordinates in `.node-hit-layer`, giving native button semantics
 * (focus order, Enter/Space activation, screen reader name) for free. This
 * mirrors the approved mockup exactly; do not merge the two layers.
 */
export function NodeGraph({ nodes: graphNodes, onSelect }: NodeGraphProps) {
  const t = useTranslations("NodeGraph");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const byId = useMemo(
    () => Object.fromEntries(graphNodes.map((n) => [n.id, n])),
    [graphNodes],
  );

  return (
    <div className="graph-panel">
      <p className="graph-caption" id="graphCaption">
        {t("caption")}
      </p>
      <div className="graph-wrap">
        <svg
          className="graph"
          viewBox="0 0 420 420"
          aria-hidden="true"
          focusable="false"
        >
          <g className="edges">
            {graphEdges.map(([a, b], i) => {
              const na = byId[a];
              const nb = byId[b];
              return (
                <line
                  key={`${a}-${b}`}
                  className={`edge${na.leaf || nb.leaf ? " leaf-extra" : ""}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  style={{ animationDelay: `${0.15 + i * 0.06}s` }}
                />
              );
            })}
          </g>
          <g className="nodes">
            {graphNodes.map((n, i) => (
              <g
                key={n.id}
                className={[
                  "node-dot",
                  n.hub && "hub",
                  n.leaf && "leaf-extra",
                  hoveredId === n.id && "is-hover",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ animationDelay: `${0.45 + i * 0.07}s` }}
              >
                <circle
                  className="core"
                  cx={n.x}
                  cy={n.y}
                  r={n.hub ? 11 : n.leaf ? 5.5 : 7}
                />
                <text
                  className="node-label"
                  x={n.x}
                  y={n.y + (n.hub ? 26 : 20)}
                >
                  {n.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <div className="node-hit-layer">
          {graphNodes.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`node-hit${n.leaf ? " leaf-extra" : ""}`}
              style={{
                left: `${(n.x / 420) * 100}%`,
                top: `${(n.y / 420) * 100}%`,
              }}
              aria-haspopup="dialog"
              aria-describedby="graphCaption"
              onClick={(e) => onSelect(n, e.currentTarget)}
              onPointerEnter={() => setHoveredId(n.id)}
              onPointerLeave={() =>
                setHoveredId((id) => (id === n.id ? null : id))
              }
              onFocus={() => setHoveredId(n.id)}
              onBlur={() => setHoveredId((id) => (id === n.id ? null : id))}
            >
              <span className="visually-hidden">
                {t("openNode", { label: n.label })}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

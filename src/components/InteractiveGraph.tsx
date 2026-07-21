"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { NodeGraph } from "@/components/NodeGraph";
import { NodeModal } from "@/components/NodeModal";
import { graphNodeShapes, type GraphNode } from "@/lib/graph-data";

/**
 * Wires the graph and its example modal together: tracks which node is
 * active, and — for accessibility — remembers which button opened the
 * modal so focus returns to it on close (Escape, backdrop click, or the
 * close button).
 */
export function InteractiveGraph() {
  const t = useTranslations("Graph");
  const [activeNode, setActiveNode] = useState<GraphNode | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const nodes = useMemo<GraphNode[]>(
    () =>
      graphNodeShapes.map((shape) => ({
        ...shape,
        label: t(`${shape.id}.label`),
        path: t(`${shape.id}.path`),
        body: t(`${shape.id}.body`),
        caption: t(`${shape.id}.caption`),
      })),
    [t],
  );

  const handleSelect = useCallback((node: GraphNode, trigger: HTMLElement) => {
    lastFocused.current = trigger;
    setActiveNode(node);
  }, []);

  const handleClose = useCallback(() => {
    setActiveNode(null);
    lastFocused.current?.focus();
  }, []);

  return (
    <>
      <NodeGraph nodes={nodes} onSelect={handleSelect} />
      <NodeModal node={activeNode} onClose={handleClose} />
    </>
  );
}

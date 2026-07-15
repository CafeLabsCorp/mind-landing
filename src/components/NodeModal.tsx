"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { GraphNode } from "@/lib/graph-data";

type NodeModalProps = {
  node: GraphNode | null;
  onClose: () => void;
};

/** Focusable-element selector used for the Tab focus trap inside the dialog. */
const FOCUSABLE_SELECTOR = 'button, [href], [tabindex]:not([tabindex="-1"])';

export function NodeModal({ node, onClose }: NodeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!node) return;
    dialogRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables =
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [node, onClose]);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-5 backdrop-blur-[2px]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative w-full max-w-[400px] rounded-[var(--radius)] border border-border bg-surface p-5.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            aria-describedby="modalPath"
            tabIndex={-1}
            ref={dialogRef}
            initial={reduceMotion ? false : { y: 8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <button
              className="absolute top-1.5 right-1.5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-xl text-subtle hover:bg-surface-2 hover:text-fg"
              aria-label="Fechar exemplo"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="mb-1 flex items-center gap-[9px] pr-9">
              <span
                className="h-[9px] w-[9px] shrink-0 rounded-full bg-green"
                aria-hidden="true"
              />
              <h3 id="modalTitle" className="text-[17px]">
                {node.label}
              </h3>
            </div>
            <span className="mono mb-3.5 block text-xs text-subtle" id="modalPath">
              {node.path}
            </span>
            <pre className="mono mb-3 max-h-[220px] overflow-y-auto rounded-[9px] border border-border bg-code-bg px-3.5 py-3 text-[12.5px] leading-[1.7] whitespace-pre-wrap text-muted">
              {node.body}
            </pre>
            <p className="m-0 text-[12.5px] text-subtle italic">
              {node.caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

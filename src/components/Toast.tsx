"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 2200;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const showToast = useCallback((next: string) => {
    setMessage(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(null), TOAST_DURATION);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              className="w-max max-w-[calc(100vw-32px)] rounded-[10px] border border-green bg-surface px-4.5 py-3 text-center font-mono text-[13.5px] whitespace-normal text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

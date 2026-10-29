"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

// Alterna claro ↔ escuro. Antes do primeiro clique segue o sistema; o
// clique sempre vai pro tema oposto ao que está na tela, então nunca é um
// clique "sem efeito" (o que aconteceria com um ciclo sistema → claro →
// escuro quando o sistema já está no claro).
const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("ThemeToggle");
  // O tema salvo só existe no cliente; no servidor (e na hidratação) um
  // placeholder do mesmo tamanho evita erro de hidratação e pulo de layout.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-border px-3 py-2 text-muted transition-colors duration-200 hover:border-subtle hover:text-fg"
      aria-label={mounted ? t(isDark ? "toLight" : "toDark") : t("label")}
      title={mounted ? t(isDark ? "toLight" : "toDark") : undefined}
    >
      {!mounted ? (
        <span className="block h-4 w-4" />
      ) : isDark ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </button>
  );
}

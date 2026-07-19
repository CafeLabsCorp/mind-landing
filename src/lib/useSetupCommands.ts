"use client";

import { useTranslations } from "next-intl";
import { buildSetupCommands } from "@/lib/site";

export function useSetupCommands() {
  const t = useTranslations("SetupCommands");
  return buildSetupCommands(
    t("step1"),
    t("step2"),
    t("originPlaceholder"),
  );
}

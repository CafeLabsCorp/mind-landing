"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";
import { useToast } from "@/components/Toast";
import { useSetupCommands } from "@/lib/useSetupCommands";

/**
 * Copies the full setup command block (fork-manual flow, two remotes) to
 * the clipboard, with the fallback the mockup specifies: if the Clipboard
 * API fails (permissions, insecure context, unsupported browser), reveal a
 * selectable multi-line block instead of failing silently.
 *
 * Conversion point 1/2: fires `copy_clone_command` on every click, whether
 * or not the clipboard write itself succeeds — the click is the conversion
 * signal, the fallback panel still lets the user finish the copy by hand.
 * Event name is unchanged from the earlier (single git-clone-line) version;
 * only the copied content grew.
 *
 * Tagged with the same `location` values as GitHubLink ("hero" | "final_cta")
 * so the two CTAs can be compared against each other, not just aggregated.
 */
export function useCloneCopy(location: "hero" | "final_cta") {
  const { showToast } = useToast();
  const t = useTranslations("CloneCopy");
  const setupCommands = useSetupCommands();
  const [showFallback, setShowFallback] = useState(false);

  const copy = useCallback(async () => {
    track("copy_clone_command", { location });
    try {
      await navigator.clipboard.writeText(setupCommands);
      setShowFallback(false);
      showToast(t("copied"));
    } catch {
      setShowFallback(true);
      showToast(t("copyFailed"));
    }
  }, [showToast, location, t, setupCommands]);

  return { copy, showFallback };
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "pt" ? "en" : "pt";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="flex min-h-11 items-center gap-2 rounded-[10px] border border-border px-3.5 py-2 text-sm font-medium text-muted no-underline transition-colors duration-200 hover:border-subtle hover:text-fg"
      aria-label={t("label")}
    >
      {nextLocale}
    </button>
  );
}

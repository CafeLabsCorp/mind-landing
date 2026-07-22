"use client";

import { useTranslations } from "next-intl";
import { CopyIcon, PlusIcon, StarIcon } from "@/components/icons";
import { GitHubLink } from "@/components/GitHubLink";
import { InteractiveGraph } from "@/components/InteractiveGraph";
import { useCloneCopy } from "@/lib/useCloneCopy";
import { useSetupCommands } from "@/lib/useSetupCommands";

// 77px = altura renderizada do <SiteHeader /> (medida, estável em
// mobile/desktop). Descontada aqui pra hero+header preencherem exatamente
// uma tela, centralizando o conteúdo no espaço visível abaixo do header.
const HEADER_HEIGHT_PX = 77;

export function Hero() {
  const t = useTranslations("Hero");
  const { copy, showFallback } = useCloneCopy("hero");
  const setupCommands = useSetupCommands();

  return (
    <section
      className="relative flex items-center overflow-hidden pt-14 pb-22 max-[860px]:pt-10 max-[860px]:pb-12"
      style={{ minHeight: `calc(100dvh - ${HEADER_HEIGHT_PX}px)` }}
    >
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-[1.1fr_0.9fr] items-center gap-8 px-6 max-[860px]:grid-cols-1">
        <div>
          <span className="eyebrow-accent mb-5.5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[12.5px] text-green">
            <PlusIcon /> open source · MIT
          </span>
          <h1 className="max-w-[640px] text-[56px] leading-[1.06] max-[860px]:text-4xl">
            {t("titleBefore")}
            <br />
            <span className="text-green">{t("titleAccent")}</span>
          </h1>
          <p className="mt-5.5 max-w-[540px] text-lg leading-[1.6] text-muted max-[860px]:text-base">
            {t.rich("subtitle", {
              strong: (chunks) => <strong className="font-semibold text-fg">{chunks}</strong>,
            })}
          </p>
          <div className="mt-8.5 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              className="btn-primary inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-transparent bg-green px-5.5 py-[13px] text-[15px] font-semibold text-[#08150a] transition-[transform,filter] duration-150 ease-out hover:brightness-110 active:scale-[0.98]"
              aria-describedby="copyHint"
              onClick={copy}
            >
              <CopyIcon />
              {t("ctaCopy")}
            </button>
            <GitHubLink
              location="hero"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-border px-5 py-3 text-[15px] font-semibold text-fg no-underline transition-[transform,filter] duration-150 ease-out hover:border-subtle active:scale-[0.98]"
            >
              <StarIcon />
              {t("ctaGithub")}
            </GitHubLink>
          </div>
          <p
            id="copyHint"
            className="mt-4.5 flex items-center gap-2 font-mono text-[13px] text-subtle"
          >
            {t("copyHint")}
          </p>
          <div
            className={`mt-2.5 text-[13px] text-subtle ${showFallback ? "block" : "hidden"}`}
          >
            {t("fallbackText")}
            <pre className="mt-1.5 block overflow-x-auto rounded-lg border border-border bg-code-bg px-3 py-2.5 font-mono text-xs leading-[1.7] break-words whitespace-pre-wrap text-muted select-all">
              {setupCommands}
            </pre>
          </div>
        </div>

        <InteractiveGraph />
      </div>

      <a
        href="#conceito"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center font-mono text-[12.5px] text-subtle transition-colors hover:text-fg max-[860px]:hidden"
      >
        <span className="text-green mr-2" aria-hidden="true">
          $
        </span>
        {t("scrollHint")}
        <span className="cursor" aria-hidden="true" />
      </a>
    </section>
  );
}

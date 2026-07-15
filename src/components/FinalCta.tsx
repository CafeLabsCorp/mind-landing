"use client";

import { Reveal } from "@/components/Reveal";
import { GitHubLink } from "@/components/GitHubLink";
import { CopyIcon } from "@/components/icons";
import { useCloneCopy } from "@/lib/useCloneCopy";

export function FinalCta() {
  const { copy } = useCloneCopy("final_cta");

  return (
    <section className="cta-final-glow border-t border-border py-22 text-center max-[860px]:py-14">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="mx-auto max-w-[640px] text-[34px] max-[860px]:text-[26px]" as="h2">
          Sua memória, no seu git, hoje.
        </Reveal>
        <Reveal className="mt-3.5 text-base text-muted" as="p">
          Um repo seu, um script, e o Claude Code para de começar do zero.
        </Reveal>
        <Reveal
          className="mt-8.5 flex flex-wrap items-center justify-center gap-3.5"
          as="div"
        >
          <button
            type="button"
            className="btn-primary inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-transparent bg-green px-5.5 py-[13px] text-[15px] font-semibold text-[#08150a] transition-[transform,filter] duration-150 ease-out hover:brightness-110 active:scale-[0.98]"
            onClick={copy}
          >
            <CopyIcon />
            Copiar comandos de setup
          </button>
          <GitHubLink
            location="final_cta"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-border px-5 py-3 text-[15px] font-semibold text-fg no-underline transition-[transform,filter] duration-150 ease-out hover:border-subtle active:scale-[0.98]"
          >
            ★ Star no GitHub
          </GitHubLink>
        </Reveal>
        <p className="mt-4 text-[13px] text-subtle">
          Grátis, open source (MIT), sem cadastro.
        </p>
      </div>
    </section>
  );
}

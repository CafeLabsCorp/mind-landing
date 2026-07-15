"use client";

import { CopyIcon, PlusIcon, StarIcon } from "@/components/icons";
import { GitHubLink } from "@/components/GitHubLink";
import { InteractiveGraph } from "@/components/InteractiveGraph";
import { SETUP_COMMANDS } from "@/lib/site";
import { useCloneCopy } from "@/lib/useCloneCopy";

export function Hero() {
  const { copy, showFallback } = useCloneCopy("hero");

  return (
    <section className="relative overflow-hidden pt-14 pb-22 max-[860px]:pt-10 max-[860px]:pb-12">
      <div className="mx-auto grid max-w-[1120px] grid-cols-[1.1fr_0.9fr] items-center gap-8 px-6 max-[860px]:grid-cols-1">
        <div>
          <span className="eyebrow-accent mb-5.5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[12.5px] text-green">
            <PlusIcon /> open source · MIT
          </span>
          <h1 className="max-w-[640px] text-[56px] leading-[1.06] max-[860px]:text-4xl">
            Sua mente, <span className="text-green">versionada.</span>
          </h1>
          <p className="mt-5.5 max-w-[540px] text-lg leading-[1.6] text-muted max-[860px]:text-base">
            O <strong className="font-semibold text-fg">mind</strong> é um
            vault de conhecimento pessoal em Markdown e git — onde vivem seus
            fatos, suas decisões e as regras de como você quer ser ajudado.
            Você é dono de cada linha, sem caixa-preta e sem infra extra.
          </p>
          <div className="mt-8.5 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              className="btn-primary inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-transparent bg-green px-5.5 py-[13px] text-[15px] font-semibold text-[#08150a] transition-[transform,filter] duration-150 ease-out hover:brightness-110 active:scale-[0.98]"
              aria-describedby="copyHint"
              onClick={copy}
            >
              <CopyIcon />
              Copiar comandos de setup
            </button>
            <GitHubLink
              location="hero"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-border px-5 py-3 text-[15px] font-semibold text-fg no-underline transition-[transform,filter] duration-150 ease-out hover:border-subtle active:scale-[0.98]"
            >
              <StarIcon />
              Ver no GitHub
            </GitHubLink>
          </div>
          <p
            id="copyHint"
            className="mt-4.5 flex items-center gap-2 font-mono text-[13px] text-subtle"
          >
            $ crie seu repo → aponte pro seu repo → setup · sem cadastro
          </p>
          <div
            className={`mt-2.5 text-[13px] text-subtle ${showFallback ? "block" : "hidden"}`}
          >
            Não foi possível copiar automaticamente — selecione o bloco
            abaixo (edite a URL do seu repo antes de rodar):
            <pre className="mt-1.5 block overflow-x-auto rounded-lg border border-border bg-code-bg px-3 py-2.5 font-mono text-xs leading-[1.7] break-words whitespace-pre-wrap text-muted select-all">
              {SETUP_COMMANDS}
            </pre>
          </div>
        </div>

        <InteractiveGraph />
      </div>
    </section>
  );
}

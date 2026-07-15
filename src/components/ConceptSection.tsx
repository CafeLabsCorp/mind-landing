import { Reveal } from "@/components/Reveal";

export function ConceptSection() {
  return (
    <section
      id="conceito"
      className="border-t border-border py-22 max-[860px]:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="mb-13 max-w-[640px]" as="div">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[12.5px] text-subtle">
            o problema
          </span>
          <h2 className="text-4xl leading-[1.15] max-[860px]:text-[28px]">
            Toda sessão nova, o mesmo resumo.
          </h2>
          <p className="mt-3.5 text-[17px] text-muted">
            Memória interna existe — mas é opaca, e reseta a forma como você
            tem que explicar as coisas. O mind troca isso por um vault que
            você enxerga e edita.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          <Reveal
            className="rounded-[var(--radius)] border border-border bg-surface p-6.5 opacity-75"
            as="div"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-[5px] font-mono text-[12.5px] text-subtle">
              sem mind
            </span>
            <h3 className="mb-2.5 text-[19px]">
              Memória interna do assistente
            </h3>
            <div className="mt-3.5 rounded-[10px] border border-dashed border-border bg-code-bg p-3.5 font-mono text-[13px] text-subtle">
              &ldquo;lembra que eu te falei sobre o projeto X...&rdquo;
              <br />
              <span style={{ opacity: 0.5 }}>— toda sessão, de novo</span>
            </div>
            <ul className="mt-4 list-disc pl-[18px] text-[15px] text-muted">
              <li className="mb-2">
                Caixa-preta: você não vê nem edita o que foi guardado
              </li>
              <li className="mb-2">
                Presa ao produto — não acompanha se você trocar de ferramenta
              </li>
            </ul>
            <p className="mt-2 text-xs text-subtle italic">
              reinicia, se dilui, você reexplica
            </p>
          </Reveal>
          <Reveal
            className="compare-card-accent rounded-[var(--radius)] border bg-surface p-6.5"
            as="div"
          >
            <span className="tag-accent mb-4 inline-flex items-center gap-2 rounded-full px-2.5 py-[5px] font-mono text-[12.5px] text-green">
              com mind
            </span>
            <h3 className="mb-2.5 text-[19px]">Vault versionado, seu</h3>
            <div className="md-note mt-3.5 rounded-[10px] bg-code-bg p-3.5 font-mono text-[13px] text-muted">
              projetos/hobby.md
              <br />
              <span className="text-subtle">tags: [mobile, backend]</span>
              <br />
              ## Estado atual
              <br />
              App em produção. Próximo: revisar autenticação...
            </div>
            <ul className="mt-4 list-disc pl-[18px] text-[15px] text-muted">
              <li className="mb-2">
                Markdown real, no seu git — abre em qualquer editor
              </li>
              <li className="mb-2">
                Sobrevive a troca de ferramenta, de máquina, de sessão
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";
import { README_SETUP_URL } from "@/lib/site";

const steps = [
  {
    title: "Crie seu repo",
    description: "Vazio e privado — GitHub, GitLab, tanto faz. Sem README nem .gitignore.",
  },
  {
    title: "Aponte pro seu repo",
    description: (
      <>
        Clone o template e troque os remotes: ele vira{" "}
        <code className="mono">upstream</code>, o seu vira{" "}
        <code className="mono">origin</code>.
      </>
    ),
  },
  {
    title: "Rode o setup",
    description: <code className="mono">./scripts/setup-symlinks.sh</code>,
  },
  {
    title: "Abra e converse",
    description: (
      <>
        <code className="mono">claude</code> no terminal — a Skill cuida do
        resto.
      </>
    ),
  },
];

export function HowToStart() {
  return (
    <section
      id="comecar"
      className="border-t border-border py-22 max-[860px]:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="mb-13 max-w-[640px]" as="div">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[12.5px] text-subtle">
            fricção quase zero
          </span>
          <h2 className="text-4xl leading-[1.15] max-[860px]:text-[28px]">
            Funciona com o que você já tem.
          </h2>
          <p className="mt-3.5 text-[17px] text-muted">
            Não é um <code className="mono">git clone</code> direto: você
            vira dono de um repo próprio desde o primeiro commit — e mesmo
            assim continua recebendo atualizações do template quando quiser.
          </p>
        </Reveal>
        <div className="relative grid grid-cols-4 gap-4.5 max-[860px]:grid-cols-2 max-[860px]:gap-y-7 max-[480px]:grid-cols-1">
          <div
            aria-hidden="true"
            className="absolute top-[19px] right-[6%] left-[6%] z-0 h-px bg-border max-[860px]:hidden"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} index={i} as="div">
              <div className="relative z-[1]">
                <div className="mb-4 flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border bg-surface font-mono text-sm text-green">
                  {i + 1}
                </div>
                <h3 className="mb-1.5 text-[15.5px]">{step.title}</h3>
                <p className="text-[13.5px] text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-7 text-center text-[13.5px] text-subtle" as="p">
          <a
            href={README_SETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green underline underline-offset-[3px]"
          >
            Ver o passo a passo completo (com os comandos) no README →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

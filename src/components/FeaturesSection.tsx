import { Reveal } from "@/components/Reveal";
import {
  ForkIcon,
  GearIcon,
  InfraIcon,
  OwnershipIcon,
} from "@/components/icons";

const features = [
  {
    icon: <OwnershipIcon />,
    title: "Você é dono",
    description:
      "Markdown versionado, visível, editável fora do Claude — não é caixa-preta de ninguém.",
  },
  {
    icon: <InfraIcon />,
    title: "Zero infra nova",
    description:
      "Sem MCP server, sem vector DB. Só uma Skill nativa do Claude Code lendo git.",
  },
  {
    icon: <GearIcon />,
    title: "Guarda como você trabalha, não só o quê",
    description:
      "Convenções, regras, forma de responder — não só fatos soltos sobre sua vida.",
  },
  {
    icon: <ForkIcon />,
    title: "Fork que recebe updates",
    description: (
      <>
        Puxa melhorias do template (
        <code className="mono">git fetch upstream</code>) sem perder seu
        conteúdo.
      </>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section
      id="beneficios"
      className="border-t border-border py-22 max-[860px]:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="mb-13 max-w-[640px]" as="div">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[12.5px] text-subtle">
            por que não é só mais um app de notas
          </span>
          <h2 className="text-4xl leading-[1.15] max-[860px]:text-[28px]">
            Quatro decisões, um vault.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          {features.map((feature, i) => (
            <Reveal key={feature.title} index={i} as="div">
              <div className="h-full rounded-[var(--radius)] border border-border bg-surface p-6.5 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-[3px] hover:border-green">
                <div className="feature-icon mb-4 flex h-9.5 w-9.5 items-center justify-center rounded-[9px] text-green">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg">{feature.title}</h3>
                <p className="text-[15px] text-muted">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

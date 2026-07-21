import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import {
  ForkIcon,
  GearIcon,
  InfraIcon,
  OwnershipIcon,
} from "@/components/icons";

const featureKeys = [
  { icon: <OwnershipIcon />, key: "ownership" },
  { icon: <InfraIcon />, key: "infra" },
  { icon: <GearIcon />, key: "howYouWork" },
  { icon: <ForkIcon />, key: "fork" },
] as const;

export function FeaturesSection() {
  const t = useTranslations("FeaturesSection");

  return (
    <section
      id="beneficios"
      className="border-t border-border py-22 max-[860px]:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="mb-13 max-w-[640px]" as="div">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[12.5px] text-subtle">
            {t("eyebrow")}
          </span>
          <h2 className="text-4xl leading-[1.15] max-[860px]:text-[28px]">
            {t("heading")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          {featureKeys.map((feature, i) => (
            <Reveal key={feature.key} index={i} as="div">
              <div className="h-full rounded-[var(--radius)] border border-border bg-surface p-6.5 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-[3px] hover:border-green">
                <div className="feature-icon mb-4 flex h-9.5 w-9.5 items-center justify-center rounded-[9px] text-green">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg">{t(`${feature.key}Title`)}</h3>
                <p className="text-[15px] text-muted">
                  {feature.key === "fork"
                    ? t.rich(`${feature.key}Description`, {
                        code: (chunks) => <code className="mono">{chunks}</code>,
                      })
                    : t(`${feature.key}Description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

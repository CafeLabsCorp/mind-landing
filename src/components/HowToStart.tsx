import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { README_SETUP_URL } from "@/lib/site";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;

export function HowToStart() {
  const t = useTranslations("HowToStart");

  return (
    <section
      id="comecar"
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
          <p className="mt-3.5 text-[17px] text-muted">
            {t.rich("description", {
              code: (chunks) => <code className="mono">{chunks}</code>,
            })}
          </p>
        </Reveal>
        <div className="relative grid grid-cols-4 gap-4.5 max-[860px]:grid-cols-2 max-[860px]:gap-y-7 max-[480px]:grid-cols-1">
          <div
            aria-hidden="true"
            className="absolute top-[19px] right-[6%] left-[6%] z-0 h-px bg-border max-[860px]:hidden"
          />
          {stepKeys.map((key, i) => (
            <Reveal key={key} index={i} as="div">
              <div className="relative z-[1]">
                <div className="mb-4 flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border bg-surface font-mono text-sm text-green">
                  {i + 1}
                </div>
                <h3 className="mb-1.5 text-[15.5px]">{t(`${key}Title`)}</h3>
                <p className="text-[13.5px] text-muted">
                  {t.rich(`${key}Description`, {
                    code: (chunks) => <code className="mono">{chunks}</code>,
                  })}
                </p>
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
            {t("readmeLink")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

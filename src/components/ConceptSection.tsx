import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function ConceptSection() {
  const t = useTranslations("ConceptSection");

  return (
    <section
      id="conceito"
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
            {t("description")}
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          <Reveal
            className="rounded-[var(--radius)] border border-border bg-surface p-6.5 opacity-75"
            as="div"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-[5px] font-mono text-[12.5px] text-subtle">
              {t("withoutTag")}
            </span>
            <h3 className="mb-2.5 text-[19px]">
              {t("withoutTitle")}
            </h3>
            <div className="mt-3.5 rounded-[10px] border border-dashed border-border bg-code-bg p-3.5 font-mono text-[13px] text-subtle">
              {t("withoutQuote")}
              <br />
              <span style={{ opacity: 0.5 }}>{t("withoutQuoteCaption")}</span>
            </div>
            <ul className="mt-4 list-disc pl-[18px] text-[15px] text-muted">
              <li className="mb-2">{t("withoutBullet1")}</li>
              <li className="mb-2">{t("withoutBullet2")}</li>
            </ul>
            <p className="mt-2 text-xs text-subtle italic">
              {t("withoutFooter")}
            </p>
          </Reveal>
          <Reveal
            className="compare-card-accent rounded-[var(--radius)] border bg-surface p-6.5"
            as="div"
          >
            <span className="tag-accent mb-4 inline-flex items-center gap-2 rounded-full px-2.5 py-[5px] font-mono text-[12.5px] text-green">
              {t("withTag")}
            </span>
            <h3 className="mb-2.5 text-[19px]">{t("withTitle")}</h3>
            <div className="md-note mt-3.5 rounded-[10px] bg-code-bg p-3.5 font-mono text-[13px] text-muted">
              projetos/hobby.md
              <br />
              <span className="text-subtle">tags: [mobile, backend]</span>
              <br />
              {t("withNoteHeading")}
              <br />
              {t("withNoteBody")}
            </div>
            <ul className="mt-4 list-disc pl-[18px] text-[15px] text-muted">
              <li className="mb-2">{t("withBullet1")}</li>
              <li className="mb-2">{t("withBullet2")}</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

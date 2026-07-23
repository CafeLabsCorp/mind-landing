"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

function buildSetupLines(originPlaceholder: string) {
  return [
    "git clone https://github.com/CafeLabsCorp/mind-template.git mind",
    "cd mind",
    "git remote rename origin upstream",
    `git remote add origin "${originPlaceholder}"`,
    "git push -u origin main",
    "./scripts/setup-symlinks.sh",
    "claude",
  ];
}

const SKILL_CHIPS = [
  "conhecimentos/git.md",
  "vida-pessoal.md",
  "projetos/hobby.md",
  "tarefas/empresa.md",
];

type TypedLine = { prompt: string; text: string; done: boolean };

/**
 * Terminal typewriter + file tree reveal + skill-demo chip cascade, wired
 * to a single "played once, when scrolled into view" trigger — matches the
 * mockup's IntersectionObserver-driven sequence (typing, then tree lines,
 * then the active skill chip) 1:1, including relative timings.
 */
export function ProofSection() {
  const t = useTranslations("ProofSection");
  const tSetup = useTranslations("SetupCommands");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inView = useInView(terminalRef, { once: true, amount: 0.3 });
  const [lines, setLines] = useState<TypedLine[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [treeVisibleCount, setTreeVisibleCount] = useState(0);
  const [skillPhaseActive, setSkillPhaseActive] = useState(false);
  const started = useRef(false);

  // Mirrors the real setup sequence from the template's README ("Setup numa
  // máquina nova"): the fork-manual flow with two remotes, not a plain clone.
  // Only the leading "# " comment is translated; the commands themselves
  // never change across locales.
  const terminalLines = useMemo<Array<[prompt: string, command: string]>>(
    () => [
      ["# ", t("cloneComment")],
      ...buildSetupLines(tSetup("originPlaceholder")).map(
        (line) => ["$ ", line] as [string, string],
      ),
    ],
    [t, tSetup],
  );

  const treeLines = useMemo<Array<{ content: React.ReactNode }>>(
    () => [
      { content: "mind/" },
      {
        content: (
          <>
            ├── <span className="hl">MIND.md</span>{" "}
            <span className="dim">{t("treeRootIndex")}</span>
          </>
        ),
      },
      { content: "├── docs/" },
      {
        content: <>│&nbsp;&nbsp; └── ARQUITETURA.md</>,
      },
      {
        content: (
          <>
            ├── claude-user/ <span className="dim">{t("treeClaudeUser")}</span>
          </>
        ),
      },
      {
        content: (
          <>
            ├── .claude/ <span className="dim">{t("treeClaudeSettings")}</span>
          </>
        ),
      },
      { content: "└── scripts/" },
      {
        content: <>&nbsp;&nbsp;&nbsp;&nbsp; └── setup-symlinks.sh</>,
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    const intervals: Array<ReturnType<typeof setInterval>> = [];

    let lineIndex = 0;
    function typeNextLine() {
      if (lineIndex >= terminalLines.length) {
        setShowCursor(true);
        return;
      }
      const [prompt, full] = terminalLines[lineIndex];
      setLines((prev) => [...prev, { prompt, text: "", done: false }]);
      let charIndex = 0;
      const iv = setInterval(() => {
        charIndex += 1;
        const currentLineIndex = lineIndex;
        setLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = {
            prompt,
            text: full.slice(0, charIndex),
            done: charIndex >= full.length,
          };
          return next;
        });
        if (charIndex >= full.length) {
          clearInterval(iv);
          lineIndex += 1;
          timeouts.push(setTimeout(typeNextLine, 130));
        }
      }, 10);
      intervals.push(iv);
    }
    typeNextLine();

    // Tree + skill-demo cascade timings are unchanged from the mockup even
    // though the terminal now has more lines: the faster per-char/per-line
    // pace above keeps total typing time roughly where it was.
    timeouts.push(
      setTimeout(() => {
        treeLines.forEach((_, i) => {
          timeouts.push(
            setTimeout(() => setTreeVisibleCount((c) => Math.max(c, i + 1)), i * 90)
          );
        });
      }, 1700)
    );

    timeouts.push(setTimeout(() => setSkillPhaseActive(true), 2900));

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [inView, terminalLines, treeLines]);

  return (
    <section
      id="prova"
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
        <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-6 max-[860px]:grid-cols-1">
          <Reveal as="div">
            <div className="terminal" ref={terminalRef}>
              <div className="term-bar">
                <span className="term-dot" style={{ background: "#ff5f57" }} />
                <span className="term-dot" style={{ background: "#febc2e" }} />
                <span className="term-dot" style={{ background: "#28c840" }} />
                <span className="term-path">~/mind</span>
              </div>
              <div className="term-body">
                {lines.map((line, i) => {
                  const isComment = line.prompt === "# ";
                  return (
                    <div
                      className={`term-line${isComment ? " is-comment" : ""}`}
                      key={i}
                    >
                      <span className={isComment ? "comment" : "prompt"}>
                        {line.prompt}
                      </span>
                      <span>{line.text}</span>
                    </div>
                  );
                })}
                {showCursor && <span className="cursor" />}
              </div>
            </div>
          </Reveal>
          <Reveal as="div">
            <div className="tree">
              {treeLines.map((line, i) => (
                <div
                  key={i}
                  className={`tree-line${i < treeVisibleCount ? " in" : ""}`}
                >
                  {line.content}
                </div>
              ))}

              <div className="skill-demo">
                <div className="cap">{t("skillDemoCaption")}</div>
                <div className="skill-row">
                  {SKILL_CHIPS.map((chip, i) => (
                    <span
                      key={chip}
                      className={`file-chip${i === 2 ? " active" : ""}`}
                    >
                      {chip}
                    </span>
                  ))}
                  <span className="skill-arrow">→</span>
                  <span
                    className={`file-chip${skillPhaseActive ? " active" : ""}`}
                  >
                    {t("skillDemoResult")}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

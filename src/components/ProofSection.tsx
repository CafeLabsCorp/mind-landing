"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";

// Mirrors the real setup sequence from the template's README ("Setup numa
// máquina nova"): the fork-manual flow with two remotes, not a plain clone.
const TERMINAL_LINES: Array<[prompt: string, command: string]> = [
  ["# ", "crie um repo vazio e privado antes de clonar"],
  ["$ ", "git clone https://github.com/CafeLabsDev/mind-template.git mind"],
  ["$ ", "cd mind"],
  ["$ ", "git remote rename origin upstream"],
  ["$ ", 'git remote add origin "<url-do-seu-repo-vazio>"'],
  ["$ ", "git push -u origin main"],
  ["$ ", "./scripts/setup-symlinks.sh"],
  ["$ ", "claude"],
];

const TREE_LINES: Array<{ content: React.ReactNode }> = [
  { content: "mind/" },
  {
    content: (
      <>
        ├── <span className="hl">MIND.md</span>{" "}
        <span className="dim">— índice raiz</span>
      </>
    ),
  },
  { content: "├── docs/" },
  {
    content: (
      <>
        │&nbsp;&nbsp; └── ARQUITETURA.md
      </>
    ),
  },
  {
    content: (
      <>
        ├── claude-user/ <span className="dim">— Skill + CLAUDE.md</span>
      </>
    ),
  },
  {
    content: (
      <>
        ├── .claude/ <span className="dim">— settings de projeto</span>
      </>
    ),
  },
  { content: "└── scripts/" },
  {
    content: <>&nbsp;&nbsp;&nbsp;&nbsp; └── setup-symlinks.sh</>,
  },
];

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
  const terminalRef = useRef<HTMLDivElement>(null);
  const inView = useInView(terminalRef, { once: true, amount: 0.3 });
  const [lines, setLines] = useState<TypedLine[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [treeVisibleCount, setTreeVisibleCount] = useState(0);
  const [skillPhaseActive, setSkillPhaseActive] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    const intervals: Array<ReturnType<typeof setInterval>> = [];

    let lineIndex = 0;
    function typeNextLine() {
      if (lineIndex >= TERMINAL_LINES.length) {
        setShowCursor(true);
        return;
      }
      const [prompt, full] = TERMINAL_LINES[lineIndex];
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
        TREE_LINES.forEach((_, i) => {
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
  }, [inView]);

  return (
    <section
      id="prova"
      className="border-t border-border py-22 max-[860px]:py-14"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="mb-13 max-w-[640px]" as="div">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[12.5px] text-subtle">
            prova, não promessa
          </span>
          <h2 className="text-4xl leading-[1.15] max-[860px]:text-[28px]">
            Não é conceito. É um repo real.
          </h2>
          <p className="mt-3.5 text-[17px] text-muted">
            O comando de setup e a árvore de pastas abaixo são exatamente o
            que está no repositório hoje.
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
              {TREE_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`tree-line${i < treeVisibleCount ? " in" : ""}`}
                >
                  {line.content}
                </div>
              ))}

              <div className="skill-demo">
                <div className="cap">
                  {"// a Skill carrega só o nó certo, nunca a árvore inteira"}
                </div>
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
                    Claude lê 1 arquivo
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

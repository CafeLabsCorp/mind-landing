"use client";

import { useEffect, useState } from "react";
import { GitHubLink } from "@/components/GitHubLink";
import { GitHubIcon } from "@/components/icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""} sticky top-0 z-50 backdrop-blur-[10px]`}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
        <a
          className="flex items-center gap-2 text-lg font-bold text-fg no-underline"
          href="#top"
        >
          <span
            className="logo-dot h-[9px] w-[9px] rounded-full bg-green"
            aria-hidden="true"
          />{" "}
          mind
        </a>
        <GitHubLink
          location="header"
          className="flex min-h-11 items-center gap-2 rounded-[10px] border border-border px-3.5 py-2 text-sm font-medium text-muted no-underline transition-colors duration-200 hover:border-subtle hover:text-fg"
        >
          <GitHubIcon />
          <span className="max-[860px]:hidden">GitHub</span>
        </GitHubLink>
      </div>
    </header>
  );
}

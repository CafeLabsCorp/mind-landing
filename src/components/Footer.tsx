import { GitHubLink } from "@/components/GitHubLink";
import { GITHUB_LICENSE_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-9">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3.5 px-6">
        <a
          className="flex items-center gap-2 text-[15px] font-bold text-fg no-underline"
          href="#top"
        >
          <span
            className="logo-dot h-[9px] w-[9px] rounded-full bg-green"
            aria-hidden="true"
          />{" "}
          mind
        </a>
        <div className="flex gap-5 text-[13.5px] text-subtle">
          <GitHubLink
            location="footer"
            className="no-underline text-subtle transition-colors hover:text-fg"
          >
            Repositório
          </GitHubLink>
          <a
            href={GITHUB_LICENSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-subtle transition-colors hover:text-fg"
          >
            MIT License
          </a>
          <a
            href="https://cafelabs.net"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-subtle transition-colors hover:text-fg"
          >
            Café Labs
          </a>
        </div>
      </div>
    </footer>
  );
}

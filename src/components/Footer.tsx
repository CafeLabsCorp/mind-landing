import { useTranslations } from "next-intl";
import { GitHubLink } from "@/components/GitHubLink";
import { MindLogo } from "@/components/MindLogo";
import { GITHUB_LICENSE_URL } from "@/lib/site";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border py-9">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3.5 px-6">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
          <a className="flex items-center text-fg no-underline" href="#top">
            <MindLogo className="h-5 w-auto" />
          </a>
          <span className="font-mono text-[12.5px] text-subtle">
            {t.rich("nameMeaning", {
              i: (chunks) => <span className="text-green">{chunks}</span>,
            })}
          </span>
        </div>
        <div className="flex gap-5 text-[13.5px] text-subtle">
          <GitHubLink
            location="footer"
            className="no-underline text-subtle transition-colors hover:text-fg"
          >
            {t("repository")}
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

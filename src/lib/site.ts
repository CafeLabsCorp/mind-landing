export const GITHUB_REPO_URL = "https://github.com/CafeLabsCorp/mind-template";
export const GITHUB_LICENSE_URL = `${GITHUB_REPO_URL}/blob/main/LICENSE`;
// README anchor for the full setup walkthrough. Confirmed against the real
// heading "## Setup numa máquina nova" in mind-template/README.md — GitHub's
// slug keeps the unicode letter, so the "á" is percent-encoded in the URL.
export const README_SETUP_URL = `${GITHUB_REPO_URL}#setup-numa-m%C3%A1quina-nova`;

// Full setup sequence (fork-manual flow, two remotes) — copied verbatim by
// both "Copiar comandos de setup" buttons and shown in the no-clipboard
// fallback. The placeholder is wrapped in double quotes on purpose: a
// literal paste-and-run in bash never triggers shell redirection on the
// "<...>", it just makes git fail with an obviously-invalid-URL message
// until the user swaps in their own repo URL. The two "# " comments and the
// placeholder text come from translations (see useSetupCommands) so the
// copied block reads naturally in each locale; the git/shell commands
// themselves never change.
export function buildSetupCommands(
  step1Comment: string,
  step2Comment: string,
  originPlaceholder: string,
) {
  return (
    `# ${step1Comment}\n` +
    "git clone https://github.com/CafeLabsCorp/mind-template.git mind\n" +
    "cd mind\n" +
    "git remote rename origin upstream\n" +
    `git remote add origin "${originPlaceholder}"\n` +
    "git push -u origin main\n" +
    "\n" +
    `# ${step2Comment}\n` +
    "./scripts/setup-symlinks.sh\n" +
    "claude"
  );
}

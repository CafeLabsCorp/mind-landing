**[Read in English](ARQUITETURA.md)**

# Arquitetura — mind-landing

Site estático de uma página só (Next.js App Router), sem backend, sem rota de
conteúdo além da própria página — duplicada por locale pelo next-intl (`/pt`,
`/en`) — e sem estado que sobreviva a um reload. A complexidade real do
projeto está toda em animação/temporização de UI, roteamento de i18n e
acessibilidade dos poucos elementos interativos (grafo de nós, modal, CTAs de
cópia) — não em dados ou infra.

## 1. Composição da página

`src/app/[locale]/page.tsx` empilha as seções em ordem fixa, uma por componente:

```
SiteHeader → Hero → ConceptSection → FeaturesSection → ProofSection
→ HowToStart → FinalCta → Footer
```

Não há roteamento client-side e só existe uma página de verdade — mas ela vive
dentro do segmento dinâmico `[locale]` (`src/app/[locale]/`), então o
next-intl a serve duas vezes, em `/pt` e `/en` (ver §6).
`src/app/[locale]/layout.tsx` define fontes, resolve a metadata por locale
(`generateMetadata`) e monta `NextIntlClientProvider` envolvendo
`ToastProvider` (contexto global) e `<Analytics />` (`@vercel/analytics`) uma
vez, no topo. `src/app/icon.svg` (favicon) fica de propósito fora de
`[locale]` — o build da Vercel quebra se ele voltar pra dentro (commit
`6342c53`).

Cada seção é auto-contida (título + copy + o que for específico dela); a única peça
verdadeiramente reutilizada entre seções é `Reveal` (fade-up on-scroll) e `GitHubLink`
(link instrumentado pro repositório).

## 2. Fluxo de estado — onde ele existe e por quê

O projeto não tem estado de aplicação (nada de dados de servidor, nada persistido).
O estado que existe é local a cada peça interativa:

- **`ToastProvider` (`src/components/Toast.tsx`)** — único contexto React do app.
  Expõe `useToast().showToast(message)`; renderiza uma única mensagem por vez (some
  sozinha após `TOAST_DURATION` = 2200ms). Usado só pelo fluxo de copiar comando.
- **`useCloneCopy` (`src/lib/useCloneCopy.ts`)** — hook por trás dos dois botões
  "Copiar comandos de setup" (Hero e FinalCta, um hook por instância, parametrizado
  por `location: "hero" | "final_cta"`). Sempre dispara o evento de analytics no
  clique (a tentativa de copiar é o sinal de conversão, não o sucesso do
  `navigator.clipboard`); se a Clipboard API falhar, ativa `showFallback` — a Hero
  então revela um `<pre>` com o texto selecionável em vez de falhar silenciosamente.
  O texto em si vem de `useSetupCommands` (`src/lib/useSetupCommands.ts`), que
  combina os comandos git/shell fixos (`buildSetupCommands`, `src/lib/site.ts`) com
  os dois comentários `# ` traduzidos (namespace `SetupCommands` em
  `messages/{locale}.json`), pra o bloco copiado ler naturalmente no locale em que a
  página está.
- **`InteractiveGraph` (`src/components/InteractiveGraph.tsx`)** — orquestra
  `NodeGraph` (SVG do grafo) e `NodeModal` (dialog de exemplo). Guarda `activeNode` e
  qual elemento disparou a abertura (`lastFocused`), pra devolver o foco a ele quando
  o modal fecha — via teclado (Escape), clique no backdrop ou botão de fechar.
- **`ProofSection` (`src/components/ProofSection.tsx`)** — máquina de estado de
  temporização mais complexa do projeto; ver §3.
- **`SiteHeader`** — só um booleano `scrolled` (via listener de `scroll`) pra alternar
  a classe `.scrolled` (borda inferior + leve opacidade extra no blur).

## 3. `ProofSection`: terminal typewriter + reveal de árvore + cascata de chips

Dispara uma única vez, quando o terminal entra em viewport (`useInView(..., { once:
true, amount: 0.3 })` do Framer Motion) — `started.current` garante que não reinicia
em scrolls subsequentes.

Sequência, em ordem:

1. **Typewriter**: digita `TERMINAL_LINES` (sequência real do setup do
   `mind-template`, fork manual com dois remotes) caractere a caractere, 10ms por
   caractere, 130ms de pausa entre linhas. Ao terminar a última linha, liga o cursor
   piscando (`showCursor`).
2. Aos 1700ms depois do início: revela as linhas de `TREE_LINES` (árvore de pastas)
   em cascata, 90ms entre cada uma.
3. Aos 2900ms depois do início: ativa a fase dos chips de Skill (`skillPhaseActive`),
   dando destaque ao chip final "Claude lê 1 arquivo".

Todos os `setTimeout`/`setInterval` são coletados em arrays e limpos no cleanup do
`useEffect` — evita disparos após unmount.

**Bug histórico corrigido (commit `2b68198`):** o índice da linha sendo digitada era
lido *dentro* do updater funcional de `setLines`, mas `lineIndex` era incrementado de
forma síncrona no mesmo callback do `setInterval`. Como o React só executa o updater
depois que o callback termina, no último caractere de cada linha o updater already via
o índice incrementado — gravando o texto completo na posição da *próxima* linha em
vez da atual, cortando o último caractere da linha certa e duplicando a errada. Fix:
capturar `currentLineIndex` antes do `setLines`, e usá-lo dentro do updater. Relevante
pra quem for mexer nessa função de novo: qualquer refactor que leia uma variável
mutável de fora dentro de um updater funcional do React tem o mesmo risco.

## 4. Grafo interativo (`NodeGraph` + `NodeModal`)

O SVG do grafo é puramente decorativo (`aria-hidden`, `focusable="false"`) — a
interação real acontece em botões HTML transparentes empilhados nas mesmas
coordenadas (`.node-hit-layer` / `.node-hit`, `44×44px`, mínimo recomendado de área de
toque). Isso dá semântica nativa de botão (ordem de foco, ativação por Enter/Espaço,
nome pro leitor de tela) de graça, sem duplicar lógica de acessibilidade em cima de
elementos SVG. **Não fundir as duas camadas** — é proposital, replica o mockup 1:1.

`NodeModal` implementa um focus trap manual (Tab/Shift+Tab preso entre o primeiro e
o último elemento focável do diálogo) e fecha com Escape ou clique no backdrop;
respeita `prefers-reduced-motion` via `useReducedMotion()` do Framer Motion,
desligando as animações de entrada/saída em vez de só acelerá-las.

Dados do grafo (`src/lib/graph-data.ts`) usam nomes de nós genéricos (Mind, Projetos,
Tarefas, Estudos, Pessoal, Conhecimentos, Hobby, Empresa) — decisão de produto: nunca
expor conteúdo ou nomes reais do vault pessoal do Felipe na landing pública.

## 5. Decisões técnicas não-óbvias

- **`color-mix()` em CSS puro, não a sintaxe de alpha do Tailwind**
  (`globals.css`, comentário no topo do arquivo): o alpha modifier do Tailwind mistura
  em `oklab`, o que desloca ligeiramente as cores em relação ao `color-mix(in srgb,
  ...)` que o mockup aprovado usa como fonte de verdade. Por isso alguns tints (badge
  do eyebrow, sombra do botão primário, bordas/tags accent, glow do CTA final) ficam
  como CSS puro em vez de virarem utilities Tailwind — não é código morto nem
  esquecido, é intencional.
- **`prefers-reduced-motion` e o grafo SVG**: o reset genérico
  (`* { animation: none !important }`) por si só deixava arestas e nós do grafo
  invisíveis, porque zerar só a `opacity` não reseta o `stroke-dashoffset` das arestas
  — ele fica travado no valor inicial (não desenhado) da animação `draw` desligada.
  A regra de `prefers-reduced-motion` em `globals.css` reseta as duas propriedades
  juntas por causa disso (comentário inline documenta o porquê).
- **`HEADER_HEIGHT_PX = 77` em `Hero.tsx`**: valor medido (não computado via CSS/JS)
  da altura renderizada do `SiteHeader`, usado só pra a Hero preencher exatamente
  `100dvh` menos o header. Se o header mudar de padding/altura, esse número precisa
  ser remedido manualmente — não há mecanismo automático de sincronia.
- **Indicador de scroll em estilo terminal, não seta genérica** (commit `c49858e`):
  primeira versão era uma seta com bounce, praticamente idêntica ao indicador da
  landing irmã `dindin-landing` feito no mesmo ciclo; foi refeita reaproveitando a
  linguagem visual "CLI" que o site já usa em `ProofSection` — prompt `$` verde +
  cursor piscando (a mesma classe `.cursor` do terminal), em vez de inventar uma
  animação nova. Faz parte do padrão estrutural de landing da Café Labs (hero 100dvh
  + indicador de scroll + acesso rápido ao produto) — ver o nó de conhecimento
  `cafelabs/padroes-landing.md` no vault `mind` do Felipe.
- **Grafo nunca vira `display: none` no mobile**: em telas `<=860px` ele é demovido
  pra depois dos CTAs (não escondido) — conjunto de nós reduzido (`.leaf-extra`
  ocultos), mas continua clicável com alvos `>=44px`.
- **Conteúdo é fonte-de-verdade do mockup aprovado, não do código**: qualquer mudança
  de copy, paleta ou timing de animação deveria primeiro reconciliar com o mockup
  HTML original (não versionado neste repo — `TODO: confirmar` onde ele vive hoje)
  antes de alterar o componente livremente.
- **Bug conhecido — três referências fixas ainda apontam pra org errada no
  GitHub**: `https://github.com/CafeLabsDev/mind-template` aparece em
  `src/lib/site.ts` (`GITHUB_REPO_URL`, mais a linha de git-clone dentro de
  `buildSetupCommands`) e de novo, independentemente, em
  `src/components/ProofSection.tsx` (`buildSetupLines`, o terminal falso
  digitado no §3). Os repositórios reais hoje vivem sob `CafeLabsCorp`
  (`git remote -v` deste repo resolve pra `CafeLabsCorp/mind-landing`; ver
  `mind/projetos/repos.md`). Efeito líquido no site ao vivo: os links do
  GitHub no header/hero/footer (`GitHubLink`), a linha de `git clone` copiada
  pelos dois botões "Copiar comandos de setup" e a linha de `git clone`
  digitada na demo do terminal do `ProofSection` apontam todos pra uma org
  desatualizada. Isso precisa de um fix de código nos dois arquivos (e
  reconferir se a âncora de `README_SETUP_URL` continua batendo depois da
  troca), não de doc — registrado aqui pra quem for mexer não precisar
  redescobrir.

## 6. Internacionalização (next-intl)

Dois locales, `pt` (padrão) e `en`, sempre prefixados na URL (`/pt`, `/en` —
`localePrefix: "always"` é o padrão do next-intl, não sobrescrito em
`src/i18n/routing.ts`). Visitar `/` dispara `src/proxy.ts` (o middleware do
next-intl) pra redirecionar pro locale que melhor combina — cookie primeiro,
depois `Accept-Language`, caindo pra `pt` por padrão.

- **`src/i18n/routing.ts`** — declara `locales: ["pt", "en"]` e
  `defaultLocale: "pt"`. Fonte única de verdade pra todas as outras peças de i18n.
- **`src/i18n/request.ts`** — resolve o locale ativo por request e carrega o
  `messages/{locale}.json` correspondente (usado no server, ex.: em
  `generateMetadata`).
- **`src/i18n/navigation.ts`** — reexporta `Link`, `useRouter`, `usePathname`,
  `getPathname` envolvidos por `createNavigation(routing)`, pra navegação
  interna continuar respeitando o locale sem prefixar caminho manualmente.
  Usado pelo `LanguageSwitcher` (`src/components/ui/language-switcher.tsx`,
  renderizado no `SiteHeader`) pra alternar `pt` ⇄ `en` mantendo o caminho atual.
- **`messages/en.json` / `messages/pt.json`** — um namespace por seção (`Hero`,
  `ConceptSection`, `ProofSection`, `CloneCopy`, `SetupCommands`,
  `LanguageSwitcher`, etc.), mantidos sincronizados (mesmo conjunto de chaves
  nos dois arquivos, conferido nesta auditoria).
- **`src/app/[locale]/layout.tsx`** — valida o parâmetro `locale` recebido
  contra `routing.locales` (`notFound()` caso contrário) e envolve a árvore em
  `NextIntlClientProvider` pra componentes client poderem chamar
  `useTranslations`.

Isso não tem relação com a divisão EN/PT de `README.md`/`docs/*.md` deste
repositório — aquilo é documentação para humanos/ferramentas lendo o repo; o
next-intl é o seletor de idioma da própria UI do site ao vivo, para quem usa
o produto.

## 7. Instrumentação

Dois eventos de conversão (`@vercel/analytics`, via `src/lib/analytics.ts`):
`copy_clone_command` (clique nos botões de copiar setup) e `click_github` (clique em
qualquer link pro repositório). Ambos carregam `location` para diferenciar Hero,
header, seção final e footer entre si. Metas de referência (não aplicadas no código,
só como contexto de produto): clique-GitHub acima de 3% dos pageviews; taxa de cópia
pelo menos metade da taxa de clique.

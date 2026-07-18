type MindLogoProps = { className?: string };

// Wordmark desenhado pelo Felipe (MIND.md em blocos geométricos, "i" com o
// pontinho + o novo acento de círculo dentro do "D"). Atualizado em
// 2026-07-17 (2ª versão do Felipe). viewBox reaproveita as coordenadas
// originais do SVG dele.
export function MindLogo({ className }: MindLogoProps) {
  return (
    <svg
      viewBox="0 0 2770 1724"
      className={className}
      role="img"
      aria-label="mind"
    >
      <path fill="var(--fg)" d="M250 350V1724H0V350H250Z" />
      <path fill="var(--fg)" d="M1321 350V1724H1071V350H1321Z" />
      <path fill="var(--fg)" d="M2082 350V1724H1832V350H2082Z" />
      <path fill="var(--green)" d="M1071 0H1321V250H1071V0Z" />
      <path
        fill="var(--green)"
        d="M971 1244.24L773 1722.25V1724H548V1722.79L350 1244.78V591.494L660.389 1340.84L971 590.957V1244.24Z"
      />
      <path
        fill="var(--green)"
        d="M1732 1342.31V1724H1619V1722.79L1421 1244.78V591.494L1732 1342.31Z"
      />
      <path
        fill="var(--green)"
        d="M2182 357.181C2514.18 405.464 2769.32 691.436 2769.32 1037C2769.32 1382.56 2514.18 1668.53 2182 1716.82V1462.58C2375.32 1417.47 2519.32 1244.05 2519.32 1037C2519.32 829.946 2375.32 656.526 2182 611.423V357.181Z"
      />
      <path
        fill="var(--green)"
        opacity="0.2"
        d="M2081.5 849C2185.05 849 2269 932.947 2269 1036.5C2269 1140.05 2185.05 1224 2081.5 1224C1977.95 1224 1894 1140.05 1894 1036.5C1894 932.947 1977.95 849 2081.5 849Z"
      />
      <path
        fill="var(--green)"
        d="M2082 930C2141.09 930 2189 977.906 2189 1037C2189 1096.09 2141.09 1144 2082 1144C2022.91 1144 1975 1096.09 1975 1037C1975 977.906 2022.91 930 2082 930Z"
      />
    </svg>
  );
}

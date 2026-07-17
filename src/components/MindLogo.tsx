type MindLogoProps = { className?: string };

// Wordmark desenhado pelo Felipe (MIND.md em blocos geométricos, "i" com o
// pontinho). viewBox reaproveita as coordenadas originais do SVG dele.
export function MindLogo({ className }: MindLogoProps) {
  return (
    <svg
      viewBox="0 0 2553 1724"
      className={className}
      role="img"
      aria-label="mind"
    >
      <path
        fill="var(--fg)"
        d="M250 350.001V1724H0V350.001H250Z"
      />
      <path
        fill="var(--fg)"
        d="M1321 350.001V1724H1071V350.001H1321Z"
      />
      <path
        fill="var(--fg)"
        d="M1866 1724H1616L1666 1724V350.001H1866V1724Z"
      />
      <path fill="var(--green)" d="M1071 0H1321V250H1071V0Z" />
      <path
        fill="var(--green)"
        d="M1966 357.3C2297.78 405.933 2552.5 691.719 2552.5 1037C2552.5 1382.28 2297.78 1668.07 1966 1716.7V1462.38C2158.9 1416.98 2302.5 1243.76 2302.5 1037C2302.5 830.237 2158.9 657.015 1966 611.614V357.3Z"
      />
      <path
        fill="var(--green)"
        d="M971 1244.24L775.971 1715.08L775.775 1715H545.002L544.807 1715.08L350 1244.78V591.493L660.389 1340.84L971 590.956V1244.24Z"
      />
      <path
        fill="var(--green)"
        d="M1566 941.554V1594.84L1421 1244.78V591.493L1566 941.554Z"
      />
    </svg>
  );
}

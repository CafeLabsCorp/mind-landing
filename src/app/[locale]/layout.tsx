import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ThemeProvider } from "next-themes";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastProvider } from "@/components/Toast";
import { routing } from "@/i18n/routing";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    // suppressHydrationWarning: next-themes põe data-theme no <html> antes
    // de o React hidratar (script anti-flash), o que difere do HTML do servidor.
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <ToastProvider>{children}</ToastProvider>
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

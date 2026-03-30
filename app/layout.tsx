import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATIAA | Alliance Togolaise pour l’IA Appliquée",
  description:
    "ATIAA fédère fondateurs, experts, organisations et partenaires pour démontrer, former et déployer l’intelligence artificielle appliquée au Togo.",
  applicationName: "ATIAA",
  keywords: [
    "ATIAA",
    "Alliance Togolaise pour l’IA Appliquée",
    "IA appliquée",
    "Lomé",
    "Togo",
    "innovation",
    "écosystème IA",
  ],
  authors: [{ name: "ATIAA" }],
  metadataBase: new URL("https://atiaa-all.vercel.app"),
  openGraph: {
    title: "ATIAA | Alliance Togolaise pour l’IA Appliquée",
    description:
      "Démontrer, former, déployer l’IA appliquée au Togo. Une alliance en structuration à partir de Lomé.",
    locale: "fr_FR",
    type: "website",
    siteName: "ATIAA",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATIAA | Alliance Togolaise pour l’IA Appliquée",
    description:
      "L’alliance qui transforme l’IA en usages concrets au Togo.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

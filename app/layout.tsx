import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { StoreProvider } from "@/components/store";
import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "O Segredo Fungi — Unlock Your Mind",
  description:
    "Vestuário, cultura e cogumelos funcionais. Capacidade de ver além de onde chega o olhar. Made in Brazil, since 2023. 21+.",
  keywords: ["O Segredo Fungi", "streetwear", "cogumelos funcionais", "Brasil"],
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${heading.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain bg-ink antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

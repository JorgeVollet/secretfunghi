import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Anton } from "next/font/google";
import { StoreProvider } from "@/components/store";
import { ComingSoon } from "@/components/ComingSoon";
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
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
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
    <html lang="pt-BR" className={`${heading.variable} ${sans.variable} ${mono.variable} ${anton.variable}`}>
      <body className="grain bg-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: `
  (function() {
    var speed = 1.2;
    var BASE = 1.2;
    var MAX = 5.0;

    // Aguarda o Vanta estar pronto e conecta o mouse
    function connectMouse() {
      var effect = window.VANTA && window.VANTA.current;
      if (!effect || !effect.updateUniforms) {
        setTimeout(connectMouse, 300);
        return;
      }

      document.addEventListener('mousemove', function() {
        speed = Math.min(speed + 0.5, MAX);
        effect.options.speed = speed;
        effect.updateUniforms();
      }, { passive: true });

      setInterval(function() {
        if (speed > BASE) {
          speed = Math.max(speed - 0.15, BASE);
          effect.options.speed = speed;
          effect.updateUniforms();
        }
      }, 50);
    }

    // Inicia quando o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', connectMouse);
    } else {
      connectMouse();
    }
  })();
` }} />
        <StoreProvider>
          <ComingSoon>{children}</ComingSoon>
        </StoreProvider>
      </body>
    </html>
  );
}

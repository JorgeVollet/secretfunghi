"use client";

import { Marquee } from "@/components/ui/Marquee";

const COLS = [
  {
    h: "Navegação",
    links: [
      { l: "Sobre", h: "#sobre" },
      { l: "Manifesto", h: "#manifesto" },
      { l: "Loja", h: "#loja" },
      { l: "Linha Segredo", h: "#segredo" },
    ],
  },
  {
    h: "Áreas",
    links: [
      { l: "Secret Studios", h: "#studios" },
      { l: "Som · Spotify", h: "#som" },
      { l: "Patreon", h: "#patreon" },
      { l: "Arquivo", h: "#arquivo" },
    ],
  },
  {
    h: "Suporte",
    links: [
      { l: "Trocas e envios", h: "#" },
      { l: "Termos de uso", h: "#" },
      { l: "Privacidade", h: "#" },
      { l: "Contato", h: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <Marquee
        variant="dark"
        items={[
          "Unlock your mind",
          "Made in Brazil",
          "Since 2023",
          "Mushroom hunters",
          "Worldwide",
        ]}
      />

      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="font-heading text-2xl font-bold uppercase text-t1">
              O Segredo <span className="text-brand">Fungi</span>
            </div>
            <p className="mt-3 max-w-[230px] text-[13px] leading-relaxed text-t3">
              Unlock your mind. Vestuário, cultura e cogumelos funcionais. Made
              in Brazil, since 2023.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h5 className="font-mono text-[10px] uppercase tracking-label text-t3">
                {c.h}
              </h5>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.l}>
                    <a
                      href={l.h}
                      className="text-[13px] text-t2 transition-colors hover:text-brand"
                    >
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-7 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-t3">
            © 2026 O Segredo Fungi® · Todos os direitos reservados
          </span>
          <div className="flex items-center gap-2">
            {["Pix", "Cartão", "Boleto", "Mercado Pago"].map((p) => (
              <span
                key={p}
                className="rounded border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-t2"
              >
                {p}
              </span>
            ))}
            <span className="grid h-10 w-10 place-items-center rounded-full border border-brand font-heading text-xs font-bold text-brand">
              21+
            </span>
          </div>
        </div>
        <p className="mt-6 font-mono text-[10px] text-t3">
          Site desenvolvido por JV Web Studio.
        </p>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const STATS = [
  { v: "2023", k: "Fundação" },
  { v: "BR", k: "Made in Brazil" },
  { v: "21+", k: "Acesso" },
];

export function Sobre() {
  return (
    <section id="sobre" className="relative border-t border-zinc-200 bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* texto — primeiro no mobile */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="ds-eyebrow !text-brand">Quem somos · Sobre a marca</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 md:mt-6 ds-display text-[clamp(2rem,6vw,4rem)] !text-ink">
              Mushroom hunters,{" "}
              <span className="text-brand">based in soul.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 md:mt-6 space-y-4 text-[14px] md:text-[15px] leading-relaxed text-ink/70">
              <p>
                O Segredo Fungi nasceu em 2023, no Brasil, no encontro entre
                cultura de rua, estética Y2K e a curiosidade pelo mundo dos
                cogumelos.
              </p>
              <p>
                Mais que uma marca de vestuário, é um convite a olhar além — a
                documentar, observar e desbloquear a própria mente. Vestuário,
                som, vídeo e uma linha de cogumelos funcionais sob o mesmo
                símbolo.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-8 md:mt-10 grid grid-cols-3 gap-3 md:gap-4">
            {STATS.map((s) => (
              <RevealItem
                key={s.k}
                className="rounded-lg border border-zinc-200 bg-zinc-100 p-3 md:p-4 transition-colors duration-300 hover:border-brand/40"
              >
                <div className="font-heading text-2xl md:text-3xl font-bold text-brand">
                  {s.v}
                </div>
                <div className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-ink/50">
                  {s.k}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* imagem — segundo no mobile */}
        <Reveal y={40} className="relative order-2 lg:order-1">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-xl2 border border-zinc-200">
            <Image
              src="/img/look-couple.png"
              alt="Cultura O Segredo Fungi"
              fill
              className="object-cover transition-transform duration-700 ease-ds group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <span className="absolute bottom-4 left-4 ds-label text-brand">
              Art &amp; Shroom Department
            </span>
          </div>
          {/* selo girando — só md+ */}
          <div className="absolute -right-5 -top-5 hidden h-[110px] w-[110px] animate-spin-slow rounded-full border border-brand/30 md:block">
            <div className="grid h-full w-full place-items-center">
              <span className="font-mono text-[12px] uppercase tracking-label text-brand">
                ✦ Unlock ✦ Mind
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

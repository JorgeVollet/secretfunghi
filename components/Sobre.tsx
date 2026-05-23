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
    <section id="sobre" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* imagem */}
        <Reveal y={40} className="relative order-2 lg:order-1">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-xl2 border border-line">
            <Image
              src="/img/look-couple.jpg"
              alt="Cultura O Segredo Fungi"
              fill
              className="object-cover transition-transform duration-700 ease-ds group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <span className="absolute bottom-4 left-4 ds-label text-lime">
              Art &amp; Shroom Department
            </span>
          </div>
          {/* selo girando */}
          <div className="absolute -right-5 -top-5 hidden h-24 w-24 animate-spin-slow rounded-full border border-lime/30 md:block">
            <div className="grid h-full w-full place-items-center">
              <span className="font-mono text-[8px] uppercase tracking-label text-lime">
                ✦ Unlock ✦ Mind
              </span>
            </div>
          </div>
        </Reveal>

        {/* texto */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="ds-eyebrow">Quem somos · Sobre a marca</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 ds-display text-[clamp(2.2rem,5vw,4rem)]">
              Mushroom hunters,{" "}
              <span className="text-lime">based in soul.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-t2">
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

          <RevealGroup className="mt-10 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <RevealItem
                key={s.k}
                className="rounded-lg border border-line bg-surface/60 p-4 transition-colors duration-300 hover:border-lime/40"
              >
                <div className="font-heading text-3xl font-bold text-lime">
                  {s.v}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-t3">
                  {s.k}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

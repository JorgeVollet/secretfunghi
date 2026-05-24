"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@/components/store";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getSectionContent } from "@/content";

export function LinhaSegredo() {
  const { cogumeloAnamneseOk, openAnamnese } = useStore();
  const done = cogumeloAnamneseOk;
  const c = getSectionContent("linha-segredo");

  return (
    <section
      id="segredo"
      className="relative overflow-hidden border-t border-line bg-surface/40 py-24 md:py-32"
    >
      {/* glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand/10 blur-[120px]" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal style={{ marginTop: '-20px' }}>
            <span className="ds-eyebrow">{c.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 ds-display text-[clamp(2.2rem,5vw,4rem)]">
              {c.titleStart} <span className="text-brand">{c.titleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] leading-relaxed text-t2">
              {c.description}
            </p>
          </Reveal>

          {/* explicação da trava */}
          <Reveal delay={0.15}>
            <div className="mt-7 space-y-3">
              {c.cards.map((s) => (
                <div
                  key={s.n}
                  className="group flex gap-4 rounded-lg border border-line bg-bg/60 p-4 transition-colors duration-300 hover:border-brand/40"
                >
                  <span className="font-heading text-lg font-bold text-brand">
                    {s.n}
                  </span>
                  <div>
                    <div className="font-heading text-sm font-semibold text-t1">
                      {s.t}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-t2">
                      {s.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8">
              {done ? (
                <div className="inline-flex items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-5 py-3.5 font-mono text-[11px] uppercase tracking-label text-brand">
                  <span>✓</span> {c.doneBadge}
                </div>
              ) : (
                <MagneticButton variant="primary" onClick={openAnamnese}>
                  {c.ctaLabel}
                  <span aria-hidden>→</span>
                </MagneticButton>
              )}
            </div>
          </Reveal>
        </div>

        {/* imagem */}
        <Reveal y={40}>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-xl2 border border-line">
            <Image
              src={c.imageSrc}
              alt={c.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-ds group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="absolute right-4 top-4 rounded border border-brand/50 bg-brand/[0.15] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-brand"
            >
              {c.advisoryBadge}
            </motion.div>
            <div className="absolute bottom-5 left-5">
              <div className="font-heading text-xl font-bold uppercase text-t1">
                {c.productLine}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-t3">
                {c.productSubtitle}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

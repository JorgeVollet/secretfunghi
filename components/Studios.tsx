"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const YT =
  process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://www.youtube.com/@thesecretfungi";

const VIDEOS = [
  { t: "Secret Studios — Ep. 01", d: "12:40", img: "/img/look-street.jpg" },
  { t: "Mushroom Hunters", d: "08:15", img: "/img/look-moto.jpg" },
  { t: "Behind the Drop", d: "05:32", img: "/img/graffiti.jpg" },
];

export function Studios() {
  return (
    <section id="studios" style={{ scrollMarginTop: '-31px' }} className="border-t border-line py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="ds-eyebrow">Secret Studios · YouTube</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 md:mt-5 ds-display text-[clamp(2rem,6vw,4rem)]">
                O lado <span className="text-brand">audiovisual</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-[13px] md:text-sm text-t2 max-w-xs">
              Documentários, drops e bastidores. Tudo no canal do YouTube de O
              Segredo.
            </p>
          </Reveal>
        </div>

        {/* vídeo em destaque — 16:9 no mobile, 21:9 no desktop */}
        <Reveal delay={0.1}>
          <a
            href={YT}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 md:mt-10 block aspect-video overflow-hidden rounded-xl2 border border-line md:aspect-[21/9]"
          >
            <Image
              src="/img/look-street.jpg"
              alt="Vídeo em destaque"
              fill
              className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            {/* scanlines CCTV */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 2px,#000 3px)",
              }}
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-brand">
              <span className="h-2 w-2 animate-blink rounded-full bg-brand" />
              REC · Secret Studios
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <div className="font-heading text-base md:text-xl lg:text-3xl font-bold uppercase text-t1">
                  Documentário · O Segredo
                </div>
                <div className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-t3">
                  youtube.com/@thesecretfungi
                </div>
              </div>
              <motion.span
                whileHover={{ scale: 1.12 }}
                className="grid h-11 w-11 md:h-14 md:w-14 place-items-center rounded-full bg-brand text-ink shrink-0 ml-3"
              >
                ▶
              </motion.span>
            </div>
          </a>
        </Reveal>

        {/* grade de vídeos — scroll horizontal no mobile */}
        <div className="mt-4 md:mt-5">
          <RevealGroup className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
            {VIDEOS.map((v) => (
              <RevealItem key={v.t}>
                <a
                  href={YT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl2 border border-line bg-surface transition-colors hover:border-brand/40"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={v.img}
                      alt={v.t}
                      fill
                      className="object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-sm text-brand transition-colors group-hover:bg-brand group-hover:text-ink">
                        ▶
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3.5">
                    <span className="font-heading text-sm text-t1">{v.t}</span>
                    <span className="font-mono text-[10px] text-t3">{v.d}</span>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 md:mt-9 flex justify-center">
            <MagneticButton variant="lime-ghost" href={YT}>
              ▶ Inscrever-se no canal
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

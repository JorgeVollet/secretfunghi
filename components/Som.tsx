"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const Plasma = dynamic(() => import("@/components/ui/Plasma").then(m => m.Plasma), { ssr: false });

const SPOTIFY =
  process.env.NEXT_PUBLIC_SPOTIFY_URL ??
  "https://open.spotify.com/user/31vzbqtky667df374nyzc5tpmj3u";

/** barras animadas de equalizador */
function Equalizer() {
  return (
    <div className="flex items-end gap-1.5">
      {[0.5, 0.9, 0.3, 0.7, 1, 0.45, 0.8].map((h, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-sm bg-brand"
          animate={{ height: [`${h * 30}%`, `${h * 100}%`, `${h * 40}%`] }}
          transition={{
            duration: 0.9 + i * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ height: "40%" }}
        />
      ))}
    </div>
  );
}

export function Som() {
  return (
    <section
      id="som"
      style={{ scrollMarginTop: '72px' }}
      className="relative overflow-hidden border-t border-line bg-surface/40 py-16 md:py-24 lg:py-32"
    >
      {/* camada 1: imagem de fundo com 10% de opacidade */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/img/doseofimagination.png"
          alt=""
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* camada 2: Plasma por cima da imagem */}
      <div className="absolute inset-0 -z-10" style={{ mixBlendMode: "screen" }}>
        <Plasma
          color="#b497cf"
          speed={0.6}
          direction="forward"
          scale={2.3}
          opacity={0.3}
          mouseInteractive={true}
        />
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 md:gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* player */}
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-xl2 border border-line bg-bg p-5 md:p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, #571c1622, transparent, #571c1622)",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-label text-lime">
                  Now Playing
                </span>
                <Equalizer />
              </div>
              <div className="mt-5 md:mt-6 flex items-center gap-4">
                <div className="grid h-16 w-16 md:h-20 md:w-20 shrink-0 place-items-center rounded-lg border border-line bg-surface">
                  <span className="animate-spin-slow text-xl md:text-2xl">✦</span>
                </div>
                <div>
                  <div className="font-heading text-base md:text-lg font-bold text-t1">
                    O Segredo Fungi
                  </div>
                  <div className="font-mono text-[11px] text-t3">
                    Playlist oficial · Spotify
                  </div>
                </div>
              </div>
              {/* barra de progresso fake animada */}
              <div className="mt-5 md:mt-6 h-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full bg-brand"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] text-t3">
                <span>00:00</span>
                <span>UNLOCK YOUR MIND</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* texto */}
        <div>
          <Reveal>
            <span className="ds-eyebrow">Som · Spotify</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 md:mt-6 ds-display text-[clamp(2rem,6vw,4rem)]">
              A trilha do <span className="text-brand">segredo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 md:mt-5 text-[14px] md:text-[15px] leading-relaxed text-t2">
              Uma curadoria de sons que acompanham a estética da marca. Do
              underground ao experimental — a playlist oficial de O Segredo Fungi
              no Spotify.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 md:mt-8">
              <MagneticButton variant="primary" href={SPOTIFY}>
                Ouvir no Spotify
                <span aria-hidden>→</span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

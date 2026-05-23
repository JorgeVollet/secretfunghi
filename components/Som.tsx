"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
          className="w-1.5 rounded-sm bg-lime"
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
      className="relative overflow-hidden border-t border-line bg-surface/40 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* player */}
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-xl2 border border-line bg-bg p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, #d6ff4f22, transparent, #d6ff4f22)",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-label text-lime">
                  Now Playing
                </span>
                <Equalizer />
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg border border-line bg-surface">
                  <span className="animate-spin-slow text-2xl">✦</span>
                </div>
                <div>
                  <div className="font-heading text-lg font-bold text-t1">
                    O Segredo Fungi
                  </div>
                  <div className="font-mono text-[11px] text-t3">
                    Playlist oficial · Spotify
                  </div>
                </div>
              </div>
              {/* barra de progresso fake animada */}
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full bg-lime"
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
            <h2 className="mt-6 ds-display text-[clamp(2.2rem,5vw,4rem)]">
              A trilha do <span className="text-lime">segredo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-t2">
              A curadoria sonora da marca, pensada para acompanhar a cultura O
              Segredo Fungi. Playlists e releases direto no nosso perfil do
              Spotify.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <MagneticButton variant="primary" href={SPOTIFY}>
                ♫ Abrir no Spotify
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 break-all font-mono text-[10px] text-t3">
              {SPOTIFY}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

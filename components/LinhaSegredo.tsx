"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/components/store";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getSectionContent } from "@/content";

const LS_SHOP = "sf_shop_liberado";

export function LinhaSegredo() {
  const { cogumeloAnamneseOk, introAnamneseDone, openAnamnese } = useStore();
  const done = introAnamneseDone || cogumeloAnamneseOk;
  const c = getSectionContent("linha-segredo");

  const [shopLiberado, setShopLiberado] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /* lê persistência do botão 21+ no mount */
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_SHOP) === "true") setShopLiberado(true);
    } catch {}
  }, []);

  /* fecha popup automaticamente após 4s */
  useEffect(() => {
    if (!showPopup) return;
    const t = setTimeout(() => setShowPopup(false), 4000);
    return () => clearTimeout(t);
  }, [showPopup]);

  function handleAnamneseButton() {
    if (done) {
      try { localStorage.setItem(LS_SHOP, "true"); } catch {}
      setShopLiberado(true);
      setShowPopup(true);
    } else {
      openAnamnese();
    }
  }

  return (
    <>
      <section
        id="segredo"
        style={{ scrollMarginTop: '-29px' }}
        className="relative overflow-hidden border-t border-zinc-200 bg-white py-16 md:py-24 lg:py-32"
      >
        {/* glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand/10 blur-[120px]" />

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 md:gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="ds-eyebrow" style={{ color: '#0A0A0A' }}>{c.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 md:mt-6 ds-display text-[clamp(2rem,6vw,4rem)]" style={{ color: '#ebdfc6' }}>
                {c.titleStart} <span className="text-brand">{c.titleHighlight}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 md:mt-5 text-[14px] md:text-[15px] leading-relaxed text-ink/60">
                {c.description}
              </p>
            </Reveal>

            {/* cards da trava */}
            <Reveal delay={0.15}>
              <div className="mt-6 md:mt-7 space-y-2.5 md:space-y-3">
                {c.cards.map((s, i) =>
                  i === 0 ? (
                    <a
                      key={s.n}
                      href="#loja"
                      className="flex items-center justify-between rounded-lg bg-brand px-5 py-3.5 font-mono text-[11px] uppercase tracking-label text-[#ebdfc6] transition-opacity hover:opacity-90"
                    >
                      <span>{s.t}</span>
                      <span aria-hidden>→</span>
                    </a>
                  ) : (
                    <div
                      key={s.n}
                      className="group flex gap-3 md:gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-3.5 md:p-4 transition-colors duration-300 hover:border-brand/40"
                    >
                      <div>
                        <div className="font-heading text-sm font-semibold text-ink">
                          {s.t}
                        </div>
                        <div className="mt-0.5 text-[12px] md:text-xs leading-relaxed text-ink/60">
                          {s.d}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-7 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                {/* sempre visível */}
                <MagneticButton variant="primary" onClick={handleAnamneseButton}>
                  {c.ctaLabel}
                  <span aria-hidden>→</span>
                </MagneticButton>

                {/* aparece após popup e persiste */}
                <AnimatePresence>
                  {shopLiberado && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <MagneticButton variant="primary" href="/loja-21">
                        Linha 21+ Shop
                        <span aria-hidden>→</span>
                      </MagneticButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          {/* imagem */}
          <Reveal y={40}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl2 border border-zinc-200">
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
                <div className="font-heading text-lg md:text-xl font-bold uppercase text-ink">
                  {c.productLine}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/40">
                  {c.productSubtitle}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* popup — fixed overlay, fora da section com overflow:hidden */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="anamnese-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-5"
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-xl border border-brand/50 bg-[#0A0A0A]/95 px-8 py-10 text-center shadow-glow"
            >
              <div className="font-mono text-[11px] uppercase tracking-label text-[#ebdfc6]">
                ✓ Você já concluiu a anamnese
              </div>

              <div className="mt-4 font-heading text-xl md:text-2xl font-bold uppercase leading-tight text-brand">
                Welcome to our<br />dose of imagination
              </div>

              {/* barra de progresso de 4s */}
              <div className="mt-7 h-px w-full overflow-hidden rounded-full bg-brand/20">
                <motion.div
                  className="h-full bg-brand"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>

              <p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-[#ebdfc6]/40">
                fechando em 4s · clique para fechar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

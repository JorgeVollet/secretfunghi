"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WORDS = ["O", "SEGREDO", "FUNGI"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="topo"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* fundo com parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/img/look-moto.jpg"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-30 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-bg/80 to-bg" />
      </motion.div>

      {/* glow ambiente */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-lime/10 blur-[120px]" />

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto w-full max-w-[1280px] px-5 pt-28 md:px-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="ds-eyebrow"
        >
          O Segredo Fungi® · Worldwide · Since 2023
        </motion.span>

        <h1 className="mt-7 ds-display text-[clamp(3.4rem,13vw,11rem)]">
          {WORDS.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
              >
                {w === "FUNGI" ? <span className="text-lime">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-md text-[15px] leading-relaxed text-t2"
        >
          Vestuário, cultura e cogumelos funcionais. Capacidade de ver além de
          onde chega o olhar. Unlock your mind.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <MagneticButton variant="primary" href="#loja">
            Explorar a loja
            <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton variant="ghost" href="#manifesto">
            Ler o manifesto
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-label text-t3">
            Role
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-lime to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

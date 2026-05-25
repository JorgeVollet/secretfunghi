"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-ink py-16 md:py-24 lg:py-32"
      style={{ scrollMarginTop: '-39px' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <span className="ds-eyebrow">Manifesto</span>
        </Reveal>

        {/* frase-conceito gigante */}
        <Reveal delay={0.05}>
          <p className="mt-6 md:mt-8 ds-display text-[clamp(1.9rem,7vw,5.4rem)]">
            Capacidade de ver{" "}
            <span className="text-brand">além</span> de onde
            <br className="hidden md:block" /> chega o olhar.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-16 grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={40}>
            <div className="flex flex-col items-start gap-5">
              <div className="relative aspect-square w-full max-w-[480px] overflow-hidden">
                <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                  <Image
                    src="/img/eyesecret.png"
                    alt="Find the Secret"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-base md:text-lg leading-relaxed text-t1">
                Sua missão é documentar e observar o mundo ao seu redor como se
                nunca o tivesse visto antes.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 md:mt-5 text-[14px] md:text-[15px] leading-relaxed text-t2">
                Tome a frente dos seus passos, colecionando vivências, notando
                os padrões. Refaça toda a rota se necessário. Foque sua atenção
                em uma coisa de cada vez, com determinação e amor pelo que faz —
                e descubra a ti mesmo.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-7 md:mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-brand">
                <span className="h-px w-10 bg-brand" />
                O Segredo Fungi
                <span className="text-t1 text-[9px]">- Find The Secret</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

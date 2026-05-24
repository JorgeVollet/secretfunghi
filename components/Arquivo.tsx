"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

/** mosaico de artes da marca — span define o tamanho no grid */
const PIECES = [
  { img: "/img/art-segredo.jpg", t: "Segredo", tag: "Cartaz", span: "row-span-2" },
  { img: "/img/feeling-lost.jpg", t: "Feeling Lost?", tag: "Cartaz", span: "" },
  { img: "/img/culture-hands.jpg", t: "The Secret Alife", tag: "Foto", span: "" },
  { img: "/img/graffiti.jpg", t: "Secret Fungi", tag: "Rua", span: "" },
  { img: "/img/emblem.jpg", t: "Bar & Shield", tag: "Emblema", span: "" },
  { img: "/img/look-back.jpg", t: "Riders", tag: "Editorial", span: "row-span-2" },
  { img: "/img/wordmark.jpg", t: "Wordmark", tag: "Marca", span: "" },
  { img: "/img/look-portrait.jpg", t: "Street", tag: "Editorial", span: "" },
];

export function Arquivo() {
  return (
    <section
      id="arquivo"
      className="border-t border-line bg-bg py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="ds-eyebrow">Arquivo · Arte</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 ds-display text-[clamp(2rem,6vw,4rem)]">
                O <span className="text-brand">arquivo</span> visual
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-t2">
              Cartazes, colagens, editoriais e posts. Tudo que a marca produz,
              reunido num só lugar.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {PIECES.map((p, i) => (
              <motion.figure
                key={p.img}
                whileHover="h"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className={`group relative overflow-hidden rounded-lg border border-line ${p.span}`}
              >
                <motion.div
                  variants={{ h: { scale: 1.08 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={p.img}
                    alt={p.t}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/[0.85] via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <motion.figcaption
                  variants={{ h: { y: 0, opacity: 1 } }}
                  initial={{ y: 12, opacity: 0.85 }}
                  className="absolute bottom-3 left-3"
                >
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-brand">
                    {p.tag}
                  </span>
                  <span className="font-heading text-sm font-semibold text-t1">
                    {p.t}
                  </span>
                </motion.figcaption>
              </motion.figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

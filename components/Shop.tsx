"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product, ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

const MARQUEE_ITEMS = [
  "Unlock your mind",
  "Mushroom hunters",
  "Made in Brazil",
  "Since 2023",
  "Worldwide",
];

type Tab = "all" | ProductCategory;
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tudo" },
  { id: "vestuario", label: "Vestuario" },
  { id: "segredo", label: "Linha Segredo" },
];

export function Shop({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const list =
    tab === "all" ? products : products.filter((p) => p.category === tab);

  return (
    <section id="loja" className="bg-white">
      <Marquee items={MARQUEE_ITEMS} variant="lime" />

      <div className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <span className="ds-eyebrow !text-ink">A Loja</span>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-sm text-ink/60 uppercase">
                ENVIAMOS PARA TODO O BRASIL.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={
                    "relative rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors " +
                    (tab === t.id
                      ? "bg-brand border border-brand text-[#ebdfc6]"
                      : "border border-brand/40 text-brand/60 hover:text-brand")
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            layout
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Marquee items={MARQUEE_ITEMS} variant="dark" />
    </section>
  );
}

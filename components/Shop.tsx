"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product, ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type Tab = "all" | ProductCategory;
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tudo" },
  { id: "vestuario", label: "Vestuário" },
  { id: "segredo", label: "Linha Segredo" },
];

export function Shop({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const list =
    tab === "all" ? products : products.filter((p) => p.category === tab);

  return (
    <section id="loja" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="ds-eyebrow">A Loja</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 ds-display text-[clamp(2.2rem,5vw,4rem)]">
                Vista o <span className="text-lime">segredo</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-t2">
              Vestuário de compra livre e a linha Segredo de cogumelos
              funcionais. Envio para todo o Brasil.
            </p>
          </Reveal>
        </div>

        {/* abas */}
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  tab === t.id
                    ? "text-ink"
                    : "border border-line text-t2 hover:text-t1"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="shop-tab"
                    className="absolute inset-0 -z-10 rounded-md bg-lime"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* grade */}
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
    </section>
  );
}

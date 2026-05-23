"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { brl } from "@/lib/types";
import { useStore } from "@/components/store";

export function ProductCard({ product }: { product: Product }) {
  const { openQuickView } = useStore();
  const locked = product.requiresAnamnese;

  return (
    <motion.article
      onClick={() => openQuickView(product)}
      whileHover="hover"
      className="group relative cursor-pointer overflow-hidden rounded-xl2 border border-line bg-surface transition-colors duration-300 hover:border-lime/50"
    >
      {/* imagem */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div
          variants={{ hover: { scale: 1.07 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

        {/* selo */}
        <span
          className={`absolute left-3 top-3 rounded font-mono text-[9px] uppercase tracking-wider px-2 py-1 ${
            locked
              ? "border border-lime/50 bg-lime/[0.15] text-lime"
              : "border border-line bg-ink/70 text-t2"
          }`}
        >
          {locked ? "Requer anamnese" : "Compra livre"}
        </span>
        {product.badge && (
          <span className="absolute right-3 top-3 rounded bg-lime px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink">
            {product.badge}
          </span>
        )}

        {/* CTA que aparece no hover */}
        <motion.div
          variants={{ hover: { y: 0, opacity: 1 } }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-3 bottom-3"
        >
          <span className="block rounded-md bg-lime py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-label text-ink">
            Ver produto +
          </span>
        </motion.div>
      </div>

      {/* info */}
      <div className="p-4">
        <span className="font-mono text-[9px] uppercase tracking-wider text-t3">
          {product.line}
        </span>
        <h3 className="mt-1.5 font-heading text-base font-medium text-t1">
          {product.name}
        </h3>
        <div className="mt-2 font-mono text-sm text-lime">
          {brl(product.price)}
        </div>
      </div>
    </motion.article>
  );
}

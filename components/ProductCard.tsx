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
      className="group relative cursor-pointer"
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
        {/* selo */}
        <span
          className={`absolute left-3 top-3 rounded font-mono text-[9px] uppercase tracking-wider px-2 py-1 transition-all duration-300 ${
            locked
              ? "border border-brand/50 bg-brand/[0.15] text-brand group-hover:bg-brand group-hover:border-brand group-hover:text-[#ebdfc6]"
              : "border border-line bg-ink/70 text-t2"
          }`}
        >
          {locked ? "Requer anamnese" : "Compra livre"}
        </span>
        {product.badge && (
          <span className="absolute right-3 top-3 rounded bg-brand px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#ebdfc6]">
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
          <span className="block rounded-md bg-brand py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-label text-[#ebdfc6]">
            Ver produto +
          </span>
        </motion.div>
      </div>

      {/* info */}
      <div className="p-4">
        <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "#30261e" }}>
          {product.line}
        </span>
        <h3 className="mt-1.5 font-heading text-base font-medium" style={{ color: "#442b21" }}>
          {product.name}
        </h3>
        <div className="mt-2 font-mono text-sm text-brand">
          {brl(product.price)}
        </div>
      </div>
    </motion.article>
  );
}

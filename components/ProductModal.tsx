"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/components/store";
import { brl } from "@/lib/types";

export function ProductModal() {
  const {
    quickView: product,
    closeQuickView,
    addToCart,
    anamnese,
    openAnamnese,
  } = useStore();

  const [size, setSize] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // só reinicia ao ABRIR um produto — nunca faz setState durante a saída
    if (!product) return;
    setSize(product.sizes?.length ? undefined : "Único");
    setQty(1);
    setActive(0);
  }, [product]);

  const open = product !== null;
  const locked = product?.requiresAnamnese && anamnese !== "done";
  const needsSize = Boolean(product?.sizes?.length);
  const gallery = product?.gallery?.length ? product.gallery : product ? [product.image] : [];

  function handleAdd() {
    if (!product) return;
    if (needsSize && !size) return;
    addToCart(product, size, qty);
    closeQuickView();
  }

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          key="product-overlay"
          className="fixed inset-0 z-[60] flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={closeQuickView}
          />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-t-xl2 border border-line bg-surface md:grid-cols-2 md:rounded-xl2"
          >
            {/* fechar */}
            <button
              onClick={closeQuickView}
              aria-label="Fechar"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-md border border-line bg-ink/70 text-t1 transition-colors hover:border-lime hover:text-lime"
            >
              ✕
            </button>

            {/* galeria */}
            <div className="p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image
                  key={active}
                  src={gallery[active]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {gallery.length > 1 && (
                <div className="mt-2 flex gap-2">
                  {gallery.map((g, i) => (
                    <button
                      key={g}
                      onClick={() => setActive(i)}
                      className={`relative h-16 w-16 overflow-hidden rounded border ${
                        i === active ? "border-lime" : "border-line"
                      }`}
                    >
                      <Image src={g} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* info */}
            <div className="flex flex-col gap-3 p-5 md:p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-t3">
                {product.line}
              </span>
              <h3 className="font-heading text-2xl font-bold uppercase text-t1">
                {product.name}
              </h3>
              <div className="font-heading text-2xl text-lime">
                {brl(product.price)}
              </div>
              <p className="text-[13.5px] leading-relaxed text-t2">
                {product.description}
              </p>

              {/* tamanhos */}
              {needsSize && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-t3">
                    Tamanho
                  </span>
                  <div className="mt-2 flex gap-2">
                    {product.sizes!.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`h-10 min-w-10 rounded-md border px-3 font-mono text-xs transition-colors ${
                          size === s
                            ? "border-lime bg-lime/10 text-lime"
                            : "border-line text-t2 hover:border-t2"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* quantidade */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-t3">
                  Qtd
                </span>
                <div className="flex items-center rounded-md border border-line">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 text-t1 transition-colors hover:text-lime"
                  >
                    –
                  </button>
                  <span className="w-8 text-center font-mono text-sm text-t1">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="h-9 w-9 text-t1 transition-colors hover:text-lime"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* trava de anamnese (só linha Segredo) */}
              {locked ? (
                <div className="mt-1 rounded-lg border border-lime/40 bg-lime/[0.06] p-4">
                  <div className="font-heading text-sm font-semibold text-lime">
                    ◉ Anamnese necessária
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-t2">
                    A linha Segredo só pode ser finalizada por quem concluiu a
                    anamnese. Leva menos de 2 minutos.
                  </p>
                  <button
                    onClick={() => {
                      closeQuickView();
                      openAnamnese();
                    }}
                    className="mt-3 w-full rounded-md bg-lime py-3 font-mono text-[11px] font-bold uppercase tracking-label text-ink transition-colors hover:bg-white"
                  >
                    Concluir anamnese →
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={handleAdd}
                  whileHover={{ scale: needsSize && !size ? 1 : 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={needsSize && !size}
                  className="mt-1 w-full rounded-md bg-lime py-3.5 font-mono text-[11px] font-bold uppercase tracking-label text-ink transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {needsSize && !size
                    ? "Escolha um tamanho"
                    : "Adicionar ao carrinho"}
                </motion.button>
              )}

              <span className="font-mono text-[10px] text-t3">
                ✦ Frete calculado por CEP no checkout · 21+
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

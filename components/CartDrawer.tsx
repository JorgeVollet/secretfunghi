"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/components/store";
import { brl } from "@/lib/types";

type Stage = "cart" | "checkout" | "done";
const PAYMENTS = ["Pix — aprovação na hora", "Cartão — até 3x sem juros", "Boleto bancário"];

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    setQty,
    removeItem,
    cartTotal,
    cartCount,
    clearCart,
    anamnese,
    openAnamnese,
  } = useStore();

  const [stage, setStage] = useState<Stage>("cart");
  const [pay, setPay] = useState(0);

  useEffect(() => {
    if (cartOpen) setStage("cart");
  }, [cartOpen]);

  const shipping = cartTotal > 0 ? 24.9 : 0;
  const grand = cartTotal + shipping;
  const segredoPendente =
    cart.some((i) => i.product.requiresAnamnese) && anamnese !== "done";

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          key="cart-overlay"
          className="fixed inset-0 z-[65]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-heading text-lg font-bold uppercase text-t1">
                {stage === "cart" && `Carrinho · ${cartCount}`}
                {stage === "checkout" && "Checkout"}
                {stage === "done" && "Pedido enviado"}
              </span>
              <button
                onClick={closeCart}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-md border border-line text-t1 transition-colors hover:border-lime hover:text-lime"
              >
                ✕
              </button>
            </div>

            {/* ---------- STAGE: CART ---------- */}
            {stage === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  {cart.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <span className="text-4xl">✦</span>
                      <p className="mt-4 font-heading text-lg text-t1">
                        Seu carrinho está vazio
                      </p>
                      <p className="mt-1 text-sm text-t3">
                        Explore a loja e o segredo.
                      </p>
                      <button
                        onClick={closeCart}
                        className="mt-5 font-mono text-[11px] uppercase tracking-wider text-lime hover:underline"
                      >
                        ← Continuar comprando
                      </button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-line">
                      {cart.map((it) => (
                        <li key={it.key} className="flex gap-3 py-4">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-line">
                            <Image
                              src={it.product.image}
                              alt={it.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between gap-2">
                              <span className="font-heading text-sm text-t1">
                                {it.product.name}
                              </span>
                              <button
                                onClick={() => removeItem(it.key)}
                                className="font-mono text-[10px] text-t3 hover:text-lime"
                              >
                                remover
                              </button>
                            </div>
                            <span className="font-mono text-[10px] text-t3">
                              {it.size ? `Tam. ${it.size}` : "Único"}
                              {it.product.requiresAnamnese && " · Linha Segredo"}
                            </span>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center rounded border border-line">
                                <button
                                  onClick={() => setQty(it.key, it.qty - 1)}
                                  className="h-7 w-7 text-t1 hover:text-lime"
                                >
                                  –
                                </button>
                                <span className="w-7 text-center font-mono text-xs text-t1">
                                  {it.qty}
                                </span>
                                <button
                                  onClick={() => setQty(it.key, it.qty + 1)}
                                  className="h-7 w-7 text-t1 hover:text-lime"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-mono text-sm text-lime">
                                {brl(it.product.price * it.qty)}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-line px-5 py-4">
                    {segredoPendente && (
                      <div className="mb-3 rounded-lg border border-lime/40 bg-lime/[0.06] p-3">
                        <p className="text-xs leading-relaxed text-t2">
                          Há um item da{" "}
                          <strong className="text-lime">linha Segredo</strong>{" "}
                          no carrinho. Conclua a anamnese para finalizar a
                          compra.
                        </p>
                        <button
                          onClick={() => {
                            closeCart();
                            openAnamnese();
                          }}
                          className="mt-2 w-full rounded-md bg-lime py-2.5 font-mono text-[10px] font-bold uppercase tracking-label text-ink"
                        >
                          Concluir anamnese →
                        </button>
                      </div>
                    )}
                    <div className="flex justify-between font-mono text-[12px] text-t2">
                      <span>Subtotal</span>
                      <span>{brl(cartTotal)}</span>
                    </div>
                    <button
                      disabled={segredoPendente}
                      onClick={() => setStage("checkout")}
                      className="mt-3 w-full rounded-md bg-lime py-3.5 font-mono text-[11px] font-bold uppercase tracking-label text-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Ir para o checkout
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ---------- STAGE: CHECKOUT ---------- */}
            {stage === "checkout" && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="font-mono text-[10px] uppercase tracking-label text-t3">
                    01 · Entrega
                  </div>
                  {["Nome completo", "E-mail", "CEP"].map((f) => (
                    <div key={f} className="mt-3">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-t3">
                        {f}
                      </label>
                      <input
                        placeholder={f}
                        className="mt-1 h-11 w-full rounded-md border border-line bg-bg px-3.5 text-sm text-t1 outline-none transition-colors placeholder:text-t3 focus:border-lime"
                      />
                    </div>
                  ))}
                  <div className="mt-6 font-mono text-[10px] uppercase tracking-label text-t3">
                    02 · Pagamento
                  </div>
                  <div className="mt-3 space-y-2">
                    {PAYMENTS.map((p, i) => (
                      <button
                        key={p}
                        onClick={() => setPay(i)}
                        className={`flex w-full items-center gap-3 rounded-md border p-3 text-left text-sm transition-colors ${
                          pay === i
                            ? "border-lime bg-lime/[0.06] text-t1"
                            : "border-line text-t2"
                        }`}
                      >
                        <span
                          className={`h-3.5 w-3.5 rounded-full border ${
                            pay === i ? "border-lime bg-lime" : "border-t3"
                          }`}
                        />
                        {p}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-t3">
                    Processado com segurança via Mercado Pago.
                  </p>
                </div>
                <div className="border-t border-line px-5 py-4">
                  <div className="space-y-1.5 font-mono text-[12px] text-t2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{brl(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span>{brl(shipping)}</span>
                    </div>
                    <div className="flex justify-between border-t border-line pt-1.5 font-heading text-base text-t1">
                      <span>Total</span>
                      <span>{brl(grand)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setStage("done");
                      clearCart();
                    }}
                    className="mt-3 w-full rounded-md bg-lime py-3.5 font-mono text-[11px] font-bold uppercase tracking-label text-ink transition-colors hover:bg-white"
                  >
                    Pagar com Mercado Pago
                  </button>
                  <button
                    onClick={() => setStage("cart")}
                    className="mt-2 w-full font-mono text-[10px] uppercase tracking-wider text-t3 hover:text-t1"
                  >
                    ← Voltar ao carrinho
                  </button>
                </div>
              </>
            )}

            {/* ---------- STAGE: DONE ---------- */}
            {stage === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-lime text-2xl text-ink"
                >
                  ✓
                </motion.span>
                <h3 className="mt-5 font-heading text-xl font-bold text-t1">
                  Pedido enviado
                </h3>
                <p className="mt-2 text-sm text-t2">
                  Demonstração do fluxo de checkout. Na versão final, o
                  pagamento é concluído pelo Mercado Pago.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 rounded-md border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-t1 hover:border-lime hover:text-lime"
                >
                  Fechar
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

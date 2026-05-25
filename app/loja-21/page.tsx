"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { MOCK_PRODUCTS } from "@/lib/products";

const LS_KEY = "sf_anamnese_intro";
const SEGREDO_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.requiresAnamnese);

export default function Loja21() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY) !== "done") {
        router.replace("/");
        return;
      }
    } catch {
      router.replace("/");
      return;
    }
    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  return (
    <>
      {/* header minimalista */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center px-5 md:px-8 h-14 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 font-mono text-[10px] uppercase tracking-label text-ink/70 transition-colors hover:border-brand hover:text-brand"
        >
          ← Voltar para Home
        </button>
      </header>

      <main className="min-h-screen bg-white pt-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 pt-16 pb-20 md:pt-20 md:pb-28">
          {/* badge de acesso */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-md border border-brand/40 bg-brand/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-label text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Linha 21+ — Acesso Liberado
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 font-heading text-[clamp(2rem,7vw,4.5rem)] font-bold uppercase text-ink leading-none">
              Linha <span className="text-brand">Segredo</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-ink/60 max-w-lg">
              Strains e blends funcionais exclusivos. Cogumelos de bem-estar para quem
              completou a anamnese. 21+.
            </p>
          </Reveal>

          {/* grade de produtos */}
          <motion.div
            layout
            className="mt-10 md:mt-14 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:gap-5"
          >
            {SEGREDO_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} hideLockBadge />
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* overlays */}
      <AgeGate />
      <CartDrawer />
      <ProductModal />
    </>
  );
}

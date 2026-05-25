"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useStore } from "@/components/store";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#drop", label: "Drops" },
  { href: "#segredo", label: "Linha Segredo" },
  { href: "#loja", label: "Loja" },
  { href: "#studios", label: "Studios" },
  { href: "#som", label: "Som" },
  { href: "#arquivo", label: "Arquivo" },
];

export function Header() {
  const { cartCount, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-bg/[0.85] backdrop-blur-xl border-b border-line"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 md:px-8 md:pt-[19px] md:pb-[14px]">
          {/* logo */}
          <a href="#topo" className="group flex items-center" aria-label="The Secret Funghi">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-the-secret-oficial.png"
              alt="The Secret Funghi"
              className="h-9 w-auto object-contain md:h-11"
            />
          </a>

          {/* nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] uppercase tracking-wider text-brand transition-colors hover:text-brand/70"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ações */}
          <div className="flex items-center gap-2">
            {/* carrinho — texto oculto no mobile, só ícone+badge */}
            <button
              onClick={openCart}
              aria-label="Abrir carrinho"
              className="group relative flex h-10 items-center gap-2 rounded-md border border-brand px-3 md:px-3.5 font-mono text-[11px] uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-[#ebdfc6]"
            >
              <span className="hidden sm:inline">Carrinho</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink transition-colors group-hover:bg-white group-hover:text-ink">
                {cartCount}
              </span>
            </button>
            {/* hambúrguer */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="grid h-10 w-10 place-items-center rounded-md border border-brand text-brand transition-colors hover:border-brand/70 lg:hidden"
            >
              <span className="space-y-[5px]">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-3 bg-current ml-auto" />
              </span>
            </button>
          </div>
        </div>

        {/* barra de progresso de scroll */}
        <motion.div
          className="h-px origin-left bg-brand"
          style={{ scaleX: progress }}
        />
      </motion.header>

      {/* menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-ink/[0.98] backdrop-blur-xl lg:hidden"
          >
            {/* topo do menu */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <img
                src="/logo-the-secret-oficial.png"
                alt="The Secret Funghi"
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-md border border-line text-t1 text-lg"
              >
                ✕
              </button>
            </div>

            {/* links */}
            <nav className="flex flex-1 flex-col justify-center gap-0 px-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line/50 py-4 font-heading text-2xl font-medium text-t1 transition-colors active:text-brand"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            {/* rodapé do menu */}
            <div className="px-6 py-6 border-t border-line">
              <button
                onClick={() => { openCart(); setMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-brand py-3 font-mono text-[11px] uppercase tracking-wider text-[#ebdfc6]"
              >
                Ver Carrinho
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink/30 px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              </button>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-label text-t3">
                Unlock your mind · Since 2023
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

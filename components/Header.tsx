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
        <div className="mx-auto flex max-w-[1280px] items-start justify-between px-5 pt-[19px] pb-[14px] md:px-8 -translate-x-[58px]">
          {/* logo */}
          <a href="#topo" className="group flex items-center self-start ml-[66px] md:ml-[98px] -mt-[6px]" aria-label="The Secret Funghi">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-the-secret-oficial.png"
              alt="The Secret Funghi"
              className="h-11 w-auto object-contain"
            />
          </a>

          {/* nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex self-start -ml-[20px] mt-[11px]">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] uppercase tracking-wider text-t2 transition-colors hover:text-t1"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ações */}
          <div className="flex items-center gap-2.5 self-start -mt-[2px]">
            <button
              onClick={openCart}
              aria-label="Abrir carrinho"
              className="relative flex h-10 items-center gap-2 rounded-md border border-line px-3.5 font-mono text-[11px] uppercase tracking-wider text-t1 transition-colors hover:border-brand hover:text-brand"
            >
              Carrinho
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-ink">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="grid h-10 w-10 place-items-center rounded-md border border-line text-t1 transition-colors hover:border-brand lg:hidden"
            >
              <span className="space-y-1">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink/[0.97] backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="font-heading text-lg font-bold uppercase text-t1">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-md border border-line text-t1"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-line py-4 font-heading text-3xl font-medium text-t1 transition-colors hover:text-brand"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

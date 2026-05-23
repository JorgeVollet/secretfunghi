"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useStore } from "@/components/store";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#loja", label: "Loja" },
  { href: "#segredo", label: "Linha Segredo" },
  { href: "#studios", label: "Studios" },
  { href: "#som", label: "Som" },
  { href: "#patreon", label: "Patreon" },
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
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-8">
          {/* logo */}
          <a
            href="#topo"
            className="group font-heading text-lg font-bold uppercase tracking-tight text-t1"
          >
            O Segredo{" "}
            <span className="text-lime transition-all group-hover:[text-shadow:0_0_14px_var(--glow)]">
              Fungi
            </span>
          </a>

          {/* nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] uppercase tracking-wider text-t2 transition-colors hover:text-t1"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ações */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={openCart}
              aria-label="Abrir carrinho"
              className="relative flex h-10 items-center gap-2 rounded-md border border-line px-3.5 font-mono text-[11px] uppercase tracking-wider text-t1 transition-colors hover:border-lime hover:text-lime"
            >
              Carrinho
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[10px] font-bold text-ink">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="grid h-10 w-10 place-items-center rounded-md border border-line text-t1 transition-colors hover:border-lime lg:hidden"
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
          className="h-px origin-left bg-lime"
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
                  className="border-b border-line py-4 font-heading text-3xl font-medium text-t1 transition-colors hover:text-lime"
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

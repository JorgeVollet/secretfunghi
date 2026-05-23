"use client";

import { useRef, type ReactNode, type MouseEvent, type RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "primary" | "ghost" | "lime-ghost";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-md " +
  "font-mono text-[11px] uppercase tracking-label px-7 py-3.5 " +
  "cursor-pointer select-none transition-colors duration-200";

const styles: Record<Variant, string> = {
  primary: "bg-lime text-ink hover:bg-white",
  ghost: "border border-line text-t1 hover:border-t2 hover:bg-white/[0.03]",
  "lime-ghost":
    "border border-lime/40 text-lime hover:bg-lime/10 hover:border-lime",
};

/**
 * Botão com efeito magnético: o botão segue de leve o cursor quando
 * o mouse passa por cima, com retorno suave por mola. 100% React + Framer Motion.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  pull = 0.35,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  className?: string;
  pull?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * pull);
    y.set((e.clientY - (r.top + r.height / 2)) * pull);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const cls = `${base} ${styles[variant]} ${className}`;
  const shared = {
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 300, damping: 18 },
  };

  if (href) {
    const external = href.startsWith("http");
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={cls}
      {...shared}
    >
      {children}
    </motion.button>
  );
}

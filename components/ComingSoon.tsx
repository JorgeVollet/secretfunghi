"use client";

/**
 * ComingSoon — tela de bloqueio do site enquanto está em construção.
 *
 * - Fundo branco com o efeito CellsField interativo (mesmas cores da Hero: vermelho + terra cota).
 * - Texto "LOADING, BUT IT IS SECRET." + logo da marca centralizados.
 * - Botão discreto "STAFF ONLY" no canto inferior direito.
 * - Modal de login simples: login "secret" / senha "secretteam".
 * - Após login, persiste em sessionStorage e libera o site.
 */

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CellsField = dynamic(
  () => import("@/components/CellsField").then((m) => m.CellsField),
  { ssr: false }
);

// Mesmas cores da Hero — vermelho escuro #571c16 + tons terra cota #9b7d61
const COLOR1: [number, number, number] = [0.341, 0.110, 0.086]; // #571c16 vermelho escuro
const COLOR2: [number, number, number] = [0.608, 0.490, 0.380]; // #9b7d61 terra cota
const EDGE: [number, number, number]   = [0.341, 0.110, 0.086]; // #571c16 membranas

const STORAGE_KEY = "sf_staff_auth";

function checkAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

interface ComingSoonProps {
  children: React.ReactNode;
}

export function ComingSoon({ children }: ComingSoonProps) {
  const [unlocked, setUnlocked]   = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin]         = useState("");
  const [senha, setSenha]         = useState("");
  const [erro, setErro]           = useState("");
  const [shake, setShake]         = useState(false);
  const [mounted, setMounted]     = useState(false);

  // evita flash: só decide depois de montar no cliente
  useEffect(() => {
    setMounted(true);
    if (checkAuth()) setUnlocked(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (login.trim().toLowerCase() === "secret" && senha === "secretteam") {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShowModal(false);
      setUnlocked(true);
    } else {
      setErro("Credenciais inválidas.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  // enquanto não montou no cliente, não renderiza nada (evita hydration mismatch)
  if (!mounted) return null;

  return (
    <>
      {/* ── Site sempre montado por baixo — evita remount que quebra o layout ── */}
      <div style={{ visibility: unlocked ? "visible" : "hidden", pointerEvents: unlocked ? "auto" : "none" }}>
        {children}
      </div>

      {/* ── Tela de Coming Soon — some com AnimatePresence ─────────────────── */}
      <AnimatePresence>
      {!unlocked && (
      <motion.div
        key="coming-soon-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
      >

        {/* Fundo de células — vermelho escuro + terra cota, igual à Hero */}
        <div className="absolute inset-0 opacity-55">
          <CellsField
            fillStyle="cells"
            density={5}
            speed={1.0}
            repulsionStrength={1.6}
            mouseRadius={0.6}
            glowIntensity={0.18}
            color1={COLOR1}
            color2={COLOR2}
            edgeColor={EDGE}
          />
        </div>

        {/* Gradiente suave sobre as células */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.88) 100%)" }}
        />

        {/* Conteúdo central */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo-the-secret-oficial.png"
              alt="The Secret Fungi"
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Título */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-[var(--font-anton)] text-[clamp(1.6rem,6vw,4rem)] uppercase leading-none tracking-tight text-black"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Loading, but it is secret.
            </motion.h1>
          </div>

          {/* Barra animada */}
          <motion.div
            className="w-48 h-px bg-black/20 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="h-full bg-black"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Botão STAFF ONLY — discreto, canto inferior direito */}
        <motion.button
          onClick={() => { setErro(""); setShowModal(true); }}
          className="absolute bottom-5 right-5 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-black/25 hover:text-black/60 transition-colors duration-300 cursor-pointer select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          aria-label="Acesso restrito à equipe"
        >
          Staff Only
        </motion.button>
      </motion.div>
      )}
      </AnimatePresence>

      {/* ── Modal de login ──────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[10000] bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* Card */}
            <motion.div
              className="fixed inset-0 z-[10001] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.form
                onSubmit={handleLogin}
                className="w-full max-w-xs bg-white border border-black/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
                animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                transition={{ duration: 0.45 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cabeçalho */}
                <div className="flex flex-col gap-1 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Restricted Access
                  </span>
                  <h2 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight text-black">
                    Staff Only
                  </h2>
                </div>

                {/* Campo login */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/50">
                    Login
                  </label>
                  <input
                    type="text"
                    autoComplete="username"
                    autoFocus
                    value={login}
                    onChange={(e) => { setLogin(e.target.value); setErro(""); }}
                    className="w-full border-b border-black/20 bg-transparent py-2 text-sm text-black outline-none focus:border-black transition-colors placeholder:text-black/25"
                    placeholder="seu login"
                  />
                </div>

                {/* Campo senha */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/50">
                    Senha
                  </label>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); setErro(""); }}
                    className="w-full border-b border-black/20 bg-transparent py-2 text-sm text-black outline-none focus:border-black transition-colors placeholder:text-black/25"
                    placeholder="••••••••"
                  />
                </div>

                {/* Mensagem de erro */}
                <AnimatePresence>
                  {erro && (
                    <motion.p
                      className="text-xs text-red-500 -mt-2"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {erro}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Botões */}
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 rounded-lg border border-black/15 font-mono text-[11px] uppercase tracking-wider text-black/50 hover:text-black hover:border-black/40 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-black font-mono text-[11px] uppercase tracking-wider text-white hover:bg-black/80 transition-colors"
                  >
                    Entrar
                  </button>
                </div>
              </motion.form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

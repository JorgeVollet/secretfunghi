"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/components/store";

export function AgeGate() {
  const { hydrated, ageOk, confirmAge } = useStore();
  const [declined, setDeclined] = useState(false);

  const show = hydrated && !ageOk;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="age-gate-overlay"
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden px-5 bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* fundo */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/img/butterfly-xray.png"
              alt=""
              fill
              priority
              className="object-contain opacity-30"
              style={{ objectPosition: "center center" }}
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-line"
            >
              <Image
                src="/img/seal.jpg"
                alt="Selo O Segredo Fungi"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </motion.div>

            {!declined ? (
              <>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-label" style={{ color: '#571c16' }}>
                  Acesso restrito
                </div>
                <h1 className="mt-3 ds-display text-5xl">
                  O Segredo <span style={{ color: '#571c16' }}>Fungi</span>
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-t2">
                  Para entrar você precisa ter{" "}
                  <strong className="text-t1">21 anos ou mais</strong>.
                  Confirme sua idade para continuar.
                </p>
                <div className="mt-7 flex justify-center gap-3">
                  <motion.button
                    onClick={confirmAge}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-md px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-label text-ink transition-colors hover:bg-white"
                    style={{ backgroundColor: '#571c16' }}
                  >
                    Tenho 21+ · Entrar
                  </motion.button>
                  <motion.button
                    onClick={() => setDeclined(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-md border border-line px-7 py-3.5 font-mono text-[11px] uppercase tracking-label text-t1 transition-colors hover:border-t2"
                  >
                    Sair
                  </motion.button>
                </div>
                <p className="mt-7 font-mono text-[10px] leading-relaxed text-t3">
                  Conteúdo e produtos para maiores de 21 anos.
                  <br />O Segredo Fungi® · Made in Brazil · Since 2023
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >
                <h2 className="font-heading text-2xl font-bold text-t1">
                  Volte quando tiver 21+
                </h2>
                <p className="mt-3 text-sm text-t2">
                  Este conteúdo é restrito. Agradecemos a visita.
                </p>
                <button
                  onClick={() => setDeclined(false)}
                  className="mt-6 font-mono text-[11px] uppercase tracking-wider hover:underline"
                  style={{ color: '#571c16' }}
                >
                  ← Voltar
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

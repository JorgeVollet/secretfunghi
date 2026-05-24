"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/components/store";

/**
 * Anamnese — questionário de entrada.
 * IMPORTANTE: as perguntas abaixo são um RASCUNHO de estrutura.
 * As perguntas reais serão definidas pelo Jorge junto com o Marcelo.
 */
const STEPS = [
  {
    q: "Como você chegou até O Segredo Fungi?",
    opts: [
      "Indicação de um amigo",
      "Redes sociais / conteúdo",
      "Já conhecia a marca de vestuário",
      "Outro caminho",
    ],
  },
  {
    q: "Você já teve contato com cogumelos funcionais?",
    opts: ["Sim, uso com frequência", "Já experimentei algumas vezes", "Nunca, é a primeira vez"],
  },
  {
    q: "O que mais te interessa na linha Segredo?",
    opts: ["Foco e clareza", "Bem-estar e equilíbrio", "Curiosidade pela cultura", "Ainda explorando"],
  },
  {
    q: "Você confirma ter 21 anos ou mais e estar ciente de que é um produto de bem-estar?",
    opts: ["Sim, confirmo"],
  },
];

export function Anamnese() {
  const { anamneseOpen, closeAnamnese, completeAnamnese } = useStore();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});

  const total = STEPS.length;
  const current = STEPS[step];
  const chosen = picked[step];

  function next() {
    if (chosen === undefined) return;
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      completeAnamnese();
      setStep(0);
      setPicked({});
    }
  }

  return (
    <AnimatePresence>
      {anamneseOpen && (
        <motion.div
          key="anamnese-overlay"
          className="fixed inset-0 z-[70] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/[0.85] backdrop-blur-md"
            onClick={closeAnamnese}
          />
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-xl2 border border-line bg-surface p-6 md:p-8"
          >
            <button
              onClick={closeAnamnese}
              aria-label="Fechar"
              className="absolute right-4 top-4 text-t3 transition-colors hover:text-t1"
            >
              ✕
            </button>

            {/* progresso */}
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-line"
                >
                  <motion.div
                    className="h-full bg-brand"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 font-mono text-[10px] uppercase tracking-label text-brand">
              Anamnese · Passo {step + 1} de {total}
            </div>

            {step === 0 && (
              <h2 className="mt-2 ds-display text-3xl">
                Você é um <span className="text-brand">detetive</span>
              </h2>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mt-5 font-heading text-lg text-t1">
                  {current.q}
                </h3>
                <div className="mt-4 space-y-2.5">
                  {current.opts.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => setPicked({ ...picked, [step]: i })}
                      className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-colors ${
                        chosen === i
                          ? "border-brand bg-brand/10 text-t1"
                          : "border-line text-t2 hover:border-t2"
                      }`}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                          chosen === i
                            ? "border-brand bg-brand"
                            : "border-t3"
                        }`}
                      >
                        {chosen === i && (
                          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                        )}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => (step > 0 ? setStep(step - 1) : closeAnamnese())}
                className="font-mono text-[11px] uppercase tracking-wider text-t3 transition-colors hover:text-t1"
              >
                {step > 0 ? "← Voltar" : "Pular por agora"}
              </button>
              <motion.button
                onClick={next}
                whileHover={{ scale: chosen === undefined ? 1 : 1.04 }}
                whileTap={{ scale: 0.96 }}
                disabled={chosen === undefined}
                className="rounded-md bg-brand px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-label text-ink transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step < total - 1 ? "Continuar →" : "Concluir anamnese"}
              </motion.button>
            </div>

            <p className="mt-4 font-mono text-[9px] leading-relaxed text-t3">
              Suas respostas são privadas e usadas só para personalizar sua
              experiência.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

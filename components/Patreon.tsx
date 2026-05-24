"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const PATREON =
  process.env.NEXT_PUBLIC_PATREON_URL ?? "https://www.patreon.com/";

const TIERS = [
  {
    name: "Iniciado",
    tier: "Tier 01",
    perks: ["Posts exclusivos", "Acesso à comunidade", "Bastidores dos drops"],
    feat: false,
  },
  {
    name: "Detetive",
    tier: "Tier 02 · popular",
    perks: [
      "Tudo do Iniciado",
      "Drops antecipados",
      "Biblioteca completa",
      "Descontos na loja",
    ],
    feat: true,
  },
  {
    name: "Guardião",
    tier: "Tier 03",
    perks: ["Tudo do Detetive", "Itens físicos exclusivos", "Acesso a eventos"],
    feat: false,
  },
];

export function Patreon() {
  return (
    <section id="patreon" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center">
          <Reveal>
            <span className="ds-eyebrow">Patreon · Membros</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-5 max-w-2xl ds-display text-[clamp(2.2rem,5vw,4rem)]">
              O círculo <span className="text-brand">secreto</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-sm text-t2">
              Acesso de membro: conteúdo exclusivo, drops antecipados e a
              biblioteca da marca no Patreon.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <RevealItem key={t.name}>
              <motion.a
                href={PATREON}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex h-full flex-col rounded-xl2 border p-7 transition-colors duration-300 ${
                  t.feat
                    ? "border-brand bg-brand/[0.06] shadow-glow"
                    : "border-line bg-surface hover:border-brand/40"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider ${
                    t.feat ? "text-brand" : "text-t3"
                  }`}
                >
                  {t.tier}
                </span>
                <span className="mt-2 font-heading text-3xl font-bold uppercase text-t1">
                  {t.name}
                </span>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2 border-b border-line pb-2.5 text-[13px] text-t2"
                    >
                      <span className="text-brand">✦</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-6 rounded-md py-3 text-center font-mono text-[11px] font-bold uppercase tracking-label transition-colors ${
                    t.feat
                      ? "bg-brand text-ink"
                      : "border border-line text-t1 hover:border-brand hover:text-brand"
                  }`}
                >
                  Apoiar no Patreon
                </span>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

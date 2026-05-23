"use client";

/**
 * Faixa de texto em loop infinito (marquee).
 * O conteúdo é duplicado para o loop ficar contínuo.
 */
export function Marquee({
  items,
  variant = "lime",
  fast = false,
}: {
  items: string[];
  variant?: "lime" | "dark";
  fast?: boolean;
}) {
  const skin =
    variant === "lime"
      ? "bg-lime text-ink"
      : "bg-ink text-t1 border-y border-line";
  const track = fast ? "animate-marquee-fast" : "animate-marquee";

  return (
    <div className={`group relative overflow-hidden ${skin} py-2.5`}>
      <div className={`flex w-max ${track} group-hover:[animation-play-state:paused]`}>
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <li
                key={`${dup}-${i}`}
                className="flex items-center font-heading text-sm font-medium uppercase tracking-wide"
              >
                <span className="px-7">{it}</span>
                <span className="opacity-40">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

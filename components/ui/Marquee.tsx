"use client";

import { useEffect, useRef, useState } from "react";

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
      ? "bg-brand text-ink"
      : "bg-ink text-t1 border-y border-line";
  const track = fast ? "animate-marquee-fast" : "animate-marquee";

  const wrapRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const [repeat, setRepeat] = useState(1);

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const seq = seqRef.current;
      if (!wrap || !seq) return;
      const oneSetWidth = seq.scrollWidth / repeat;
      if (oneSetWidth === 0) return;
      const needed = Math.ceil(wrap.offsetWidth / oneSetWidth) + 1;
      setRepeat((r) => (r !== needed ? needed : r));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, repeat]);

  const sequence = Array.from({ length: repeat }).flatMap(() => items);

  return (
    <div ref={wrapRef} className={`group relative overflow-hidden ${skin} py-2.5`}>
      <div className={`flex w-max ${track} group-hover:[animation-play-state:paused]`}>
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            ref={dup === 0 ? seqRef : undefined}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1}
          >
            {sequence.map((it, i) => (
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

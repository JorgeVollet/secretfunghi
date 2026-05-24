"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/Reveal";

const DomeGallery = dynamic(
  () => import("@/components/ui/DomeGallery"),
  { ssr: false }
);

const Particles = dynamic(() => import("@/components/ui/Particles"), { ssr: false });

const DROP_IMAGES = [
  { src: "/img/destaques/1.png", alt: "Destaque 1" },
  { src: "/img/destaques/2.png", alt: "Destaque 2" },
  { src: "/img/destaques/3.png", alt: "Destaque 3" },
  { src: "/img/destaques/4.png", alt: "Destaque 4" },
  { src: "/img/destaques/5.png", alt: "Destaque 5" },
  { src: "/img/destaques/6.png", alt: "Destaque 6" },
  { src: "/img/destaques/7.png", alt: "Destaque 7" },
  { src: "/img/destaques/8.png", alt: "Destaque 8" },
  { src: "/img/destaques/9.png", alt: "Destaque 9" },
  { src: "/img/destaques/10.png", alt: "Destaque 10" },
  { src: "/img/destaques/11.png", alt: "Destaque 11" },
  { src: "/img/destaques/12.png", alt: "Destaque 12" },
  { src: "/img/destaques/13.png", alt: "Destaque 13" },
  { src: "/img/destaques/14.png", alt: "Destaque 14" },
  { src: "/img/destaques/15.png", alt: "Destaque 15" },
  { src: "/img/destaques/16.png", alt: "Destaque 16" },
  { src: "/img/destaques/17.png", alt: "Destaque 17" },
  { src: "/img/destaques/18.png", alt: "Destaque 18" },
  { src: "/img/destaques/19.png", alt: "Destaque 19" },
  { src: "/img/destaques/20.png", alt: "Destaque 20" },
];

export function DropDoMes() {
  return (
    <section id="drop" className="relative bg-ink py-24 md:py-32" style={{ scrollMarginTop: '-35px' }}>
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={700}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 mb-12">
        <Reveal>
          <span className="ds-eyebrow">Drop do Mês</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 ds-display text-[clamp(2.2rem,5vw,4rem)]">
            Os <span className="text-brand">destaques</span>
          </h2>
        </Reveal>
      </div>
      <div className="relative z-10" style={{ width: "100%", height: "70vh" }}>
        <DomeGallery
          images={DROP_IMAGES}
          fit={0.65}
          minRadius={300}
          maxVerticalRotationDeg={20}
          segments={20}
          dragDampening={5}
          grayscale
          overlayBlurColor="#0A0A0A"
          openedImageWidth="90vw"
          openedImageHeight="90vh"
        />
      </div>
    </section>
  );
}

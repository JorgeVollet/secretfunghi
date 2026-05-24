"use client";

/**
 * CellsField — fundo de células orgânicas (estilo Vanta CELLS) com a
 * interação de repulsão de mouse do componente Galaxy (react-bits).
 *
 * Substitui o antigo VantaCells.tsx. Usa OGL (já instalado no projeto,
 * usado também pelo FluidMouse) — não depende mais de `vanta` nem de
 * `three`. Tudo num único canvas WebGL.
 *
 * O motor é um Voronoi animado (mesma tesselação que o Vanta CELLS usa
 * por baixo). O cursor empurra o campo de células para longe — mesma
 * lógica de repulsão do shader do Galaxy: distorce as coordenadas em
 * função da distância ao mouse, com a posição do mouse suavizada por
 * lerp.
 *
 * Dois modos de pintura (prop `fillStyle`):
 *  - "cells" (padrão): células preenchidas com membrana suave — o look
 *    do Vanta CELLS original.
 *  - "veins": junções desenhadas como veias finas luminosas.
 *
 * O movimento do mouse é escutado no `window` (e não no container) de
 * propósito: na Hero existem camadas por cima do canvas — o gradiente
 * escuro e o texto — que interceptariam o evento se o listener ficasse
 * no container!. Escutando no window, a posição sempre chega.
 */

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform float uMouseActive;
uniform float uDensity;
uniform float uSpeed;
uniform float uRepulsion;
uniform float uMouseRadius;
uniform float uGlow;
uniform float uFill;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uEdge;

varying vec2 vUv;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123);
}

void main() {
  vec2 res = uResolution;
  vec2 uv  = (vUv * res - 0.5 * res) / res.y;

  // repulsão de mouse — mesma ideia do Galaxy: empurra o campo
  vec2  m    = (uMouse * res - 0.5 * res) / res.y;
  vec2  d    = uv - m;
  float dist = length(d);
  float push = uRepulsion / (dist * dist + 0.05);
  push = min(push, 7.0);
  uv += normalize(d + 0.0001) * push * 0.025 * uMouseActive;

  float t = uTime * uSpeed * 0.25;
  vec2  p = uv * uDensity;
  vec2  n = floor(p);
  vec2  f = fract(p);

  // passada 1 — célula mais próxima
  vec2  mr = vec2(0.0);
  vec2  mg = vec2(0.0);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(t + 6.2831853 * o);
      vec2 r = g + o - f;
      float dd = dot(r, r);
      if (dd < md) { md = dd; mr = r; mg = g; }
    }
  }

  // passada 2 — distância até a borda da célula
  float edge = 8.0;
  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 g = mg + vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(t + 6.2831853 * o);
      vec2 r = g + o - f;
      vec2 diff = mr - r;
      if (dot(diff, diff) > 0.00001) {
        edge = min(edge, dot(0.5 * (mr + r), normalize(r - mr)));
      }
    }
  }

  float id = hash2(n + mg).x;
  vec3 col;

  if (uFill < 0.5) {
    // --- modo VEIAS — junções como teia fina luminosa ---
    float vol  = smoothstep(0.0, 0.55, edge);
    vec3  fill = mix(uColor1, uColor2, id * 0.7);
    fill = mix(fill * 0.5, fill, vol);
    float vein     = 1.0 - smoothstep(0.0, 0.045, edge);
    float veinSoft = 1.0 - smoothstep(0.0, 0.17, edge);
    float pulse    = 0.85 + 0.15 * sin(uTime * 0.7 + id * 30.0);
    col = fill;
    col += uEdge * veinSoft * 0.22 * uGlow;
    col += uEdge * vein * uGlow * (1.0 + 0.5 * pulse);
  } else {
    // --- modo CÉLULAS CHEIAS — look do Vanta CELLS original ---
    float membrane = 1.0 - smoothstep(0.0, 0.40, edge);
    float volume   = smoothstep(0.0, 0.55, edge);
    vec3  base = mix(uColor1, uColor2, 0.20 + id * 0.6);
    col = mix(base, base * 0.45, volume * 0.7);
    col = mix(col, uColor2 * 1.15, membrane * 0.75);
    col += uEdge * membrane * uGlow * 0.55;
    float pulse = 0.92 + 0.08 * sin(uTime * 0.6 + id * 30.0);
    col *= pulse;
  }

  // realce sutil das células próximas ao cursor
  float near = 1.0 - smoothstep(0.0, uMouseRadius, dist);
  col += uEdge * near * uMouseActive * 0.11;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface CellsFieldProps {
  /** "cells" = células cheias (Vanta CELLS) | "veins" = veias. Padrão "cells". */
  fillStyle?: "cells" | "veins";
  /** Nº de células visíveis — maior = células menores. Padrão 5. */
  density?: number;
  /** Velocidade do movimento orgânico. Padrão 1.2. */
  speed?: number;
  /** Força com que o cursor empurra as células. Padrão 1.4. */
  repulsionStrength?: number;
  /** Alcance do realce em volta do cursor. Padrão 0.55. */
  mouseRadius?: number;
  /** Intensidade do brilho lima das membranas/veias. Padrão 0.22. */
  glowIntensity?: number;
  /** Liga/desliga a interação de mouse. Padrão true. */
  mouseInteraction?: boolean;
  /** Cor base escura da célula (RGB 0..1). Padrão #0a0a0a esverdeado. */
  color1?: [number, number, number];
  /** Cor clara da célula (RGB 0..1). Padrão lima escurecido. */
  color2?: [number, number, number];
  /** Cor das membranas/veias (RGB 0..1). Padrão vermelho da marca #571c16. */
  edgeColor?: [number, number, number];
}

const DEFAULT_COLOR1: [number, number, number] = [0.341, 0.110, 0.086]; // #571c16
const DEFAULT_COLOR2: [number, number, number] = [0.608, 0.490, 0.380]; // #9b7d61
const DEFAULT_EDGE: [number, number, number] = [0.341, 0.110, 0.086];   // #571c16

export function CellsField({
  fillStyle = "cells",
  density = 5,
  speed = 1.2,
  repulsionStrength = 1.4,
  mouseRadius = 0.55,
  glowIntensity = 0.22,
  mouseInteraction = true,
  color1 = DEFAULT_COLOR1,
  color2 = DEFAULT_COLOR2,
  edgeColor = DEFAULT_EDGE,
}: CellsFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new Renderer({
      alpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(color1[0], color1[1], color1[2], 1);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseActive: { value: 0 },
        uDensity: { value: density },
        uSpeed: { value: speed },
        uRepulsion: { value: repulsionStrength },
        uMouseRadius: { value: mouseRadius },
        uGlow: { value: glowIntensity },
        uFill: { value: fillStyle === "veins" ? 0 : 1 },
        uColor1: { value: new Float32Array(color1) },
        uColor2: { value: new Float32Array(color2) },
        uEdge: { value: new Float32Array(edgeColor) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(container!.offsetWidth, container!.offsetHeight);
      program.uniforms.uResolution.value = new Float32Array([
        gl.canvas.width,
        gl.canvas.height,
      ]);
    }
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    container!.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    // posição do mouse suavizada por lerp (igual ao Galaxy)
    const targetMouse = { x: 0.5, y: 0.5, active: 0 };
    const smoothMouse = { x: 0.5, y: 0.5, active: 0 };

    // Converte uma posição de tela (clientX/Y) para coordenadas 0..1
    // relativas ao canvas. A repulsão só liga quando o cursor está
    // dentro da área do componente (a Hero).
    function pointerMove(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      targetMouse.x = x;
      targetMouse.y = 1 - y;
      targetMouse.active =
        x >= 0 && x <= 1 && y >= 0 && y <= 1 ? 1 : 0;
    }
    function handleMouseMove(e: MouseEvent) {
      pointerMove(e.clientX, e.clientY);
    }
    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        pointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }
    function handlePointerLeave() {
      targetMouse.active = 0;
    }
    if (mouseInteraction) {
      // listener no window — ver comentário no topo do arquivo
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      document.addEventListener("mouseleave", handlePointerLeave);
    }

    let raf = 0;
    function update(t: number) {
      raf = requestAnimationFrame(update);

      if (!reduceMotion) {
        program.uniforms.uTime.value = t * 0.001;
      }

      const k = 0.06;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * k;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * k;
      smoothMouse.active += (targetMouse.active - smoothMouse.active) * k;

      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = smoothMouse.x;
      mouse[1] = smoothMouse.y;
      program.uniforms.uMouseActive.value = smoothMouse.active;

      renderer.render({ scene: mesh });
    }
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("mouseleave", handlePointerLeave);
      }
      if (gl.canvas.parentNode === container) {
        container!.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    fillStyle,
    density,
    speed,
    repulsionStrength,
    mouseRadius,
    glowIntensity,
    mouseInteraction,
    color1,
    color2,
    edgeColor,
  ]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}

export default CellsField;

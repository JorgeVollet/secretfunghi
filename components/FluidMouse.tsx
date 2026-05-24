"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uAmplitude;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 mouse = uMouse;

  float dist = length(uv - mouse);
  float ripple = sin(dist * 40.0 - uTime * 3.0) * exp(-dist * 6.0);

  float strength = ripple * uAmplitude;

  // Cor verde lima bem sutil nas ondas
  vec3 color = vec3(0.0);
  color += vec3(0.42, 0.63, 0.12) * max(0.0, strength) * 0.6;

  float alpha = abs(strength) * 0.45;

  gl_FragColor = vec4(color, alpha);
}
`;

export function FluidMouse() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    container.appendChild(gl.canvas);
    gl.canvas.style.position = "absolute";
    gl.canvas.style.inset = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";

    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = [
        container.offsetWidth,
        container.offsetHeight,
      ];
    };

    const mouse = { x: 0.5, y: 0.5 };
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uAmplitude: { value: 0.0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { geometry, program });

    window.addEventListener("resize", resize);
    resize();

    let targetAmplitude = 0;
    let currentAmplitude = 0;
    let lastX = -1, lastY = -1, lastT = 0;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      const now = Date.now();
      const dt = Math.max(now - lastT, 1);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const vel = Math.sqrt(dx * dx + dy * dy) / dt;

      lastX = e.clientX; lastY = e.clientY; lastT = now;

      mouse.x = x;
      mouse.y = y;
      program.uniforms.uMouse.value = [x, y];

      // Amplitude proporcional à velocidade do mouse
      targetAmplitude = Math.min(vel * 0.8, 0.5);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let rafId: number;
    let startTime = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed;

      // Suaviza amplitude e decai
      currentAmplitude += (targetAmplitude - currentAmplitude) * 0.15;
      targetAmplitude *= 0.92;
      program.uniforms.uAmplitude.value = currentAmplitude;

      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}

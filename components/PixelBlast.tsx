"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_CLICKS = 10;

const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;

uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

const int MAX_CLICKS = 10;
uniform vec2 uClickPos[MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25+Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25+Bayer2(a))

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip=floor(p); vec3 fp=fract(p);
  float n000=hash11(dot(ip+vec3(0,0,0),vec3(1,57,113)));
  float n100=hash11(dot(ip+vec3(1,0,0),vec3(1,57,113)));
  float n010=hash11(dot(ip+vec3(0,1,0),vec3(1,57,113)));
  float n110=hash11(dot(ip+vec3(1,1,0),vec3(1,57,113)));
  float n001=hash11(dot(ip+vec3(0,0,1),vec3(1,57,113)));
  float n101=hash11(dot(ip+vec3(1,0,1),vec3(1,57,113)));
  float n011=hash11(dot(ip+vec3(0,1,1),vec3(1,57,113)));
  float n111=hash11(dot(ip+vec3(1,1,1),vec3(1,57,113)));
  vec3 w=fp*fp*fp*(fp*(fp*6.-15.)+10.);
  return mix(mix(mix(n000,n100,w.x),mix(n010,n110,w.x),w.y),
             mix(mix(n001,n101,w.x),mix(n011,n111,w.x),w.y),w.z)*2.-1.;
}

float fbm2(vec2 uv, float t){
  vec3 p=vec3(uv*uScale,t);
  float amp=1.,freq=1.,sum=1.;
  for(int i=0;i<5;++i){ sum+=amp*vnoise(p*freq); freq*=1.25; amp*=1.0; }
  return sum*0.5+0.5;
}

float maskCircle(vec2 p,float cov){
  float r=sqrt(cov)*.25;
  float d=length(p-0.5)-r;
  float aa=0.5*fwidth(d);
  return cov*(1.-smoothstep(-aa,aa,d*2.));
}

void main(){
  vec2 fragCoord=gl_FragCoord.xy-uResolution*.5;
  float aspectRatio=uResolution.x/uResolution.y;
  vec2 pixelId=floor(fragCoord/uPixelSize);
  vec2 pixelUV=fract(fragCoord/uPixelSize);
  float cellPixelSize=8.*uPixelSize;
  vec2 cellId=floor(fragCoord/cellPixelSize);
  vec2 cellCoord=cellId*cellPixelSize;
  vec2 uv=cellCoord/uResolution*vec2(aspectRatio,1.);

  float base=fbm2(uv,uTime*0.05);
  base=base*0.5-0.65;
  float feed=base+(uDensity-0.5)*0.3;

  float speed=uRippleSpeed;
  float thickness=uRippleThickness;

  if(uEnableRipples==1){
    for(int i=0;i<MAX_CLICKS;++i){
      vec2 pos=uClickPos[i];
      if(pos.x<0.) continue;
      vec2 cuv=(((pos-uResolution*.5-cellPixelSize*.5)/uResolution))*vec2(aspectRatio,1.);
      float t=max(uTime-uClickTimes[i],0.);
      float r=distance(uv,cuv);
      float waveR=speed*t;
      float ring=exp(-pow((r-waveR)/thickness,2.));
      float atten=exp(-1.*t)*exp(-10.*r);
      feed=max(feed,ring*atten*uRippleIntensity);
    }
  }

  float bayer=Bayer8(fragCoord/uPixelSize)-0.5;
  float bw=step(0.5,feed+bayer);
  float h=fract(sin(dot(floor(fragCoord/uPixelSize),vec2(127.1,311.7)))*43758.5453);
  float jitterScale=1.+(h-0.5)*uPixelJitter;
  float coverage=bw*jitterScale;
  float M=maskCircle(pixelUV,coverage);

  if(uEdgeFade>0.){
    vec2 norm=gl_FragCoord.xy/uResolution;
    float edge=min(min(norm.x,norm.y),min(1.-norm.x,1.-norm.y));
    M*=smoothstep(0.,uEdgeFade,edge);
  }

  vec3 c=uColor;
  vec3 srgb=mix(c*12.92,1.055*pow(c,vec3(1./2.4))-0.055,step(0.0031308,c));
  fragColor=vec4(srgb,M);
}
`;

export function PixelBlastCells() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#4a5a10") },
      uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(MAX_CLICKS) },
      uPixelSize: { value: 3 * renderer.getPixelRatio() },
      uScale: { value: 2 },
      uDensity: { value: 1 },
      uPixelJitter: { value: 0 },
      uEnableRipples: { value: 1 },
      uRippleSpeed: { value: 0.4 },
      uRippleThickness: { value: 0.08 },
      uRippleIntensity: { value: 1.4 },
      uEdgeFade: { value: 0 },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SRC,
      fragmentShader: FRAGMENT_SRC,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const setSize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      uniforms.uPixelSize.value = 3 * renderer.getPixelRatio();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    let clickIx = 0;
    const clock = new THREE.Clock();

    const onPointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const scaleX = renderer.domElement.width / rect.width;
      const scaleY = renderer.domElement.height / rect.height;
      const fx = (e.clientX - rect.left) * scaleX;
      const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
      uniforms.uClickPos.value[clickIx].set(fx, fy);
      uniforms.uClickTimes.value[clickIx] = uniforms.uTime.value;
      clickIx = (clickIx + 1) % MAX_CLICKS;
    };

    let lastMoveTime = 0;
    let lastMX = 0, lastMY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 60) return;
      const dx = e.clientX - lastMX;
      const dy = e.clientY - lastMY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 12) return;

      lastMoveTime = now;
      lastMX = e.clientX;
      lastMY = e.clientY;

      const rect = renderer.domElement.getBoundingClientRect();
      const scaleX = renderer.domElement.width / rect.width;
      const scaleY = renderer.domElement.height / rect.height;
      const fx = (e.clientX - rect.left) * scaleX;
      const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
      uniforms.uClickPos.value[clickIx].set(fx, fy);
      uniforms.uClickTimes.value[clickIx] = uniforms.uTime.value;
      clickIx = (clickIx + 1) % MAX_CLICKS;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: true });
    renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime() * 0.5;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container)
        container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}

# Prompt para o Claude Code — Animação de células no fundo da Hero

Cole o bloco abaixo no Claude Code.

---

## PROMPT (copiar a partir daqui)

Quero colocar uma animação de fundo na Hero do site (`components/Hero.tsx`).

A animação é o efeito **Vanta.js "CELLS"** (células orgânicas se mexendo), que roda
sobre Three.js — é o mesmo efeito que estava no site antigo de "loading" do cliente.
Config original que ele usava:

```js
VANTA.CELLS({
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  color1: 0x000000,
  color2: 0x404040,
  size: 2.5,
  speed: 2.0,
})
```

### Decisões já tomadas
- A animação **substitui a foto `/img/look-moto.jpg`** que está hoje no fundo da Hero.
- **Manter o efeito de parallax/scale** que já existe (`bgY`, `bgScale`) — a animação
  deve receber esse mesmo movimento de scroll.
- **Manter o gradiente escuro** que está por cima do fundo (essencial pra legibilidade
  do texto branco da Hero).
- Cor com **toque de verde-lima**: usar `color1: 0x0a0a0a` (base preta, igual ao
  `bg`/`ink` do site) e `color2: 0x5a6b22` (lima escurecido — o lima da marca é
  `#D6FF4F`, então use uma versão bem mais escura pra não estourar como fundo).
  Deixe esses dois valores fáceis de ajustar depois.

### Passos

1. **Instalar dependências** (o projeto é Next.js 14 + React 18):
   ```
   npm install three@0.134.0 vanta@0.5.24
   ```
   IMPORTANTE: fixe o `three` na versão `0.134.0`. O Vanta CELLS quebra com versões
   novas do Three.js — a `0.134.0` é a que o efeito espera.

2. **Criar `components/VantaCells.tsx`** — um componente `"use client"` que:
   - tem um `useRef` para a `<div>` container;
   - dentro de um `useEffect`, faz **import dinâmico** de `three` e de
     `vanta/dist/vanta.cells.min` (import dinâmico é obrigatório: essas libs acessam
     `window` e quebram no SSR do Next se importadas no topo do arquivo);
   - inicializa o efeito passando `el` = a div do ref, `THREE` (o módulo three), e a
     config acima com o toque de lima;
   - guarda a instância em `useRef`/estado e chama `.destroy()` no cleanup do
     `useEffect` (sem isso o hot-reload acumula vários canvas e vaza memória);
   - a div container deve preencher 100% do pai: `className="absolute inset-0 h-full w-full"`.

3. **Editar `components/Hero.tsx`**:
   - remover o bloco `<Image src="/img/look-moto.jpg" ... />`;
   - no lugar dele, dentro da mesma `<motion.div style={{ y: bgY, scale: bgScale }}>`
     (pra herdar o parallax), colocar `<VantaCells />`;
   - **manter** a `<div>` do gradiente
     (`bg-gradient-to-b from-ink/70 via-bg/80 to-bg`) logo depois, por cima da
     animação;
   - manter o resto da Hero (texto, botões, glow, indicador de scroll) intacto.

4. **Verificar**:
   - rodar `npm run dev` e abrir a Hero: a animação de células deve aparecer atrás
     do texto, se mover com o scroll (parallax) e o texto deve continuar legível;
   - conferir que não há erro de SSR/hidratação no console;
   - conferir que ao dar hot-reload não aparecem canvas duplicados.

### Detalhes técnicos a respeitar
- O `import` do efeito é `const CELLS = (await import("vanta/dist/vanta.cells.min")).default;`
- Passe o Three explicitamente: `THREE: THREE` na config (importe com
  `import * as THREE from "three"` dentro do `useEffect`, ou via import dinâmico).
- Não bloquear cliques: o canvas do Vanta fica atrás do conteúdo; garanta que os
  botões da Hero continuam clicáveis.
- Se for simples, respeitar `prefers-reduced-motion` (não inicializar o efeito
  quando o usuário pede menos movimento) — opcional, mas bom ter.

Faça as alterações e me mostre o diff dos arquivos no final.

## (fim do prompt)

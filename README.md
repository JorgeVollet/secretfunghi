# O Segredo Fungi — Site v2 (Next.js)

Site single-page de O Segredo Fungi: vestuário, cultura e cogumelos funcionais.
Construído em **Next.js 14 + React + TypeScript + Tailwind CSS**, com animações
em **Framer Motion**. Desenvolvido por **JV Web Studio**.

O design system (cores, tipografia, biblioteca de movimento) é herdado da
referência enviada pelo cliente — acento **lime `#D6FF4F`** sobre base dark.

---

## Como rodar

Pré-requisito: **Node.js 18.18+** (recomendado 20 ou 22).

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento → http://localhost:3000
npm run build    # build de produção
npm run start    # roda o build de produção
```

Na primeira execução o site usa um **catálogo mock** (`lib/products.ts`),
então roda sem precisar configurar nada.

---

## Estrutura

```
segredo-fungi-web/
├─ app/
│  ├─ layout.tsx        # fontes, metadata, provider global
│  ├─ page.tsx          # monta a página única (todas as seções)
│  └─ globals.css       # base + Tailwind + textura de grão
├─ components/
│  ├─ store.tsx         # estado global (carrinho, age gate, anamnese)
│  ├─ Header / Hero / Sobre / Manifesto / Shop / LinhaSegredo
│  ├─ Studios / Som / Patreon / Arquivo / Footer
│  ├─ AgeGate / Anamnese / CartDrawer / ProductModal
│  ├─ ProductCard
│  └─ ui/  → Reveal, MagneticButton, Marquee
├─ lib/
│  ├─ types.ts          # tipos do catálogo e do carrinho
│  ├─ products.ts       # catálogo mock (fallback)
│  └─ woocommerce.ts    # integração WooCommerce headless
├─ public/img/          # imagens da marca
└─ tailwind.config.ts   # design system (cores da referência)
```

### Ordem das seções (single-page)

Hero → **Sobre (quem somos)** → Manifesto → Loja → Linha Segredo →
Studios (YouTube) → Som (Spotify) → Patreon → Arquivo → Footer.

Age gate 21+, anamnese e carrinho são camadas sobrepostas (modais/drawer).

---

## E-commerce — WooCommerce headless

O WordPress + WooCommerce roda como **back-end** (catálogo, estoque, pedidos,
painel admin e o plugin do Mercado Pago). Este site em Next.js é o **front-end**
e consome a API REST do WooCommerce.

Para ligar a loja real:

1. Suba um WordPress com WooCommerce (a Hostinger já serve).
2. Em `WooCommerce → Configurações → Avançado → API REST`, gere uma chave
   (Consumer key + Consumer secret) com permissão de leitura.
3. Copie `.env.local.example` para `.env.local` e preencha:

```
WOOCOMMERCE_URL=https://loja.osegredofungi.com.br
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...
```

4. Em `next.config.mjs`, libere o domínio do WordPress em `images.remotePatterns`
   para o `next/image` exibir as fotos dos produtos.

Enquanto essas variáveis não existirem, o site usa o catálogo mock — sem erros.

### Pagamento

O pagamento fica no Mercado Pago (Pix, cartão e boleto). Dois caminhos:

- **Checkout no WordPress:** o botão final leva à página de checkout do Woo,
  onde o plugin do Mercado Pago já funciona. Mais simples.
- **Checkout próprio:** construir o checkout aqui no Next.js usando a Store API
  do WooCommerce + Mercado Pago. Mais integrado, mais trabalho.

O `CartDrawer` deste projeto já traz a interface do checkout pronta — falta só
plugar a chamada real de pagamento.

---

## Notas

- A **anamnese** abre após o age gate e também trava a compra da linha Segredo.
  As perguntas em `components/Anamnese.tsx` são um rascunho — definir as reais
  com o cliente.
- A seção **Arquivo** receberá o material do zip artístico (posts/artes/vídeos).
- `prefers-reduced-motion` é respeitado: o site reduz as animações para quem
  configurou isso no sistema.
# secretfunghi

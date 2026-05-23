import type { Product } from "./types";

/**
 * Catálogo MOCK — usado enquanto o WooCommerce headless não está configurado.
 * Assim que as chaves do Woo entrarem no .env.local, lib/woocommerce.ts
 * passa a buscar os produtos reais e este arquivo vira só fallback.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "tee-secret-riders",
    slug: "camiseta-secret-riders",
    name: "Secret Riders",
    category: "vestuario",
    line: "Camiseta Oversized",
    price: 139,
    image: "/img/prod-tee-a.jpg",
    gallery: ["/img/prod-tee-a.jpg", "/img/look-portrait.jpg", "/img/wordmark.jpg"],
    description:
      "Camiseta oversized da linha Secret Riders, com estampa gráfica em alta densidade. Modelagem ampla, gola reforçada. Drop limitado.",
    sizes: ["P", "M", "G", "GG"],
    requiresAnamnese: false,
  },
  {
    id: "tee-secret-fungi",
    slug: "camiseta-secret-fungi",
    name: "Secret Fungi",
    category: "vestuario",
    line: "Camiseta Oversized",
    price: 139,
    image: "/img/prod-tee-b.jpg",
    gallery: ["/img/prod-tee-b.jpg", "/img/look-back.jpg"],
    description:
      "Camiseta oversized com a figura alada Secret Fungi. Algodão pesado, toque encorpado. Edição de coleção.",
    sizes: ["P", "M", "G", "GG"],
    requiresAnamnese: false,
  },
  {
    id: "cap-bar-shield",
    slug: "bone-bar-and-shield",
    name: "Bar & Shield",
    category: "vestuario",
    line: "Boné 5-Panel",
    price: 159,
    image: "/img/prod-cap-a.jpg",
    gallery: ["/img/prod-cap-a.jpg", "/img/emblem.jpg"],
    description:
      "Boné 5-panel com o escudo Bar & Shield bordado. Estrutura firme, ajuste traseiro. Worldwide.",
    sizes: ["Único"],
    requiresAnamnese: false,
    badge: "Best seller",
  },
  {
    id: "cap-worldwide",
    slug: "bone-worldwide",
    name: "Worldwide",
    category: "vestuario",
    line: "Boné 5-Panel",
    price: 159,
    image: "/img/prod-cap-b.jpg",
    gallery: ["/img/prod-cap-b.jpg"],
    description:
      "Boné 5-panel Worldwide, bordado em alto relevo. O clássico da marca em preto absoluto.",
    sizes: ["Único"],
    requiresAnamnese: false,
  },
  {
    id: "segredo-juba-de-leao",
    slug: "segredo-juba-de-leao",
    name: "Segredo · Juba-de-Leão",
    category: "segredo",
    line: "Cogumelo funcional",
    price: 89,
    image: "/img/look-figure.jpg",
    gallery: ["/img/look-figure.jpg", "/img/seal.jpg"],
    description:
      "Cogumelo funcional da linha Segredo (Lion's Mane). Produto natural de bem-estar. Para maiores de 21 anos.",
    requiresAnamnese: true,
    badge: "Linha Segredo",
  },
  {
    id: "segredo-reishi",
    slug: "segredo-reishi",
    name: "Segredo · Reishi",
    category: "segredo",
    line: "Cogumelo funcional",
    price: 89,
    image: "/img/seal.jpg",
    gallery: ["/img/seal.jpg", "/img/digital.jpg"],
    description:
      "Cogumelo funcional Reishi da linha Segredo. Produto natural de bem-estar. Para maiores de 21 anos.",
    requiresAnamnese: true,
    badge: "Linha Segredo",
  },
  {
    id: "segredo-blend-foco",
    slug: "segredo-blend-foco",
    name: "Segredo · Blend Foco",
    category: "segredo",
    line: "Cogumelo funcional",
    price: 99,
    image: "/img/digital.jpg",
    gallery: ["/img/digital.jpg"],
    description:
      "Blend funcional da linha Segredo, pensado para foco e clareza. Produto natural de bem-estar. 21+.",
    requiresAnamnese: true,
    badge: "Linha Segredo",
  },
];

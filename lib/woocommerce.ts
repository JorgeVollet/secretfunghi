import type { Product, ProductCategory } from "./types";
import { MOCK_PRODUCTS } from "./products";

/**
 * Camada de e-commerce — WooCommerce headless.
 * ------------------------------------------------------------
 * O WordPress + WooCommerce roda como BACK-END (catálogo, estoque,
 * pedidos, painel admin e o plugin do Mercado Pago). Este site
 * em Next.js consome a API REST do WooCommerce.
 *
 * Enquanto as variáveis do .env.local não estiverem preenchidas,
 * getProducts() devolve o catálogo mock — o site roda normalmente.
 *
 * Esta função roda no SERVIDOR (Server Component / route handler),
 * então as chaves nunca chegam ao navegador.
 */

const WC_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export const isWooConfigured = Boolean(WC_URL && WC_KEY && WC_SECRET);

/** Tipo parcial da resposta da API do WooCommerce. */
interface WooProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  description: string;
  short_description: string;
  images: { src: string }[];
  categories: { slug: string; name: string }[];
  attributes: { name: string; options: string[] }[];
}

function mapWooProduct(w: WooProduct): Product {
  const catSlugs = w.categories.map((c) => c.slug);
  const isSegredo = catSlugs.some((s) => s.includes("segredo"));
  const category: ProductCategory = isSegredo ? "segredo" : "vestuario";
  const sizeAttr = w.attributes.find((a) =>
    /tamanho|size/i.test(a.name)
  );
  return {
    id: w.id,
    slug: w.slug,
    name: w.name,
    category,
    line: w.categories[0]?.name ?? "Produto",
    price: Number(w.price) || 0,
    image: w.images[0]?.src ?? "/img/wordmark.jpg",
    gallery: w.images.map((i) => i.src),
    description: (w.short_description || w.description || "")
      .replace(/<[^>]+>/g, "")
      .trim(),
    sizes: sizeAttr?.options,
    requiresAnamnese: isSegredo,
  };
}

/**
 * Busca os produtos. Usa o WooCommerce se estiver configurado;
 * caso contrário, devolve o catálogo mock.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isWooConfigured) {
    return MOCK_PRODUCTS;
  }
  try {
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
    const res = await fetch(
      `${WC_URL}/wp-json/wc/v3/products?per_page=50&status=publish`,
      {
        headers: { Authorization: `Basic ${auth}` },
        // revalida o catálogo a cada 5 min (ISR)
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) throw new Error(`WooCommerce respondeu ${res.status}`);
    const data: WooProduct[] = await res.json();
    return data.map(mapWooProduct);
  } catch (err) {
    console.error("[woocommerce] falha ao buscar produtos, usando mock:", err);
    return MOCK_PRODUCTS;
  }
}

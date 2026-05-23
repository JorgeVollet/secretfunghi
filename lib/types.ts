/** Tipos centrais do catálogo e do carrinho. */

export type ProductCategory = "vestuario" | "segredo";

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  /** Categoria macro: vestuário (compra livre) ou linha Segredo (trava de anamnese). */
  category: ProductCategory;
  /** Subtipo exibido no card, ex.: "Camiseta", "Boné", "Cogumelo funcional". */
  line: string;
  price: number;
  image: string;
  gallery?: string[];
  description: string;
  sizes?: string[];
  /** true apenas para a linha Segredo — exige anamnese concluída no checkout. */
  requiresAnamnese: boolean;
  badge?: string;
}

export interface CartItem {
  /** chave única = product.id + tamanho */
  key: string;
  product: Product;
  size?: string;
  qty: number;
}

export type AnamneseStatus = "pending" | "done";

/** Formata número em Real brasileiro. */
export function brl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

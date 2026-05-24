"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { CartItem, Product } from "@/lib/types";

interface StoreState {
  /* hidratação — evita flash do age gate */
  hydrated: boolean;

  /* age gate — só memória, sem persistência */
  ageOk: boolean;
  confirmAge: () => void;

  /* anamnese de entrada — persistida: indica que o usuário já fez 1× na vida */
  introAnamneseDone: boolean;
  /* anamnese de cogumelo — só memória: libera a compra na sessão/pedido atual */
  cogumeloAnamneseOk: boolean;
  anamneseOpen: boolean;
  openAnamnese: () => void;
  closeAnamnese: () => void;
  completeAnamnese: () => void;

  /* carrinho */
  cart: CartItem[];
  addToCart: (product: Product, size?: string, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  /* quick view de produto */
  quickView: Product | null;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

const LS_ANAMNESE_INTRO = "sf_anamnese_intro";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [introAnamneseDone, setIntroAnamneseDone] = useState(false);
  const [cogumeloAnamneseOk, setCogumeloAnamneseOk] = useState(false);
  const [anamneseOpen, setAnamneseOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  /* lê apenas o flag de anamnese de entrada no primeiro render do cliente */
  useEffect(() => {
    try {
      setIntroAnamneseDone(
        localStorage.getItem(LS_ANAMNESE_INTRO) === "done"
      );
    } catch {
      /* localStorage indisponível — segue com os defaults */
    }
    setHydrated(true);
  }, []);

  /* trava o scroll do body quando há overlay aberto */
  useEffect(() => {
    const locked = !ageOk || anamneseOpen || cartOpen || quickView !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ageOk, anamneseOpen, cartOpen, quickView]);

  const confirmAge = useCallback(() => {
    setAgeOk(true);
  }, []);

  const completeAnamnese = useCallback(() => {
    setIntroAnamneseDone(true);
    try {
      localStorage.setItem(LS_ANAMNESE_INTRO, "done");
    } catch {}
    setCogumeloAnamneseOk(true);
    setAnamneseOpen(false);
  }, []);

  const addToCart = useCallback(
    (product: Product, size?: string, qty = 1) => {
      setCart((prev) => {
        const key = `${product.id}__${size ?? "u"}`;
        const found = prev.find((i) => i.key === key);
        if (found) {
          return prev.map((i) =>
            i.key === key ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { key, product, size, qty }];
      });
      setCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  /* ao limpar o carrinho, reseta também o ok de cogumelo — próximo pedido exige nova anamnese */
  const clearCart = useCallback(() => {
    setCart([]);
    setCogumeloAnamneseOk(false);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((n, i) => n + i.qty, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cart]
  );

  const value: StoreState = {
    hydrated,
    ageOk,
    confirmAge,
    introAnamneseDone,
    cogumeloAnamneseOk,
    anamneseOpen,
    openAnamnese: () => setAnamneseOpen(true),
    closeAnamnese: () => setAnamneseOpen(false),
    completeAnamnese,
    cart,
    addToCart,
    removeItem,
    setQty,
    clearCart,
    cartCount,
    cartTotal,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    quickView,
    openQuickView: (p) => setQuickView(p),
    closeQuickView: () => setQuickView(null),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de <StoreProvider>");
  return ctx;
}

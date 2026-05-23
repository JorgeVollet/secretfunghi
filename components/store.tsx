"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { CartItem, Product, AnamneseStatus } from "@/lib/types";

interface StoreState {
  /* hidratação — evita flash do age gate */
  hydrated: boolean;

  /* age gate */
  ageOk: boolean;
  confirmAge: () => void;

  /* anamnese */
  anamnese: AnamneseStatus;
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

const LS_AGE = "sf_age_ok";
const LS_ANAMNESE = "sf_anamnese";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [anamnese, setAnamnese] = useState<AnamneseStatus>("pending");
  const [anamneseOpen, setAnamneseOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  /* lê o estado persistido no primeiro render do cliente */
  useEffect(() => {
    try {
      setAgeOk(localStorage.getItem(LS_AGE) === "1");
      if (localStorage.getItem(LS_ANAMNESE) === "done") setAnamnese("done");
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
    try {
      localStorage.setItem(LS_AGE, "1");
    } catch {}
    /* a anamnese abre logo após o age gate, se ainda estiver pendente */
    setTimeout(() => {
      if (anamnese === "pending") setAnamneseOpen(true);
    }, 650);
  }, [anamnese]);

  const completeAnamnese = useCallback(() => {
    setAnamnese("done");
    try {
      localStorage.setItem(LS_ANAMNESE, "done");
    } catch {}
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

  const clearCart = useCallback(() => setCart([]), []);

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
    anamnese,
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

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CartItem } from "@/lib/types";
import { cedis } from "@/lib/format";
import { BookCover } from "@/components/book-cover";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "tome-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items,
      count,
      subtotal,
      add(item, quantity = 1) {
        setItems((current) => {
          const existing = current.find((entry) => entry.id === item.id);
          if (existing) {
            return current.map((entry) =>
              entry.id === item.id
                ? { ...entry, quantity: Math.min(8, entry.quantity + quantity) }
                : entry,
            );
          }
          return [...current, { ...item, quantity }];
        });
        setOpen(true);
      },
      setQuantity(id, quantity) {
        setItems((current) =>
          quantity < 1
            ? current.filter((item) => item.id !== id)
            : current.map((item) => (item.id === id ? { ...item, quantity: Math.min(8, quantity) } : item)),
        );
      },
      remove(id) {
        setItems((current) => current.filter((item) => item.id !== id));
      },
      clear() {
        setItems([]);
        setOpen(false);
      },
    };
  }, [items]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={() => setOpen(false)}>
          <aside
            className="flex h-full w-full max-w-md flex-col bg-card p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            aria-label="Your bag"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl">Your bag</h2>
              <button className="text-sm" onClick={() => setOpen(false)} type="button">
                Close
              </button>
            </div>
            <div className="mt-6 flex-1 space-y-4 overflow-auto">
              {items.length === 0 ? <p className="text-muted">The bag is empty. The shelves are not.</p> : null}
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-24 w-16 shrink-0">
                    <BookCover src={item.image_url} title={item.title} author={item.author} level={item.level} className="h-full w-full rounded-md" sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif leading-tight">{item.title}</p>
                    <p className="text-sm text-muted">{item.author}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <label className="text-sm">
                        Qty
                        <input
                          className="ml-2 w-14 rounded-full border border-line bg-paper px-2 py-1"
                          type="number"
                          min={1}
                          max={8}
                          value={item.quantity}
                          onChange={(event) => value.setQuantity(item.id, Number(event.target.value))}
                        />
                      </label>
                      <span>{cedis(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-line pt-4">
              <p className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>{cedis(value.subtotal)}</span>
              </p>
              <Link href="/checkout" className="mt-4 block rounded-full bg-forest px-5 py-3 text-center text-paper" onClick={() => setOpen(false)}>
                Checkout
              </Link>
              <Link href="/cart" className="mt-2 block text-center text-sm text-muted" onClick={() => setOpen(false)}>
                Review the bag
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart is only available inside the shop");
  return value;
}

"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart-provider";

export function AddButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      disabled={product.stock < 1}
      onClick={() =>
        add({
          id: product.id,
          slug: product.slug,
          title: product.title,
          author: product.author,
          price: product.price,
          image_url: product.image_url,
          level: product.level,
        })
      }
      className={
        compact
          ? "rounded-full border border-forest px-3 py-1 text-xs text-forest disabled:opacity-40"
          : "rounded-full bg-forest px-5 py-3 text-sm text-paper disabled:opacity-40"
      }
    >
      {product.stock < 1 ? "Sold out" : "Add to bag"}
    </button>
  );
}

export function PurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <label className="text-sm">
        Copies
        <input
          className="ml-2 w-16 rounded-full border border-line bg-card px-3 py-2"
          type="number"
          min={1}
          max={Math.min(8, product.stock)}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>
      <button
        type="button"
        disabled={product.stock < 1}
        className="rounded-full bg-forest px-6 py-3 text-paper disabled:opacity-40"
        onClick={() =>
          add(
            {
              id: product.id,
              slug: product.slug,
              title: product.title,
              author: product.author,
              price: product.price,
              image_url: product.image_url,
              level: product.level,
            },
            quantity,
          )
        }
      >
        {product.stock < 1 ? "Out of stock" : "Add to bag"}
      </button>
    </div>
  );
}

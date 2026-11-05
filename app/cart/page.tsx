"use client";

import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { useCart } from "@/components/cart-provider";
import { cedis } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, setQuantity, remove } = useCart();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-5xl">Your bag</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-muted">Nothing in the bag. <Link href="/shop" className="text-forest">Browse the shelves.</Link></p>
      ) : (
        <div className="mt-8 space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-line pb-5">
              <Link href={`/shop/${item.slug}`} className="relative h-28 w-20">
                <BookCover src={item.image_url} title={item.title} author={item.author} level={item.level} className="h-full w-full rounded-lg" sizes="80px" />
              </Link>
              <div className="flex-1">
                <Link href={`/shop/${item.slug}`} className="font-serif text-2xl">{item.title}</Link>
                <p className="text-sm text-muted">{item.author}</p>
                <div className="mt-3 flex items-center gap-4">
                  <input className="w-16 rounded-full border border-line px-3 py-1" type="number" min={1} max={8} value={item.quantity} onChange={(event) => setQuantity(item.id, Number(event.target.value))} />
                  <button type="button" className="text-sm text-clay" onClick={() => remove(item.id)}>Remove</button>
                  <span className="ml-auto">{cedis(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
          <p className="flex justify-between text-lg"><span>Subtotal</span><span>{cedis(subtotal)}</span></p>
          <p className="text-sm text-muted">Delivery is calculated at checkout, by region.</p>
          <Link href="/checkout" className="inline-block rounded-full bg-forest px-6 py-3 text-paper">Continue to delivery</Link>
        </div>
      )}
    </div>
  );
}

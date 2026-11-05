"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { placeOrder } from "@/lib/actions";
import { cedis } from "@/lib/format";
import { paymentMethods, regions, shippingFor } from "@/lib/ghana";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [region, setRegion] = useState("Greater Accra");
  const [method, setMethod] = useState("mtn_momo");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const shipping = useMemo(() => shippingFor(region, subtotal), [region, subtotal]);
  const needsMomo = method === "mtn_momo" || method === "telecel_cash" || method === "at_money";

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await placeOrder({
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      city: String(formData.get("city") ?? ""),
      region,
      paymentMethod: method,
      momoNumber: String(formData.get("momo") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      items: items.map((item) => ({ product_id: item.id, quantity: item.quantity })),
    });
    if (result.error || !result.order) {
      setError(result.error ?? "The order did not go through.");
      setPending(false);
      return;
    }
    clear();
    router.push(`/checkout/success?token=${result.order.access_token}`);
  }

  if (items.length === 0) {
    return <div className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-serif text-5xl">Checkout</h1><p className="mt-4 text-muted">Your bag is empty.</p></div>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
      <form action={onSubmit} className="space-y-4">
        <h1 className="font-serif text-5xl">Delivery</h1>
        <p className="text-sm text-muted">We record the order and confirm payment before a rider leaves East Legon. Nothing is charged on this page.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="fullName" required placeholder="Full name" className="rounded-2xl border border-line bg-card px-4 py-3" />
          <input name="email" type="email" required placeholder="Email" className="rounded-2xl border border-line bg-card px-4 py-3" />
          <input name="phone" required placeholder="Phone" className="rounded-2xl border border-line bg-card px-4 py-3" />
          <input name="city" required placeholder="City" className="rounded-2xl border border-line bg-card px-4 py-3" />
        </div>
        <input name="address" required placeholder="Address and nearest landmark" className="w-full rounded-2xl border border-line bg-card px-4 py-3" />
        <label className="block text-sm">Region
          <select className="mt-1 w-full rounded-2xl border border-line bg-card px-4 py-3" value={region} onChange={(event) => setRegion(event.target.value)}>
            {regions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <fieldset className="space-y-2">
          <legend className="text-sm">Payment</legend>
          {paymentMethods.map((item) => (
            <label key={item.id} className="flex gap-3 rounded-2xl border border-line bg-card px-4 py-3">
              <input type="radio" name="method" checked={method === item.id} onChange={() => setMethod(item.id)} />
              <span><span className="block">{item.label}</span><span className="text-sm text-muted">{item.hint}</span></span>
            </label>
          ))}
        </fieldset>
        {needsMomo ? <input name="momo" required placeholder="Mobile money number" className="w-full rounded-2xl border border-line bg-card px-4 py-3" /> : null}
        <textarea name="notes" placeholder="Note for the desk" className="w-full rounded-2xl border border-line bg-card px-4 py-3" rows={3} />
        {error ? <p className="text-clay">{error}</p> : null}
        <button disabled={pending} className="rounded-full bg-forest px-6 py-3 text-paper">{pending ? "Placing order…" : "Place order"}</button>
      </form>
      <aside className="h-fit rounded-[2rem] bg-card p-6">
        <h2 className="font-serif text-3xl">Summary</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {items.map((item) => <li key={item.id} className="flex justify-between gap-4"><span>{item.title} × {item.quantity}</span><span>{cedis(item.price * item.quantity)}</span></li>)}
        </ul>
        <p className="mt-4 flex justify-between"><span>Subtotal</span><span>{cedis(subtotal)}</span></p>
        <p className="flex justify-between"><span>Delivery</span><span>{shipping === 0 ? "Free" : cedis(shipping)}</span></p>
        <p className="mt-2 flex justify-between text-lg font-medium"><span>Total</span><span>{cedis(subtotal + shipping)}</span></p>
      </aside>
    </div>
  );
}

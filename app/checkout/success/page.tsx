import Link from "next/link";
import { cedis } from "@/lib/format";
import { paymentLabel } from "@/lib/ghana";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Order placed" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const supabase = await createClient();
  const { data } = token
    ? await supabase.rpc("get_order_by_token", { p_token: token })
    : { data: null };
  const order = data as {
    order_number: string;
    full_name: string;
    email: string;
    city: string;
    region: string;
    payment_method: string;
    status: string;
    total: number;
    shipping: number;
    items: { title: string; quantity: number; unit_price: number }[];
  } | null;

  if (!order) {
    return <div className="mx-auto max-w-xl px-4 py-16"><h1 className="font-serif text-5xl">We could not find that order.</h1></div>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs tracking-[0.22em] text-gold uppercase">Order received</p>
      <h1 className="mt-2 font-serif text-5xl">{order.order_number}</h1>
      <p className="mt-4 text-muted">Thank you, {order.full_name}. A note is on its way to {order.email}. The desk will confirm {paymentLabel(order.payment_method).toLowerCase()} before the books leave East Legon for {order.city}, {order.region}.</p>
      <ul className="mt-8 space-y-2">
        {order.items.map((item) => (
          <li key={item.title} className="flex justify-between border-b border-line py-2">
            <span>{item.title} × {item.quantity}</span>
            <span>{cedis(Number(item.unit_price) * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg">Total {cedis(Number(order.total))}</p>
      <Link href="/shop" className="mt-8 inline-block rounded-full bg-forest px-5 py-3 text-paper">Back to the shelves</Link>
    </div>
  );
}

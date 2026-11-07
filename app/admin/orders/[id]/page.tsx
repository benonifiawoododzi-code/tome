import { notFound } from "next/navigation";
import { updateOrderStatus } from "@/lib/actions";
import { cedis } from "@/lib/format";
import { paymentLabel } from "@/lib/ghana";
import { createClient } from "@/lib/supabase/server";

const statuses = ["placed", "confirmed", "packed", "dispatched", "delivered", "cancelled"];

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
  if (!order) notFound();
  const { data: items } = await supabase.from("order_items").select("title, quantity, unit_price").eq("order_id", id);

  return (
    <div className="max-w-3xl rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{order.order_number}</h1>
      <p className="mt-2 text-muted">{order.full_name} · {order.phone} · {order.email}</p>
      <p className="mt-1">{order.address_line}, {order.city}, {order.region}</p>
      <p className="mt-1 text-sm">Payment: {paymentLabel(order.payment_method)} {order.momo_number ? `· ${order.momo_number}` : ""}{order.payment_method === "cod" ? "" : " · Moolre"}</p>
      <ul className="mt-6 space-y-2">
        {(items ?? []).map((item) => (
          <li key={item.title} className="flex justify-between"><span>{item.title} × {item.quantity}</span><span>{cedis(Number(item.unit_price) * item.quantity)}</span></li>
        ))}
      </ul>
      <p className="mt-4 text-lg">Total {cedis(Number(order.total))}, including {cedis(Number(order.shipping))} delivery</p>
      <form action={updateOrderStatus} className="mt-6 flex gap-3">
        <input type="hidden" name="id" value={order.id} />
        <select name="status" defaultValue={order.status} className="rounded-full border border-line bg-card px-4 py-2">
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <button className="rounded-full bg-forest px-4 py-2 text-paper">Update status</button>
      </form>
    </div>
  );
}

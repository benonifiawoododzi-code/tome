import Link from "next/link";
import { StatusPill } from "@/components/admin/status-pill";
import { cedis } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("orders").select("id, order_number, full_name, city, region, status, total, created_at").order("created_at", { ascending: false });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Orders</h1>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-base">
          <thead className="bg-[#1c2430] text-xs tracking-wide text-white uppercase">
            <tr>
              <th className="px-5 py-4 font-medium">Order</th>
              <th className="px-5 py-4 font-medium">Reader</th>
              <th className="px-5 py-4 font-medium">Place</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Total</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).length === 0 ? <tr><td colSpan={6} className="px-5 py-10 text-[#6b7280]">No orders yet. The first one will land here.</td></tr> : null}
            {(data ?? []).map((order) => (
              <tr key={order.id} className="border-b border-[#eef1f6]">
                <td className="px-5 py-5 font-medium">{order.order_number}</td>
                <td className="px-5 py-5">{order.full_name}</td>
                <td className="px-5 py-5 text-[#6b7280]">{order.city}, {order.region}</td>
                <td className="px-5 py-5"><StatusPill status={order.status} /></td>
                <td className="px-5 py-5">{cedis(Number(order.total))}</td>
                <td className="px-5 py-5 text-right"><Link href={`/admin/orders/${order.id}`} className="text-[#2457c5]">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

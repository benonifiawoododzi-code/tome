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
      <h1 className="text-2xl font-semibold">Orders</h1>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-[#6b7280]">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="font-medium">Reader</th>
              <th className="font-medium">Place</th>
              <th className="font-medium">Status</th>
              <th className="font-medium">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).length === 0 ? <tr><td colSpan={6} className="px-4 py-6 text-[#6b7280]">No orders yet. The first one will land here.</td></tr> : null}
            {(data ?? []).map((order) => (
              <tr key={order.id} className="border-t border-[#eef1f6]">
                <td className="px-4 py-3 font-medium">{order.order_number}</td>
                <td>{order.full_name}</td>
                <td className="text-[#6b7280]">{order.city}, {order.region}</td>
                <td><StatusPill status={order.status} /></td>
                <td>{cedis(Number(order.total))}</td>
                <td className="pr-4 text-right"><Link href={`/admin/orders/${order.id}`} className="text-[#2457c5]">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

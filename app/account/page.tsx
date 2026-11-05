import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions";
import { cedis } from "@/lib/format";
import { getViewer } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const viewer = await getViewer();
  if (!viewer.userId) redirect("/account/login");
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, status, total, created_at")
    .eq("user_id", viewer.userId)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-5xl">Hello{viewer.name ? `, ${viewer.name}` : ""}.</h1>
      <p className="mt-2 text-muted">{viewer.email}</p>
      <div className="mt-6 flex gap-3">
        {viewer.isAdmin ? <Link href="/admin" className="rounded-full bg-forest px-4 py-2 text-sm text-paper">Open the desk</Link> : null}
        <form action={signOut}><button className="rounded-full border border-ink px-4 py-2 text-sm">Sign out</button></form>
      </div>
      <h2 className="mt-10 font-serif text-3xl">Orders</h2>
      <div className="mt-4 space-y-3">
        {(orders ?? []).length === 0 ? <p className="text-muted">No orders on this account yet.</p> : null}
        {(orders ?? []).map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-2xl bg-card px-4 py-3">
            <div>
              <p className="font-medium">{order.order_number}</p>
              <p className="text-sm text-muted capitalize">{order.status}</p>
            </div>
            <p>{cedis(Number(order.total))}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

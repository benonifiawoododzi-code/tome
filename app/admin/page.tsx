import Link from "next/link";
import { Sparkline, StockDonut, TrendChart } from "@/components/admin/figures";
import { StatusPill } from "@/components/admin/status-pill";
import { cedis } from "@/lib/format";
import { getViewer } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Desk" };

type OrderRow = {
  id: string;
  order_number: string;
  full_name: string;
  status: string;
  total: number | string;
  created_at: string;
  city: string;
};

function weeksBack(count: number) {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return Array.from({ length: count }, (_, index) => {
    const start = new Date(end);
    start.setDate(end.getDate() - (count - index) * 7);
    const finish = new Date(end);
    finish.setDate(end.getDate() - (count - index - 1) * 7);
    return { start, finish };
  });
}

function changeLabel(current: number, previous: number) {
  if (previous === 0) return current > 0 ? "New this week" : "No change";
  const delta = Math.round(((current - previous) / previous) * 100);
  return `${delta > 0 ? "+" : ""}${delta}% vs last week`;
}

export default async function AdminHome() {
  const supabase = await createClient();
  const viewer = await getViewer();
  const [{ data: stockRows }, { data: orderRows }, { data: topBooks }, { count: readers }] = await Promise.all([
    supabase.from("products").select("stock"),
    supabase.from("orders").select("id, order_number, full_name, status, total, created_at, city").order("created_at", { ascending: false }),
    supabase.from("products").select("id, title, author, units_sold, image_url").order("units_sold", { ascending: false }).limit(4),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "customer"),
  ]);

  const orders = (orderRows ?? []) as OrderRow[];
  const liveOrders = orders.filter((order) => order.status !== "cancelled");
  const revenue = liveOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const weeks = weeksBack(4);
  const weekly = weeks.map((week) => {
    const slice = liveOrders.filter((order) => {
      const placed = new Date(order.created_at);
      return placed >= week.start && placed < week.finish;
    });
    return {
      orders: slice.length,
      revenue: slice.reduce((sum, order) => sum + Number(order.total), 0),
    };
  });
  const stock = stockRows ?? [];
  const healthy = stock.filter((book) => book.stock > 8).length;
  const low = stock.filter((book) => book.stock > 0 && book.stock <= 8).length;
  const out = stock.filter((book) => book.stock === 0).length;
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Accra", hour: "2-digit", hourCycle: "h23" }).format(new Date()));
  const hello = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const first = (viewer.name ?? "Ama").split(" ")[0];
  const range = new Intl.DateTimeFormat("en-GH", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).format(new Date());
  const maxSold = Math.max(...(topBooks ?? []).map((book) => book.units_sold), 1);

  const stats = [
    { label: "Orders", value: String(orders.length), note: changeLabel(weekly[3].orders, weekly[2].orders), series: weekly.map((week) => week.orders), color: "#2f6fed" },
    { label: "Revenue", value: cedis(revenue), note: changeLabel(weekly[3].revenue, weekly[2].revenue), series: weekly.map((week) => week.revenue), color: "#d4a24c" },
    { label: "Readers", value: String(readers ?? 0), note: "Accounts on the shop", series: weekly.map((week) => week.orders), color: "#1d7a45" },
    { label: "Titles", value: String(stock.length), note: `${low} running low`, series: [healthy, low, out, stock.length], color: "#6d4ad4" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{hello}, {first}!</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Here is the East Legon desk today.</p>
        </div>
        <p className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm">{range}</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
            <p className="text-sm text-[#6b7280]">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-xs text-[#1d7a45]">{stat.note}</p>
            <Sparkline values={stat.series} color={stat.color} />
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr_0.8fr]">
        <article className="relative min-h-64 overflow-hidden rounded-2xl text-white shadow-sm">
          <img src="/photos/shelf.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121820]/90 via-[#121820]/55 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-6">
            <p className="text-xs tracking-[0.2em] text-[#e7c98a] uppercase">Tome Accra</p>
            <h2 className="mt-2 max-w-sm text-3xl font-semibold leading-tight">Books chosen in East Legon.</h2>
            <p className="mt-2 max-w-sm text-sm text-white/80">Ghanaian novels, school texts, and the shelf people finish.</p>
            <Link href="/shop" className="mt-4 inline-flex w-fit rounded-xl bg-[#e7c98a] px-4 py-2 text-sm font-medium text-[#1c1915]">Open the shop</Link>
          </div>
        </article>
        <article className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Order trend</h2>
            <p className="text-xs text-[#6b7280]">Last 4 weeks</p>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-[#6b7280]">
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#2f6fed]" /> Orders</span>
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#d4a24c]" /> Revenue</span>
          </div>
          <TrendChart orders={weekly.map((week) => week.orders)} revenue={weekly.map((week) => week.revenue)} />
        </article>
        <article className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Shelf</h2>
            <Link href="/admin/products" className="text-sm text-[#2457c5]">View all</Link>
          </div>
          <div className="mt-4">
            <StockDonut
              parts={[
                { label: "Healthy", value: healthy, color: "#1d7a45" },
                { label: "Low", value: low, color: "#d4a24c" },
                { label: "Out", value: out, color: "#a33b32" },
              ]}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.7fr_0.7fr]">
        <article className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-[#2457c5]">View all</Link>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-[#6b7280]">
                <tr>
                  <th className="py-2 font-medium">Reader</th>
                  <th className="font-medium">Order</th>
                  <th className="font-medium">Placed</th>
                  <th className="font-medium">Status</th>
                  <th className="font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="border-t border-[#eef1f6]">
                    <td className="py-3">
                      <span className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14382c] text-xs text-[#e7c98a]">{order.full_name.slice(0, 1)}</span>
                        <span>
                          <span className="block font-medium">{order.full_name}</span>
                          <span className="block text-xs text-[#6b7280]">{order.city}</span>
                        </span>
                      </span>
                    </td>
                    <td>{order.order_number}</td>
                    <td className="text-[#6b7280]">{new Intl.DateTimeFormat("en-GH", { day: "numeric", month: "short", timeZone: "Africa/Accra" }).format(new Date(order.created_at))}</td>
                    <td><StatusPill status={order.status} /></td>
                    <td className="text-right"><Link href={`/admin/orders/${order.id}`} className="text-[#2457c5]">View</Link></td>
                  </tr>
                ))}
                {orders.length === 0 ? <tr><td colSpan={5} className="py-6 text-[#6b7280]">No orders yet.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <h2 className="font-medium">Desk</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {[
              ["/admin/orders", "Orders"],
              ["/admin/products", "Books"],
              ["/admin/products/new", "Add a book"],
              ["/admin/messages", "Messages"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-2xl bg-[#f6f8fb] px-3 py-4 text-center font-medium hover:bg-[#e7f0ff]">{label}</Link>
            ))}
          </div>
          <Link href="/shop?sort=popular" className="mt-3 block overflow-hidden rounded-2xl bg-[#14382c] text-white">
            <img src="/photos/red-book.jpg" alt="" className="h-24 w-full object-cover opacity-80" />
            <span className="block px-3 py-3 text-sm">Marked copies are still on the shelf.</span>
          </Link>
        </article>

        <article className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Most read</h2>
            <Link href="/admin/products" className="text-sm text-[#2457c5]">View all</Link>
          </div>
          <ul className="mt-3 space-y-3">
            {(topBooks ?? []).map((book) => (
              <li key={book.id} className="flex items-center gap-3">
                <img src={book.image_url ?? "/favicon.svg"} alt="" className="h-14 w-10 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{book.title}</p>
                  <p className="text-xs text-[#6b7280]">{book.units_sold} sold</p>
                  <span className="mt-1 block h-1.5 rounded-full bg-[#eef1f6]">
                    <span className="block h-1.5 rounded-full bg-[#14382c]" style={{ width: `${Math.max(8, Math.round((book.units_sold / maxSold) * 100))}%` }} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}

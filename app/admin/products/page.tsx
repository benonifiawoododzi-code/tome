import Link from "next/link";
import { archiveProduct } from "@/lib/actions";
import { cedis } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Books" };

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const term = (q ?? "").replace(/[%*,]/g, " ").trim();
  const supabase = await createClient();
  let request = supabase.from("products").select("id, title, author, price, stock, is_published, slug").order("title");
  if (term) request = request.or(`title.ilike.%${term}%,author.ilike.%${term}%`);
  const { data } = await request;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{term ? `Books matching “${term}”` : "Books"}</h1>
        <Link href="/admin/products/new" className="rounded-xl bg-[#14382c] px-4 py-2 text-sm text-white">Add a book</Link>
      </div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-base">
          <thead className="bg-[#1c2430] text-xs tracking-wide text-white uppercase"><tr><th className="px-5 py-4 font-medium">Title</th><th className="px-5 py-4 font-medium">Price</th><th className="px-5 py-4 font-medium">Stock</th><th className="px-5 py-4 font-medium">Live</th><th className="px-5 py-4"></th></tr></thead>
          <tbody>
            {(data ?? []).map((book) => (
              <tr key={book.id} className="border-b border-[#eef1f6]">
                <td className="px-5 py-5"><Link href={`/admin/products/${book.id}`} className="text-lg font-medium">{book.title}</Link><p className="text-[#6b7280]">{book.author}</p></td>
                <td className="px-5 py-5">{cedis(Number(book.price))}</td>
                <td className="px-5 py-5">{book.stock}</td>
                <td className="px-5 py-5">{book.is_published ? "Yes" : "Hidden"}</td>
                <td className="space-x-3 px-5 py-5 text-right">
                  <Link href={`/shop/${book.slug}`}>View</Link>
                  <form action={archiveProduct} className="inline"><input type="hidden" name="id" value={book.id} /><button className="text-clay">Hide</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

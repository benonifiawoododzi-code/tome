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
        <h1 className="text-2xl font-semibold">{term ? `Books matching “${term}”` : "Books"}</h1>
        <Link href="/admin/products/new" className="rounded-xl bg-[#14382c] px-4 py-2 text-sm text-white">Add a book</Link>
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-[#6b7280]"><tr><th className="px-4 py-3 font-medium">Title</th><th className="font-medium">Price</th><th className="font-medium">Stock</th><th className="font-medium">Live</th><th></th></tr></thead>
          <tbody>
            {(data ?? []).map((book) => (
              <tr key={book.id} className="border-t border-[#eef1f6]">
                <td className="px-4 py-3"><Link href={`/admin/products/${book.id}`} className="font-medium">{book.title}</Link><p className="text-[#6b7280]">{book.author}</p></td>
                <td>{cedis(Number(book.price))}</td>
                <td>{book.stock}</td>
                <td>{book.is_published ? "Yes" : "Hidden"}</td>
                <td className="space-x-3 text-right">
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

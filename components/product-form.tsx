"use client";

import { useActionState } from "react";
import { saveProduct } from "@/lib/actions";
import type { Category, Product } from "@/lib/types";

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const [state, action, pending] = useActionState(saveProduct, null);
  return (
    <form action={action} className="grid max-w-3xl gap-3">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <input name="title" required defaultValue={product?.title} placeholder="Title" className="rounded-2xl border border-line bg-card px-4 py-3" />
      <input name="author" required defaultValue={product?.author} placeholder="Author" className="rounded-2xl border border-line bg-card px-4 py-3" />
      <input name="slug" required defaultValue={product?.slug} placeholder="slug-for-the-link" className="rounded-2xl border border-line bg-card px-4 py-3" />
      <select name="category_id" defaultValue={product?.category_id} className="rounded-2xl border border-line bg-card px-4 py-3">
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <textarea name="blurb" required defaultValue={product?.blurb} rows={4} placeholder="Description" className="rounded-2xl border border-line bg-card px-4 py-3" />
      <div className="grid gap-3 sm:grid-cols-3">
        <input name="price" type="number" step="0.01" required defaultValue={product?.price} placeholder="Price" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="compare_at_price" type="number" step="0.01" defaultValue={product?.compare_at_price ?? ""} placeholder="Was price" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="stock" type="number" required defaultValue={product?.stock ?? 10} placeholder="Stock" className="rounded-2xl border border-line bg-card px-4 py-3" />
      </div>
      <input name="image_url" defaultValue={product?.image_url ?? ""} placeholder="Cover image URL" className="rounded-2xl border border-line bg-card px-4 py-3" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="publisher" defaultValue={product?.publisher ?? ""} placeholder="Publisher" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="isbn" defaultValue={product?.isbn ?? ""} placeholder="ISBN" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="format" defaultValue={product?.format ?? "Paperback"} placeholder="Format" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="pages" type="number" defaultValue={product?.pages ?? ""} placeholder="Pages" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="level" defaultValue={product?.level ?? ""} placeholder="Level, if a textbook" className="rounded-2xl border border-line bg-card px-4 py-3" />
        <input name="badge" defaultValue={product?.badge ?? ""} placeholder="Badge" className="rounded-2xl border border-line bg-card px-4 py-3" />
      </div>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={product?.is_published ?? true} /> Published</label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? false} /> Featured</label>
      {state?.error ? <p className="text-clay">{state.error}</p> : null}
      <button disabled={pending} className="w-fit rounded-full bg-forest px-5 py-3 text-paper">{pending ? "Saving…" : "Save book"}</button>
    </form>
  );
}

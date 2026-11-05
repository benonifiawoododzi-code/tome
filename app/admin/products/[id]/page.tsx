import { notFound } from "next/navigation";
import { ProductForm } from "@/components/product-form";
import { getCategories } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

export const metadata = { title: "Edit book" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data }, categories] = await Promise.all([
    supabase.from("products").select("*, categories(slug, name)").eq("id", id).maybeSingle(),
    getCategories(),
  ]);
  if (!data) notFound();
  const product = { ...data, price: Number(data.price), compare_at_price: data.compare_at_price == null ? null : Number(data.compare_at_price), rating_avg: Number(data.rating_avg) } as Product;
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit {product.title}</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}

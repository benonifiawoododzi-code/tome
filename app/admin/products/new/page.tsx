import { ProductForm } from "@/components/product-form";
import { getCategories } from "@/lib/queries";

export const metadata = { title: "Add a book" };

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add a book</h1>
      <ProductForm categories={categories} />
    </div>
  );
}

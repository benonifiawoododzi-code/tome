import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/queries";

export const metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      query: params.q,
      category: params.category,
      sort: params.sort,
    }),
  ]);
  const active = categories.find((category) => category.slug === params.category);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[220px_1fr]">
      <aside>
        <h1 className="font-serif text-4xl">{active?.name ?? (params.q ? `“${params.q}”` : "The shop")}</h1>
        <p className="mt-2 text-sm text-muted">{products.length} titles</p>
        <nav className="mt-6 space-y-2 text-sm">
          <Link className="block" href="/shop">All shelves</Link>
          {categories.map((category) => (
            <Link key={category.id} className={`block ${category.slug === params.category ? "text-forest" : ""}`} href={`/shop?category=${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </nav>
      </aside>
      <div>
        <form className="mb-6 flex flex-wrap gap-3" action="/shop">
          {params.category ? <input type="hidden" name="category" value={params.category} /> : null}
          <input name="q" defaultValue={params.q} placeholder="Search title or author" className="min-w-48 flex-1 rounded-full border border-line bg-card px-4 py-2" />
          <select name="sort" defaultValue={params.sort ?? "popular"} className="rounded-full border border-line bg-card px-4 py-2">
            <option value="popular">Best sellers</option>
            <option value="newest">Newest</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
          <button className="rounded-full bg-forest px-4 py-2 text-paper">Apply</button>
        </form>
        {products.length === 0 ? (
          <p className="text-muted">Nothing on that shelf yet. Try another category, or ask the desk.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}

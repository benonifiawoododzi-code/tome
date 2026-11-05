import { createClient } from "@/lib/supabase/server";
import type { Category, Product, Review } from "@/lib/types";

type ProductRow = Omit<Product, "price" | "compare_at_price" | "rating_avg"> & {
  price: number | string;
  compare_at_price: number | string | null;
  rating_avg: number | string;
};

function mapProduct(row: ProductRow): Product {
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  return {
    ...row,
    price: Number(row.price),
    compare_at_price: row.compare_at_price == null ? null : Number(row.compare_at_price),
    rating_avg: Number(row.rating_avg),
    categories: category ?? null,
  };
}

const productSelect = "*, categories(slug, name)";

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");
  return (data ?? []) as Category[];
}

export async function getProducts(options: {
  category?: string;
  query?: string;
  sort?: string;
  limit?: number;
  badge?: string;
  level?: string;
} = {}) {
  const supabase = await createClient();
  let request = supabase
    .from("products")
    .select(options.category ? "*, categories!inner(slug, name)" : productSelect)
    .eq("is_published", true);

  if (options.category) request = request.eq("categories.slug", options.category);
  if (options.badge) request = request.eq("badge", options.badge);
  if (options.level) request = request.eq("level", options.level);
  if (options.query) {
    const term = options.query.replace(/[%*,]/g, " ").trim();
    if (term) request = request.or(`title.ilike.%${term}%,author.ilike.%${term}%`);
  }

  switch (options.sort) {
    case "price-asc":
      request = request.order("price", { ascending: true });
      break;
    case "price-desc":
      request = request.order("price", { ascending: false });
      break;
    case "newest":
      request = request.order("created_at", { ascending: false });
      break;
    case "rating":
      request = request.order("rating_avg", { ascending: false });
      break;
    default:
      request = request.order("units_sold", { ascending: false });
  }

  if (options.limit) request = request.limit(options.limit);
  const { data } = await request;
  return ((data ?? []) as ProductRow[]).map(mapProduct);
}

export async function getProduct(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, categories(slug, name), reviews(id, author_name, rating, body, created_at)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) return null;
  const { reviews, ...row } = data as ProductRow & { reviews: Review[] };
  return {
    product: mapProduct(row),
    reviews: (reviews ?? []).sort((a, b) => b.created_at.localeCompare(a.created_at)),
  };
}

export async function getRelated(product: Product) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(productSelect)
    .eq("category_id", product.category_id)
    .eq("is_published", true)
    .neq("id", product.id)
    .limit(4);
  return ((data ?? []) as ProductRow[]).map(mapProduct);
}

export async function getViewer() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims as
    | {
        sub?: string;
        email?: string;
        app_metadata?: { role?: string };
        user_metadata?: { full_name?: string };
      }
    | undefined;
  return {
    userId: claims?.sub ?? null,
    email: claims?.email ?? null,
    name: claims?.user_metadata?.full_name ?? null,
    isAdmin: claims?.app_metadata?.role === "admin",
  };
}

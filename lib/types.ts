export type Category = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  image_url: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  author: string;
  blurb: string;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  pages: number | null;
  published_year: number | null;
  isbn: string | null;
  publisher: string | null;
  format: string;
  language: string;
  level: string | null;
  stock: number;
  units_sold: number;
  rating_avg: number;
  rating_count: number;
  badge: string | null;
  is_featured: boolean;
  is_published: boolean;
  categories: { slug: string; name: string } | null;
};

export type Review = {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
};

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  image_url: string | null;
  level: string | null;
  quantity: number;
};

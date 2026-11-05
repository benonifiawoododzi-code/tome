import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book-cover";
import { ProductCard } from "@/components/product-card";
import { PurchasePanel } from "@/components/purchase";
import { Stars } from "@/components/stars";
import { cedis } from "@/lib/format";
import { getProduct, getRelated } from "@/lib/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getProduct(slug);
  return { title: result?.product.title ?? "Book" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getProduct(slug);
  if (!result) notFound();
  const { product, reviews } = result;
  const related = await getRelated(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-muted">
        <Link href="/shop">Shop</Link>
        {product.categories ? <> / <Link href={`/shop?category=${product.categories.slug}`}>{product.categories.name}</Link></> : null}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm">
          <BookCover src={product.image_url} title={product.title} author={product.author} level={product.level} className="absolute inset-0 rounded-[2rem] shadow-xl" sizes="400px" />
        </div>
        <div>
          {product.badge ? <p className="text-xs tracking-[0.2em] text-gold uppercase">{product.badge}</p> : null}
          <h1 className="mt-2 font-serif text-5xl leading-tight">{product.title}</h1>
          <p className="mt-2 text-lg text-muted">{product.author}</p>
          <div className="mt-3"><Stars value={product.rating_avg} count={product.rating_count} /></div>
          <p className="mt-5 text-2xl">
            {cedis(product.price)}
            {product.compare_at_price ? <span className="ml-3 text-base text-muted line-through">{cedis(product.compare_at_price)}</span> : null}
          </p>
          <p className="mt-4 max-w-xl leading-7">{product.blurb}</p>
          <p className="mt-3 text-sm text-muted">{product.stock > 0 ? `${product.stock} in the East Legon stockroom` : "Waiting on the next printing"}</p>
          <PurchasePanel product={product} />
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            {[
              ["Format", product.format],
              ["Pages", product.pages?.toString()],
              ["Year", product.published_year?.toString()],
              ["Publisher", product.publisher],
              ["ISBN", product.isbn],
              ["Level", product.level],
            ].filter((entry) => entry[1]).map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted">Dispatch from East Legon. Accra and Tema usually leave the same day if you order before 2pm. Other regions go out with the next morning rider.</p>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="font-serif text-3xl">Readers in the shop</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {reviews.length === 0 ? <p className="text-muted">No notes on this copy yet.</p> : null}
          {reviews.map((review) => (
            <blockquote key={review.id} className="rounded-3xl bg-card p-5">
              <Stars value={review.rating} count={1} />
              <p className="mt-3 leading-7">{review.body}</p>
              <footer className="mt-3 text-sm text-muted">{review.author_name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
      {related.length ? (
        <section className="mt-14">
          <h2 className="font-serif text-3xl">Beside it on the shelf</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((book) => <ProductCard key={book.id} product={book} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}

import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { AddButton } from "@/components/purchase";
import { Stars } from "@/components/stars";
import { cedis } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[2/3] overflow-hidden rounded-2xl bg-paper-deep shadow-sm transition hover:-translate-y-1">
        <BookCover src={product.image_url} title={product.title} author={product.author} level={product.level} className="absolute inset-0" />
        {product.badge ? (
          <span className="absolute top-3 left-3 rounded-full bg-card/95 px-2.5 py-1 text-[11px] tracking-wide uppercase">{product.badge}</span>
        ) : null}
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link href={`/shop/${product.slug}`} className="font-serif text-lg leading-tight">{product.title}</Link>
        <p className="mt-1 text-sm text-muted">{product.author}</p>
        <div className="mt-2">
          <Stars value={product.rating_avg} count={product.rating_count} />
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <p>
            <span className="font-medium">{cedis(product.price)}</span>
            {product.compare_at_price ? <span className="ml-2 text-sm text-muted line-through">{cedis(product.compare_at_price)}</span> : null}
          </p>
          <AddButton product={product} compact />
        </div>
      </div>
    </article>
  );
}

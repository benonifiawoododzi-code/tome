import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/queries";

export default async function HomePage() {
  const [categories, catalog, ghanaian, textbooks] = await Promise.all([
    getCategories(),
    getProducts({ sort: "popular", limit: 72 }),
    getProducts({ category: "ghanaian-literature", limit: 4 }),
    getProducts({ category: "school-textbooks", limit: 6 }),
  ]);
  const popular = catalog.slice(0, 8);
  const standing = ["things-fall-apart", "atomic-habits", "children-of-blood-and-bone", "the-hundred-wells-of-salaga", "ghana-autobiography"]
    .map((slug) => catalog.find((book) => book.slug === slug))
    .filter((book) => book != null);
  const shelf = standing.length ? standing : popular.slice(0, 5);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">The Accra reading room</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            Books that
            <span className="mt-1 block italic text-forest">know the way home.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Ghanaian novels, the histories we inherit, school texts for the term, fantasy with a pulse, and the practical books we pass between friends. Chosen in East Legon. Sent across all 16 regions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-forest px-6 py-3 text-paper">Enter the shop</Link>
            <Link href="/shop?category=ghanaian-literature" className="rounded-full border border-ink px-6 py-3">Ghanaian voices</Link>
          </div>
        </div>
        <div className="relative mx-auto h-[420px] w-full max-w-xl sm:h-[520px]">
          <div className="arch absolute inset-x-4 top-0 h-[360px] rounded-t-[160px] sm:inset-x-8 sm:h-[460px] sm:rounded-t-[220px]" />
          <div className="absolute right-6 top-8 text-forest sm:right-10 sm:top-10" aria-hidden>
            <svg viewBox="0 0 80 140" className="h-28 w-16 sm:h-36 sm:w-20">
              <path d="M40 130 C40 80 20 70 18 40 C40 55 48 30 62 18 C50 48 70 70 40 130Z" fill="#3e6b52" />
              <rect x="37" y="90" width="6" height="46" rx="3" fill="#6d5424" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-1.5 sm:bottom-6 sm:gap-2">
            {shelf.slice(0, 5).map((book, index) => (
              <Link
                key={book.id}
                href={`/shop/${book.slug}`}
                className={`relative block w-12 shadow-xl transition hover:-translate-y-2 sm:w-20 ${["h-36 sm:h-[230px]", "h-48 sm:h-[280px]", "h-32 sm:h-[210px]", "h-44 sm:h-[260px]", "h-28 sm:h-[190px]"][index]}`}
              >
                <BookCover src={book.image_url} title={book.title} author={book.author} level={book.level} className="h-full w-full" sizes="90px" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl">Shop by shelf</h2>
          <Link href="/shop" className="text-sm">View all</Link>
        </div>
        <div className="mt-8 flex gap-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.slug}`} className="w-28 shrink-0 text-center">
              <span className="block h-28 w-28 overflow-hidden rounded-full border border-line bg-paper-deep">
                {category.image_url ? <img src={category.image_url} alt="" className="h-full w-full object-cover" /> : null}
              </span>
              <span className="mt-3 block text-sm">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold uppercase">From the Ghana shelf</p>
          <h2 className="mt-2 font-serif text-4xl">The books that explain the place.</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {ghanaian.map((book) => <ProductCard key={book.id} product={book} />)}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-forest p-8 text-paper">
          <img src="/photos/shelf.jpg" alt="A long library shelf under hanging bulbs" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="relative">
            <p className="text-xs tracking-[0.22em] text-gold-soft uppercase">This month</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">Up to 15% off the books people finish.</h2>
            <p className="mt-4 max-w-sm text-[#f3eee4]">Homegoing, Atomic Habits, and Sapiens are marked down while the copies last.</p>
            <Link href="/shop?sort=popular" className="mt-6 inline-block rounded-full bg-gold-soft px-5 py-3 text-ink">See the marked copies</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl">Best sellers</h2>
          <Link href="/shop?sort=popular" className="text-sm">View all</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {popular.slice(0, 8).map((book) => <ProductCard key={book.id} product={book} />)}
        </div>
      </section>

      <section className="bg-paper-deep py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-4xl">For the school term</h2>
          <p className="mt-2 max-w-2xl text-muted">Tome Scholars editions for JHS and SHS, arranged the way a Ghanaian term actually runs.</p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {textbooks.map((book) => <ProductCard key={book.id} product={book} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <dl className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm sm:grid-cols-3">
          <div><dt className="font-serif text-3xl">72</dt><dd className="text-muted">titles on the opening shelf</dd></div>
          <div><dt className="font-serif text-3xl">16</dt><dd className="text-muted">regions we deliver to</dd></div>
          <div><dt className="font-serif text-3xl">₵</dt><dd className="text-muted">priced in cedis, always</dd></div>
        </dl>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-serif text-4xl leading-tight">Join the Tome circle.</p>
          <p className="mt-3 text-muted">New Ghanaian editions, term-time textbook notes, and the occasional book we think you should argue with.</p>
          <NewsletterForm />
        </div>
        <img src="/photos/open-book.jpg" alt="Open books pinned across a wall" className="h-72 w-full rounded-[2rem] object-cover" />
      </section>
    </div>
  );
}

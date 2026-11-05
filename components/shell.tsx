"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart-provider";
import type { Category } from "@/lib/types";

export function Shell({
  categories,
  email,
  isAdmin,
  children,
}: {
  categories: Category[];
  email: string | null;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  if (pathname.startsWith("/admin")) return <div className="min-h-screen bg-paper">{children}</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-forest text-center text-[11px] tracking-[0.14em] text-gold-soft uppercase sm:text-xs">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2">
          <span>Free delivery over GH₵250 in Accra</span>
          <span className="hidden sm:inline">MoMo · card · pay on delivery</span>
          <span>14-day returns</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <button className="lg:hidden" type="button" aria-label="Open menu" onClick={() => setOpen((value) => !value)}>
            Menu
          </button>
          <Logo />
          <nav className="ml-6 hidden items-center gap-5 text-sm lg:flex">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button type="button" className="inline-flex items-center gap-1" aria-expanded={shopOpen}>
                Categories
              </button>
              {shopOpen ? (
                <div className="absolute top-full left-0 w-72 rounded-2xl border border-line bg-card p-3 shadow-xl">
                  {categories.map((category) => (
                    <Link key={category.id} href={`/shop?category=${category.slug}`} className="block rounded-xl px-3 py-2 hover:bg-paper">
                      {category.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <Link href="/shop?category=ghanaian-literature">Ghanaian voices</Link>
            <Link href="/shop?category=school-textbooks">School texts</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <form action="/shop" className="ml-auto hidden min-w-40 flex-1 md:block lg:max-w-xs">
            <label className="sr-only" htmlFor="site-search">Search books</label>
            <input id="site-search" name="q" placeholder="Search title or author" className="w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-forest" />
          </form>
          <Link href={email ? "/account" : "/account/login"} className="text-sm">{email ? "Account" : "Sign in"}</Link>
          {isAdmin ? <Link href="/admin" className="text-sm text-forest">Desk</Link> : null}
          <Link href="/cart" className="rounded-full bg-ink px-3 py-2 text-sm text-paper">Bag {count}</Link>
        </div>
        {open ? (
          <div className="space-y-2 border-t border-line px-4 py-4 text-sm lg:hidden">
            <Link href="/shop" onClick={() => setOpen(false)}>Shop all</Link>
            {categories.map((category) => (
              <Link key={category.id} className="block" href={`/shop?category=${category.slug}`} onClick={() => setOpen(false)}>
                {category.name}
              </Link>
            ))}
            <Link className="block" href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link className="block" href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        ) : null}
      </header>
      <main className="flex-1">{children}</main>
      <div className="kente" />
      <footer className="bg-forest-deep text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-[#d9d0c2]">A reading room in East Legon for Ghanaian literature, school texts, and the books we lend and never quite get back.</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">Shop</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block" href="/shop">All books</Link>
              <Link className="block" href="/shop?category=ghanaian-literature">Ghanaian literature</Link>
              <Link className="block" href="/shop?category=school-textbooks">School textbooks</Link>
              <Link className="block" href="/shop?category=fantasy">Fantasy</Link>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">Visit</p>
            <p className="mt-3 text-sm leading-6 text-[#d9d0c2]">18 Jungle Avenue, East Legon, Accra<br />Mon–Sat 9:00–19:00<br />Sunday 12:00–17:00<br />+233 30 255 5018</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-gold-soft uppercase">Care</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block" href="/contact">Contact the desk</Link>
              <Link className="block" href="/account">Your orders</Link>
              <a className="block" href="https://openlibrary.org" target="_blank" rel="noreferrer">Cover images via Open Library</a>
            </div>
          </div>
        </div>
        <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-[#b7ad9e]">© {new Date().getFullYear()} Tome Accra. Prices in Ghana cedis.</p>
      </footer>
    </div>
  );
}

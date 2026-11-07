"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Icon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      {name === "home" ? <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" {...common} /> : null}
      {name === "bag" ? <path d="M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2" {...common} /> : null}
      {name === "book" ? <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" {...common} /> : null}
      {name === "plus" ? <path d="M12 6v12M6 12h12" {...common} /> : null}
      {name === "mail" ? <path d="M4 7h16v10H4V7Zm0 0 8 6 8-6" {...common} /> : null}
      {name === "shop" ? <path d="M4 10h16v9H4v-9Zm1-3h14l1 3H4l1-3Zm5 6h4" {...common} /> : null}
    </svg>
  );
}

export function DeskShell({
  name,
  email,
  orderCount,
  messageCount,
  children,
}: {
  name: string;
  email: string | null;
  orderCount: number;
  messageCount: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [
    { href: "/admin", label: "Dashboard", icon: "home", exact: true, badge: 0 },
    { href: "/admin/orders", label: "Orders", icon: "bag", exact: false, badge: orderCount },
    { href: "/admin/products", label: "Books", icon: "book", exact: false, badge: 0 },
    { href: "/admin/products/new", label: "Add a book", icon: "plus", exact: true, badge: 0 },
    { href: "/admin/messages", label: "Messages", icon: "mail", exact: false, badge: messageCount },
  ];

  function active(item: (typeof items)[number]) {
    if (item.href === "/admin/products") return pathname.startsWith("/admin/products") && pathname !== "/admin/products/new";
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  const nav = (
    <nav className="mt-8 flex flex-1 flex-col gap-1">
      {items.map((item) => {
        const on = active(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] ${on ? "bg-[#e7c98a] font-medium text-[#1c1915]" : "text-[#d7deea] hover:bg-white/10"}`}
          >
            <Icon name={item.icon} />
            <span className="flex-1">{item.label}</span>
            {item.badge > 0 ? <span className={`rounded-full px-2 py-0.5 text-xs ${on ? "bg-[#1c1915] text-[#e7c98a]" : "bg-white/10"}`}>{item.badge}</span> : null}
          </Link>
        );
      })}
      <Link href="/" onClick={() => setOpen(false)} className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#d7deea] hover:bg-white/10">
        <Icon name="shop" />
        Open the shop
      </Link>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f7f4fb] text-[#1c2430] lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden flex-col bg-[#121820] px-4 py-6 text-white lg:flex">
        <Link href="/admin" className="px-2">
          <span className="block font-serif text-2xl leading-none text-[#f6edd8]">Tome</span>
          <span className="mt-1 block text-[10px] tracking-[0.28em] text-[#e7c98a] uppercase">Accra desk</span>
        </Link>
        {nav}
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm font-medium text-[#f6edd8]">East Legon counter</p>
          <p className="mt-1 text-xs leading-5 text-[#b7c0ce]">Orders are confirmed here before a rider leaves.</p>
        </div>
      </aside>
      {open ? (
        <div className="fixed inset-0 z-40 bg-[#121820] px-4 py-6 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <p className="font-serif text-2xl text-[#f6edd8]">Tome</p>
            <button type="button" className="rounded-full border border-white/20 px-3 py-1 text-sm" onClick={() => setOpen(false)}>Close</button>
          </div>
          {nav}
        </div>
      ) : null}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-black/5 bg-[#f7f4fb]/95 px-4 py-4 backdrop-blur lg:px-8">
          <button type="button" className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm lg:hidden" onClick={() => setOpen(true)}>Menu</button>
          <form action="/admin/products" className="min-w-0 flex-1">
            <label className="sr-only" htmlFor="desk-search">Search books</label>
            <input id="desk-search" name="q" placeholder="Search books or authors" className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#14382c]" />
          </form>
          <Link href="/admin/messages" className="relative grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white" aria-label="Messages">
            <Icon name="mail" />
            {messageCount > 0 ? <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#8d3d32] px-1 text-[10px] text-white">{messageCount}</span> : null}
          </Link>
          <Link href="/account" className="flex items-center gap-2 rounded-full border border-black/10 bg-white py-1 pr-3 pl-1">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14382c] text-xs text-[#e7c98a]">{name.slice(0, 1)}</span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm leading-tight font-medium">{name}</span>
              <span className="block text-[11px] text-[#6b7280]">{email ?? "Shop manager"}</span>
            </span>
          </Link>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

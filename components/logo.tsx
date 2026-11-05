import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest text-gold-soft">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
          <path
            d="M6 9.5h8.2c1.8 0 3.3 1.2 3.3 3.2 0 1.3-.7 2.3-1.8 2.8 1.5.4 2.4 1.6 2.4 3.2 0 2.2-1.7 3.8-4 3.8H6V9.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M7.6 15.2h6.2M7.6 20.2h6.8" stroke="currentColor" strokeWidth="1.4" />
          <path d="M22 8.5c2.4 1.6 3.8 3.8 3.8 7.5S24.4 22 22 23.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
      <span>
        <span className={`block font-serif text-2xl leading-none tracking-tight ${light ? "text-paper" : "text-ink"}`}>
          Tome
        </span>
        <span className={`mt-1 block text-[10px] tracking-[0.28em] uppercase ${light ? "text-gold-soft" : "text-gold"}`}>
          Accra
        </span>
      </span>
    </Link>
  );
}

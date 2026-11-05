import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <h1 className="font-serif text-5xl">That page has left the shelf.</h1>
      <Link href="/shop" className="mt-6 inline-block rounded-full bg-forest px-5 py-3 text-paper">Return to the shop</Link>
    </div>
  );
}

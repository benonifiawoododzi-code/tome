export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative">
        <img src="/photos/library.jpg" alt="Bookshelves in warm light" className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-forest/55" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl items-end px-4 pb-10">
          <h1 className="font-serif text-5xl text-paper sm:text-7xl">A shop with a counter, not a warehouse.</h1>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-lg leading-8">
          <p>Tome opened so Accra could buy a serious book without waiting for a cousin abroad. The first shelves were Ghanaian fiction and the school texts parents were already hunting in traffic. The rest of the shop grew around those two facts.</p>
          <p>We keep Homegoing next to Armah, Aidoo next to the BECE mathematics, and fantasy next to the life-skills people pretend they bought for someone else. Prices are in cedis. Delivery reaches all 16 regions, with riders who know East Legon and a morning dispatch for everywhere else.</p>
          <p>The reading room at 18 Jungle Avenue is open six days a week. You can order here and collect, or stay long enough to decide. Staff pick is still a person, Ama, who will tell you if the book is wrong for you.</p>
        </div>
        <aside className="rounded-[2rem] bg-card p-6">
          <p className="font-serif text-3xl">The desk</p>
          <p className="mt-3 text-sm leading-6 text-muted">18 Jungle Avenue, East Legon, Accra<br />Mon–Sat 9:00–19:00<br />Sunday 12:00–17:00<br />+233 30 255 5018</p>
        </aside>
      </div>
    </div>
  );
}

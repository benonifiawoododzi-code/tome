# Tome Accra

A Ghanaian bookshop built with Next.js, TypeScript, and Supabase. The shop sells Ghanaian literature, African fiction, history, school texts, fantasy, inspirational books, life skills, children’s books, and business titles. Prices are in cedis.

## Run it

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set the Supabase URL and publishable key. The shop uses the TOME BOOKS project.

## Staff desk

- Admin: `ama@tomebooks.gh` / `Tome-DKLd-QVhG-yaWv`
- Reader: `kofi@tomebooks.gh` / `ReadWithMe#2026`

The desk lives at `/admin`. Orders, books, and messages are stored in Supabase with row-level security. Checkout records an order and the payment method (Mobile Money, card, or pay on delivery). It does not charge a card.

Book covers are loaded from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers). Lifestyle photographs are from Unsplash.

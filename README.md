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

The desk lives at `/admin`. Orders, books, stock, and messages are stored in Supabase. Checkout collects Mobile Money and cards through Moolre, sends the receipt with Resend, and texts the order with Taysend. Pay on delivery is not charged online. Resend currently sends from `onboarding@resend.dev`, which can only deliver to the Resend account email until a domain is verified. The Taysend key is a test key, so texts are simulated until SMS credit is bought and the account phone is a real number.

Book covers are loaded from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers). Lifestyle photographs are from Unsplash.

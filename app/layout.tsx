import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Shell } from "@/components/shell";
import { getCategories, getViewer } from "@/lib/queries";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: { default: "Tome Accra — books for the long road home", template: "%s · Tome Accra" },
  description: "A Ghanaian bookshop for literature, history, school texts, fantasy, and the life-skills worth keeping. Priced in cedis and delivered across all 16 regions.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [categories, viewer] = await Promise.all([getCategories(), getViewer()]);
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full">
        <CartProvider>
          <Shell categories={categories} email={viewer.email} isAdmin={viewer.isAdmin}>
            {children}
          </Shell>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}

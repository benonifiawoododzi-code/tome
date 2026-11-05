"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cleanError } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { getViewer } from "@/lib/queries";

export async function signIn(_state: { error: string } | null, formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/account");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Those details did not match a Tome account." };
  redirect(next.startsWith("/") ? next : "/account");
}

export async function signUp(_state: { error: string } | null, formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "");
  if (password.length < 8) return { error: "Use at least 8 characters for the password." };
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: cleanError(error.message) };
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function placeOrder(input: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  paymentMethod: string;
  momoNumber: string;
  notes: string;
  items: { product_id: string; quantity: number }[];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("place_order", {
    p_full_name: input.fullName,
    p_email: input.email,
    p_phone: input.phone,
    p_address: input.address,
    p_city: input.city,
    p_region: input.region,
    p_payment_method: input.paymentMethod,
    p_momo_number: input.momoNumber,
    p_notes: input.notes,
    p_items: input.items,
  });
  if (error) return { error: cleanError(error.message) };
  revalidatePath("/");
  return { order: data as { order_number: string; access_token: string; total: number } };
}

export async function subscribeNewsletter(_state: { message: string; ok: boolean } | null, formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const { error } = await supabase.rpc("subscribe_newsletter", { p_email: email });
  if (error) return { ok: false, message: cleanError(error.message) };
  return { ok: true, message: "You are on the list. We write when a shelf is worth opening." };
}

export async function sendMessage(_state: { message: string; ok: boolean } | null, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_message", {
    p_name: String(formData.get("name") ?? ""),
    p_email: String(formData.get("email") ?? ""),
    p_topic: String(formData.get("topic") ?? "General"),
    p_body: String(formData.get("body") ?? ""),
  });
  if (error) return { ok: false, message: cleanError(error.message) };
  return { ok: true, message: "Received. Someone at the East Legon desk will reply." };
}

async function requireAdmin() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) throw new Error("Staff only");
  return createClient();
}

export async function updateOrderStatus(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${id}`);
}

export async function saveProduct(_state: { error: string } | null, formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    blurb: String(formData.get("blurb") ?? "").trim(),
    category_id: String(formData.get("category_id")),
    price: Number(formData.get("price")),
    compare_at_price: String(formData.get("compare_at_price") ?? "").trim()
      ? Number(formData.get("compare_at_price"))
      : null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    stock: Number(formData.get("stock") ?? 0),
    format: String(formData.get("format") ?? "Paperback"),
    publisher: String(formData.get("publisher") ?? "").trim() || null,
    isbn: String(formData.get("isbn") ?? "").trim() || null,
    pages: formData.get("pages") ? Number(formData.get("pages")) : null,
    level: String(formData.get("level") ?? "").trim() || null,
    badge: String(formData.get("badge") ?? "").trim() || null,
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
  };
  if (!payload.title || !payload.author || !payload.slug || !payload.blurb) {
    return { error: "Title, author, link, and description are required." };
  }
  const query = id
    ? supabase.from("products").update(payload).eq("id", id)
    : supabase.from("products").insert(payload);
  const { error } = await query;
  if (error) return { error: cleanError(error.message) };
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function archiveProduct(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  await supabase.from("products").update({ is_published: false }).eq("id", id);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

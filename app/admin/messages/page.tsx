import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select("id, name, email, topic, body, created_at").order("created_at", { ascending: false });
  return (
    <div>
      <h1 className="text-2xl font-semibold">Messages</h1>
      <div className="mt-6 space-y-4">
        {(data ?? []).length === 0 ? <p className="text-muted">The desk is clear.</p> : null}
        {(data ?? []).map((message) => (
          <article key={message.id} className="rounded-3xl bg-card p-5">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">{message.topic}</p>
            <h2 className="mt-1 font-serif text-2xl">{message.name}</h2>
            <p className="text-sm text-muted">{message.email}</p>
            <p className="mt-3 leading-7">{message.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

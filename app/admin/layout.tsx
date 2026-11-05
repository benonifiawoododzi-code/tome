import { DeskShell } from "@/components/admin/desk-shell";
import { getViewer } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const viewer = await getViewer();
  const [{ count: orderCount }, { count: messageCount }] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }),
  ]);

  return (
    <DeskShell
      name={viewer.name ?? "Ama Mensah"}
      email={viewer.email}
      orderCount={orderCount ?? 0}
      messageCount={messageCount ?? 0}
    >
      {children}
    </DeskShell>
  );
}

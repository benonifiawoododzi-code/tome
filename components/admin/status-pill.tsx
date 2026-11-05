const tones: Record<string, string> = {
  placed: "bg-[#fff4d8] text-[#8a5a12]",
  confirmed: "bg-[#e5f6ec] text-[#1d7a45]",
  packed: "bg-[#e7f0ff] text-[#2457c5]",
  dispatched: "bg-[#ece9ff] text-[#4c3fbf]",
  delivered: "bg-[#e5f6ec] text-[#1d7a45]",
  cancelled: "bg-[#fde8e6] text-[#a33b32]",
};

export function StatusPill({ status }: { status: string }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${tones[status] ?? "bg-[#eef1f6] text-[#1c2430]"}`}>{status}</span>;
}

export function Stars({ value, count }: { value: number; count: number }) {
  const full = Math.round(value);
  return (
    <p className="flex items-center gap-1 text-xs text-muted" aria-label={`${value} out of 5 from ${count} reviews`}>
      <span className="tracking-tight text-gold" aria-hidden>
        {"★★★★★".slice(0, full)}
        <span className="text-line">{"★★★★★".slice(full)}</span>
      </span>
      {count > 0 ? <span>({count})</span> : <span>New</span>}
    </p>
  );
}

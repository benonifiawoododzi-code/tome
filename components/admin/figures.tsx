export function Sparkline({ values, color }: { values: number[]; color: string }) {
  const series = values.length > 1 ? values : [0, values[0] ?? 0];
  const max = Math.max(...series, 1);
  const width = 120;
  const height = 36;
  const points = series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * width;
      const y = height - 3 - (value / max) * (height - 8);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-9 w-full" aria-hidden>
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={points} />
    </svg>
  );
}

export function TrendChart({ orders, revenue }: { orders: number[]; revenue: number[] }) {
  const width = 640;
  const height = 280;
  const pad = 28;
  const maxOrders = Math.max(...orders, 1);
  const maxRevenue = Math.max(...revenue, 1);
  const coords = (series: number[], max: number) =>
    series.map((value, index) => {
      const x = pad + (index / Math.max(series.length - 1, 1)) * (width - pad * 2);
      const y = height - pad - (value / max) * (height - pad * 2);
      return [x, y] as const;
    });
  const path = (series: number[], max: number) => coords(series, max).map(([x, y]) => `${x},${y}`).join(" ");
  const area = (series: number[], max: number) => {
    const points = coords(series, max);
    const floor = height - pad;
    return `M ${points[0][0]} ${floor} L ${points.map(([x, y]) => `${x} ${y}`).join(" L ")} L ${points[points.length - 1][0]} ${floor} Z`;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 h-72 w-full" role="img" aria-label="Orders and revenue over the last four weeks">
      <defs>
        <linearGradient id="order-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7ab6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff7ab6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((row) => (
        <line key={row} x1={pad} x2={width - pad} y1={pad + row * ((height - pad * 2) / 3)} y2={pad + row * ((height - pad * 2) / 3)} stroke="#eef1f6" />
      ))}
      <path d={area(revenue, maxRevenue)} fill="url(#revenue-fill)" />
      <path d={area(orders, maxOrders)} fill="url(#order-fill)" />
      <polyline fill="none" stroke="#ff7ab6" strokeWidth="3" strokeLinejoin="round" points={path(revenue, maxRevenue)} />
      <polyline fill="none" stroke="#7c5cff" strokeWidth="3" strokeLinejoin="round" points={path(orders, maxOrders)} />
      {orders.map((_, index) => (
        <text key={index} x={pad + (index / Math.max(orders.length - 1, 1)) * (width - pad * 2)} y={height - 6} textAnchor="middle" fontSize="13" fill="#6b7280">
          Week {index + 1}
        </text>
      ))}
    </svg>
  );
}

export function StockDonut({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const total = parts.reduce((sum, part) => sum + part.value, 0) || 1;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const rings = parts.map((part) => {
    const length = (part.value / total) * circumference;
    const ring = { ...part, length, offset };
    offset += length;
    return ring;
  });
  const inStock = parts.filter((part) => part.label !== "Out").reduce((sum, part) => sum + part.value, 0);

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90" role="img" aria-label="Stock split">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#eef1f6" strokeWidth="14" />
          {rings.map((ring) => (
            <circle
              key={ring.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={ring.color}
              strokeWidth="14"
              strokeDasharray={`${ring.length} ${circumference - ring.length}`}
              strokeDashoffset={-ring.offset}
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <span>
            <span className="block text-xl font-semibold">{Math.round((inStock / total) * 100)}%</span>
            <span className="block text-[11px] text-[#6b7280]">in stock</span>
          </span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {parts.map((part) => (
          <li key={part.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: part.color }} />
            <span className="text-[#6b7280]">{part.label}</span>
            <span className="ml-auto font-medium">{part.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

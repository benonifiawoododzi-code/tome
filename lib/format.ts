export function cedis(value: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2,
  }).format(value);
}

export function cleanError(message: string) {
  return message.replace(/^.*?:\s*/, "").replace(/^"+|"+$/g, "");
}

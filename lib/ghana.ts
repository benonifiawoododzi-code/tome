export const regions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Western North",
  "Central",
  "Eastern",
  "Volta",
  "Oti",
  "Northern",
  "Savannah",
  "North East",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
] as const;

export const paymentMethods = [
  { id: "mtn_momo", label: "MTN Mobile Money", hint: "Moolre sends a prompt to this number. Approve it with your PIN." },
  { id: "telecel_cash", label: "Telecel Cash", hint: "Moolre sends a prompt to this number." },
  { id: "at_money", label: "AT Money", hint: "Moolre sends a prompt to this number." },
  { id: "card", label: "Visa or Mastercard", hint: "You finish the card payment on Moolre’s secure page." },
  { id: "cod", label: "Pay on delivery", hint: "Accra, Tema, and Kumasi only. No online charge." },
] as const;

export function ghanaLocal(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("233")) return `0${digits.slice(3)}`;
  if (digits.startsWith("0")) return digits;
  return `0${digits}`;
}

export function ghanaE164(phone: string) {
  return `+233${ghanaLocal(phone).slice(1)}`;
}

export function shippingFor(region: string, subtotal: number) {
  if (region === "Greater Accra") return subtotal >= 250 ? 0 : 25;
  if (region === "Ashanti") return subtotal >= 400 ? 0 : 40;
  if (!region) return 0;
  return subtotal >= 500 ? 0 : 55;
}

export function paymentLabel(id: string) {
  return paymentMethods.find((method) => method.id === id)?.label ?? id;
}

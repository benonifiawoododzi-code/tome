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
  { id: "mtn_momo", label: "MTN Mobile Money", hint: "We send a prompt to the number you give us." },
  { id: "telecel_cash", label: "Telecel Cash", hint: "Have the wallet phone nearby." },
  { id: "at_money", label: "AT Money", hint: "AirtelTigo Money confirmation after checkout." },
  { id: "card", label: "Visa or Mastercard", hint: "A staff member confirms the card charge before dispatch." },
  { id: "cod", label: "Pay on delivery", hint: "Accra, Tema, and Kumasi only." },
] as const;

export function shippingFor(region: string, subtotal: number) {
  if (region === "Greater Accra") return subtotal >= 250 ? 0 : 25;
  if (region === "Ashanti") return subtotal >= 400 ? 0 : 40;
  if (!region) return 0;
  return subtotal >= 500 ? 0 : 55;
}

export function paymentLabel(id: string) {
  return paymentMethods.find((method) => method.id === id)?.label ?? id;
}

import { ghanaE164, ghanaLocal } from "@/lib/ghana";

const channels: Record<string, string> = {
  mtn_momo: "13",
  telecel_cash: "6",
  at_money: "7",
};

export function paymentKeysReady() {
  return Boolean(process.env.MOOLRE_API_USER && process.env.MOOLRE_PUBLIC_KEY && process.env.MOOLRE_ACCOUNT_NUMBER);
}

export async function startMoolrePayment(input: {
  method: string;
  amount: number;
  phone: string;
  email: string;
  reference: string;
  otp?: string;
}) {
  if (input.method === "cod") return { kind: "cod" as const };
  if (!paymentKeysReady()) {
    return { kind: "unconfigured" as const, message: "Moolre is not configured yet. Add the API user, public key, and account number on the server." };
  }

  const headers = {
    "Content-Type": "application/json",
    "X-API-USER": process.env.MOOLRE_API_USER!,
    "X-API-PUBKEY": process.env.MOOLRE_PUBLIC_KEY!,
  };
  const accountnumber = process.env.MOOLRE_ACCOUNT_NUMBER!;

  if (input.method === "card") {
    const response = await fetch("https://api.moolre.com/embed/link", {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: 1,
        amount: input.amount.toFixed(2),
        email: process.env.MOOLRE_EMAIL || input.email,
        externalref: input.reference,
        reusable: "0",
        currency: "GHS",
        accountnumber,
        callback: process.env.MOOLRE_CALLBACK_URL || undefined,
        redirect: process.env.MOOLRE_REDIRECT_URL || undefined,
      }),
    });
    const body = await response.json().catch(() => ({}));
    const url = body?.data?.authorization_url || body?.authorization_url;
    if (!response.ok || !url) {
      return { kind: "failed" as const, message: body?.message || "Moolre could not open the card page." };
    }
    return { kind: "link" as const, url: String(url) };
  }

  const channel = channels[input.method];
  if (!channel) return { kind: "failed" as const, message: "Choose a payment method." };

  const response = await fetch("https://api.moolre.com/open/transact/payment", {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: 1,
      channel,
      currency: "GHS",
      payer: ghanaLocal(input.phone),
      amount: input.amount.toFixed(2),
      externalref: input.reference,
      otpcode: input.otp || undefined,
      accountnumber,
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (body?.code === "TP14") return { kind: "otp" as const, message: body.message || "Enter the code Moolre sent to the wallet phone." };
  if (!response.ok || body?.status === 0 || body?.status === "0") {
    return { kind: "failed" as const, message: body?.message || "Moolre did not send the payment prompt." };
  }
  return { kind: "prompt" as const, message: "Approve the Moolre prompt on the wallet phone." };
}

export async function sendOrderMail(input: { to: string; orderNumber: string; total: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Tome Accra <onboarding@resend.dev>",
      to: input.to,
      subject: `Tome order ${input.orderNumber}`,
      html: `<p>Your Tome Accra order <strong>${input.orderNumber}</strong> is recorded. Total ${input.total}.</p><p>If you paid by mobile money, approve the Moolre prompt on your phone.</p>`,
    }),
  }).catch(() => undefined);
}

export async function sendOrderSms(input: { phone: string; orderNumber: string; total: string }) {
  const key = process.env.TAYSEND_API_KEY;
  if (!key) return;
  await fetch("https://api.taysend.com/v1/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      to: ghanaE164(input.phone),
      sender_id: (process.env.TAYSEND_SENDER_ID || "TomeAccra").slice(0, 11),
      message: `Tome Accra: order ${input.orderNumber} is recorded. Total ${input.total}. Approve the Moolre prompt if you paid by mobile money.`,
      type: "transactional",
    }),
  }).catch(() => undefined);
}

"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, null);
  return (
    <form action={action} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">Email</label>
      <input id="newsletter-email" name="email" type="email" required placeholder="Email address" className="min-w-0 flex-1 rounded-full border border-line bg-card px-4 py-3" />
      <button className="rounded-full bg-forest px-6 py-3 text-paper" disabled={pending}>
        {pending ? "Saving…" : "Subscribe"}
      </button>
      {state ? <p className={`text-sm sm:w-full ${state.ok ? "text-forest" : "text-clay"}`}>{state.message}</p> : null}
    </form>
  );
}

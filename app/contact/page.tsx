"use client";

import { useActionState } from "react";
import { sendMessage } from "@/lib/actions";

export default function ContactPage() {
  const [state, action, pending] = useActionState(sendMessage, null);
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-5xl">Write to the desk.</h1>
        <p className="mt-4 text-muted">School-list questions, a missing title, a delivery that took the long road. We read these in East Legon.</p>
        <p className="mt-6 text-sm leading-7">18 Jungle Avenue, East Legon<br />+233 30 255 5018<br />hello@tomebooks.gh</p>
      </div>
      <form action={action} className="space-y-3 rounded-[2rem] bg-card p-6">
        <input name="name" required placeholder="Name" className="w-full rounded-2xl border border-line px-4 py-3" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-2xl border border-line px-4 py-3" />
        <select name="topic" className="w-full rounded-2xl border border-line bg-card px-4 py-3">
          <option>General</option>
          <option>Order</option>
          <option>School list</option>
          <option>A book you should stock</option>
        </select>
        <textarea name="body" required minLength={12} rows={5} placeholder="How can we help?" className="w-full rounded-2xl border border-line px-4 py-3" />
        <button disabled={pending} className="rounded-full bg-forest px-5 py-3 text-paper">{pending ? "Sending…" : "Send"}</button>
        {state ? <p className={state.ok ? "text-forest" : "text-clay"}>{state.message}</p> : null}
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/lib/actions";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signUp, null);
  return (
    <form action={action} className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-5xl">Create an account</h1>
      <input name="full_name" required placeholder="Full name" className="mt-6 w-full rounded-2xl border border-line bg-card px-4 py-3" />
      <input name="email" type="email" required placeholder="Email" className="mt-3 w-full rounded-2xl border border-line bg-card px-4 py-3" />
      <input name="password" type="password" required minLength={8} placeholder="Password" className="mt-3 w-full rounded-2xl border border-line bg-card px-4 py-3" />
      {state?.error ? <p className="mt-3 text-clay">{state.error}</p> : null}
      <button disabled={pending} className="mt-4 rounded-full bg-forest px-5 py-3 text-paper">Create account</button>
      <p className="mt-4 text-sm">Already reading with us? <Link href="/account/login" className="text-forest">Sign in</Link></p>
    </form>
  );
}

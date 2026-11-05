"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";
import { signIn } from "@/lib/actions";

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-5xl">Sign in</h1>
      <p className="mt-3 text-muted">For orders, and for the staff desk.</p>
      <input type="hidden" name="next" value={next} />
      <input name="email" type="email" required placeholder="Email" className="mt-6 w-full rounded-2xl border border-line bg-card px-4 py-3" />
      <input name="password" type="password" required placeholder="Password" className="mt-3 w-full rounded-2xl border border-line bg-card px-4 py-3" />
      {state?.error ? <p className="mt-3 text-clay">{state.error}</p> : null}
      <button disabled={pending} className="mt-4 rounded-full bg-forest px-5 py-3 text-paper">Sign in</button>
      <p className="mt-4 text-sm">New here? <Link href="/account/register" className="text-forest">Create an account</Link></p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

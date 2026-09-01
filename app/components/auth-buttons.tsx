"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session?.user) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}

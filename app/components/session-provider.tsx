"use client";

import { useEffect, useRef } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import posthog from "posthog-js";

function PostHogIdentifier() {
  const { data: session } = useSession();
  const identifiedUserId = useRef<string | null>(null);
  const user = session?.user as
    | { id?: string; email?: string | null; name?: string | null }
    | undefined;

  useEffect(() => {
    if (!user?.id) {
      if (identifiedUserId.current) {
        posthog.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === user.id) {
      return;
    }

    if (identifiedUserId.current) {
      posthog.reset();
    }

    const personProperties = {
      ...(user.email ? { email: user.email } : {}),
      ...(user.name ? { name: user.name } : {}),
    };

    posthog.identify(user.id, personProperties);
    identifiedUserId.current = user.id;
  }, [user?.email, user?.id, user?.name]);

  return null;
}

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <PostHogIdentifier />
      {children}
    </SessionProvider>
  );
}

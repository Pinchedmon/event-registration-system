import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Event } from "./_components/event";
import { EventGroup } from "./_components/event-group";
export default async function AuthPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <div className="t justifye-center flex min-h-screen">
        <EventGroup title="Совсем скоро" items={[]} />
      </div>
    </HydrateClient>
  );
}

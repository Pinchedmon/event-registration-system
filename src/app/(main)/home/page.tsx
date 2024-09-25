import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import { EventGroup } from "./_components/event-group";
import { UpcomingEvents } from "./_components/upcoming-events";
export default async function AuthPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <div className="justifye-center mb-4 mt-4 flex min-h-screen flex-col">
        <UpcomingEvents />
        <EventGroup title="Все мероприятия" />
      </div>
    </HydrateClient>
  );
}

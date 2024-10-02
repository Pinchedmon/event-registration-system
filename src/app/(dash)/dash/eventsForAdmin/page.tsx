import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { EventTable } from "./event-table";

export default async function EventsPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="w-full text-2xl">
        <EventTable />
      </main>
    </HydrateClient>
  );
}
